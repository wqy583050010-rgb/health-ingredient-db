#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
文本模板导入工具
------------------------------------------------------------------------
把按模板写的 .txt 文件，转换成 data/all_ingredients.json / data/factories.json，
并自动合并进数据库（同名则更新，不同名则新增）。

用法:
  python scripts/import_text.py 文件路径.txt
  python scripts/import_text.py 文件路径.txt --dry-run        # 只预览，不写入
  python scripts/import_text.py 文件路径.txt --type ingredient # 强制按原料解析

写入后需重新构建并部署（交给 AI 处理，或自行执行）:
  python scripts/build_from_json.py && npm run build && git add -A && git commit -m "更新数据" && git push
------------------------------------------------------------------------
"""
import sys
import os
import re
import json
import hashlib
import argparse

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
INGS_FILE = os.path.join(ROOT, 'data', 'all_ingredients.json')
FACS_FILE = os.path.join(ROOT, 'data', 'factories.json')
CATS_FILE = os.path.join(ROOT, 'data', 'categories.json')

REGION_CODE = {
    '中国': 'CN', '美国': 'US', '欧盟': 'EU', '日本': 'JP', '韩国': 'KR',
    '澳大利亚': 'AU', '加拿大': 'CA', '德国': 'DE', '印度': 'IN', '英国': 'UK',
}
REGION_NAME = {v: k for k, v in REGION_CODE.items()}
STATUS_CODE = {
    '已批准': 'approved', '批准': 'approved', '受限': 'restricted',
    '禁用': 'prohibited', '禁止': 'prohibited', '待审': 'pending',
    '审查中': 'pending', 'pending': 'pending',
}

# 文本里“列表字段”的中文键 -> JSON 里的数组键
ING_LIST_KEYS = {'形式': 'forms', '剂型': 'dosageForms', '供应商': 'suppliers', '合规': 'compliance'}
ING_MECH_KEYS = {'机理步骤': 'mechanism.steps', '产品案例': 'productCases'}
FAC_LIST_KEYS = {'剂型': 'dosageForms', '认证': 'certifications', '亮点': 'highlights', '成功案例': 'successCases'}


def split_list(s):
    return [x.strip() for x in s.split('/') if x.strip()]


def slugify(s):
    s = (s or '').strip().lower()
    s = re.sub(r'[^a-z0-9]+', '-', s)
    return s.strip('-')


def make_id(name, nameEn, prefix, existing_ids):
    base = slugify(nameEn)
    if not base:
        base = 'x' + hashlib.md5(name.encode('utf-8')).hexdigest()[:8]
    cand = f"{prefix}-{base}" if prefix else base
    i = 2
    while cand in existing_ids:
        cand = f"{prefix}-{base}-{i}" if prefix else f"{base}-{i}"
        i += 1
    return cand


def load_json(path):
    with open(path, encoding='utf-8') as f:
        return json.load(f)


def save_json(path, data):
    with open(path, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
        f.write('\n')


# ------------------------- 解析文本 -------------------------
def parse_blocks(text):
    blocks = []
    cur = None
    for line in text.splitlines():
        s = line.strip()
        if not s:
            continue
        if s.startswith('===') and s.endswith('==='):
            header = s.strip('=').strip()
            if '原料' in header:
                cur = {'type': 'ingredient', 'lines': []}
            elif '代工厂' in header or '工厂' in header:
                cur = {'type': 'factory', 'lines': []}
            else:
                cur = None
            if cur:
                blocks.append(cur)
            continue
        if s.startswith('#'):
            continue
        if cur is None:
            continue
        if ':' in line:
            k, _, v = line.partition(':')
            cur['lines'].append((k.strip(), v.strip()))
    return blocks


def lines_to_dict(lines):
    return {k: v for k, v in lines}


# ------------------------- 子对象构造 -------------------------
def make_form(x):
    return {'name': x, 'description': '', 'bioavailability': '', 'advantages': [], 'disadvantages': []}


def make_dosage_form(x):
    return {'name': x, 'category': '传统剂型', 'description': '', 'advantages': []}


def make_supplier(x):
    p = [s.strip() for s in x.split('|')]
    return {
        'name': p[0] if p else x,
        'country': p[1] if len(p) > 1 else '',
        'website': p[2] if len(p) > 2 else '',
        'purity': p[3] if len(p) > 3 else '',
        'features': '',
    }


def make_compliance(x):
    region_cn, _, status_cn = x.partition(':')
    region_cn = region_cn.strip()
    status_cn = status_cn.strip()
    code = REGION_CODE.get(region_cn, 'CN')
    status = STATUS_CODE.get(status_cn, 'approved')
    return {
        'region': code,
        'regionName': region_cn or REGION_NAME.get(code, code),
        'status': status,
        'description': '',
        'maxDosage': '',
        'usageNote': '',
    }


def make_step(x):
    t, _, d = x.partition('|')
    return {'title': t.strip(), 'description': d.strip()}


def make_case(x):
    p = [s.strip() for s in x.split('|')]
    return {
        'name': p[0] if p else x,
        'brand': p[1] if len(p) > 1 else '',
        'url': p[2] if len(p) > 2 else '',
        'price': '', 'sales': '', 'otherIngredients': [], 'dosageForm': '',
    }


def make_cost_form(x):
    form, _, cost = x.partition(':')
    return {'form': form.strip(), 'cost': cost.strip()}


def make_success(x):
    p = [s.strip() for s in x.split('|')]
    return {'name': p[0] if p else x, 'url': p[1] if len(p) > 1 else ''}


# ------------------------- 原料对象 -------------------------
def build_ingredient(d, cats_by_name, cats_by_id, existing_ids, existing=None):
    name = d.get('名称', '').strip()
    nameEn = d.get('英文名', '').strip()
    cat_name = d.get('分类', '').strip()
    cat_id = cats_by_name.get(cat_name)
    if not cat_id:
        for cn, cid in cats_by_name.items():
            if cn in cat_name or cat_name in cn:
                cat_id, cat_name = cid, cn
                break
    if not cat_id:
        cat_id = list(cats_by_id.keys())[0]
        cat_name = cats_by_id[cat_id]
    sec_names = split_list(d.get('次要分类', ''))
    sec_ids = [cats_by_name[n] for n in sec_names if n in cats_by_name]
    pop_raw = d.get('热度', '').strip()
    pop = int(pop_raw) if (pop_raw.isdigit() and 1 <= int(pop_raw) <= 5) else 3

    new = {
        'id': make_id(name, nameEn, 'ing', existing_ids) if not existing else existing['id'],
        'name': name,
        'nameEn': nameEn,
        'category': cat_name,
        'categoryId': cat_id,
        'secondaryCategoryIds': sec_ids or None,
        'popularity': pop,
        'summary': d.get('简介', '').strip(),
        'chemicalStructure': {
            'smiles': d.get('化学-SMILES', '').strip(),
            'molecularFormula': d.get('化学-分子式', '').strip(),
            'molecularWeight': d.get('化学-分子量', '').strip(),
            'casNumber': d.get('化学-CAS', '').strip(),
        },
        'dosage': {
            'minEffective': d.get('剂量-最低', '').strip(),
            'recommended': d.get('剂量-推荐', '').strip(),
            'safeUpperLimit': d.get('剂量-上限', '').strip(),
            'unit': d.get('剂量-单位', '').strip(),
            'note': d.get('剂量-说明', '').strip(),
        },
        'forms': [make_form(x) for x in split_list(d.get('形式', ''))],
        'suppliers': [make_supplier(x) for x in split_list(d.get('供应商', ''))],
        'dosageForms': [make_dosage_form(x) for x in split_list(d.get('剂型', ''))],
        'compliance': [make_compliance(x) for x in split_list(d.get('合规', ''))],
        'efficacy': d.get('功效', '').strip(),
        'mechanism': {
            'overview': d.get('机理概述', '').strip(),
            'steps': [make_step(x) for x in split_list(d.get('机理步骤', ''))],
            'scientificReferences': [],
        },
        'productCases': [make_case(x) for x in split_list(d.get('产品案例', ''))],
        'costs': {
            'rawMaterial': d.get('成本-原料', '').strip(),
            'dosageFormCost': [make_cost_form(x) for x in split_list(d.get('成本-剂型', ''))],
            'packagingCost': d.get('成本-包装', '').strip(),
            'totalEstimate': d.get('成本-评估', '').strip(),
        },
    }
    if existing:
        return merge_ingredient(existing, new, d)
    return new


def merge_ingredient(existing, new, d):
    m = dict(existing)
    for k in ['name', 'nameEn', 'category', 'categoryId', 'popularity', 'summary', 'efficacy']:
        if k in d:
            m[k] = new[k]
    if '次要分类' in d:
        m['secondaryCategoryIds'] = new['secondaryCategoryIds']
    cs_map = {'化学-SMILES': 'smiles', '化学-分子式': 'molecularFormula',
              '化学-分子量': 'molecularWeight', '化学-CAS': 'casNumber'}
    for tk, sk in cs_map.items():
        if tk in d:
            m['chemicalStructure'][sk] = new['chemicalStructure'][sk]
    dos_map = {'剂量-最低': 'minEffective', '剂量-推荐': 'recommended',
               '剂量-上限': 'safeUpperLimit', '剂量-单位': 'unit', '剂量-说明': 'note'}
    for tk, sk in dos_map.items():
        if tk in d:
            m['dosage'][sk] = new['dosage'][sk]
    cost_map = {'成本-原料': 'rawMaterial', '成本-包装': 'packagingCost', '成本-评估': 'totalEstimate'}
    for tk, sk in cost_map.items():
        if tk in d:
            m['costs'][sk] = new['costs'][sk]
    if '成本-剂型' in d:
        m['costs']['dosageFormCost'] = new['costs']['dosageFormCost']
    for tk, ok in {**ING_LIST_KEYS, **ING_MECH_KEYS}.items():
        if tk in d:
            if ok == 'mechanism.steps':
                m['mechanism']['steps'] = new['mechanism']['steps']
            else:
                m[ok] = new[ok]
    return m


# ------------------------- 代工厂对象 -------------------------
def map_region(v):
    v = (v or '').strip()
    if v in ('domestic', 'international'):
        return v
    return 'domestic' if ('国内' in v or v == '中国') else 'international'


def build_factory(d, existing_ids, existing=None):
    name = d.get('名称', '').strip()
    nameEn = d.get('英文名', '').strip()
    new = {
        'id': make_id(name, nameEn, 'fac', existing_ids) if not existing else existing['id'],
        'name': name,
        'nameEn': nameEn,
        'region': map_region(d.get('地区', '')),
        'location': d.get('地点', d.get('地址', '')).strip(),
        'address': d.get('地址', '').strip(),
        'phone': d.get('电话', '').strip(),
        'email': d.get('邮箱', '').strip(),
        'founded': d.get('成立', '').strip(),
        'employees': d.get('人数', '').strip(),
        'revenue': d.get('营收', '').strip(),
        'stockCode': d.get('股票代码', '').strip(),
        'factories': d.get('生产基地', '').strip(),
        'moq': d.get('起订量', '').strip(),
        'priceRange': d.get('价格区间', '').strip(),
        'dosageForms': split_list(d.get('剂型', '')),
        'patents': d.get('专利', '').strip(),
        'certifications': split_list(d.get('认证', '')),
        'clients': d.get('客户', '').strip(),
        'successCases': [make_success(x) for x in split_list(d.get('成功案例', ''))],
        'website': d.get('官网', '').strip(),
        'intro': d.get('简介', '').strip(),
        'highlights': split_list(d.get('亮点', '')),
    }
    if existing:
        return merge_factory(existing, new, d)
    return new


def merge_factory(existing, new, d):
    m = dict(existing)
    for k in ['name', 'nameEn', 'region', 'location', 'address', 'phone', 'email',
              'founded', 'employees', 'revenue', 'stockCode', 'factories', 'moq',
              'priceRange', 'patents', 'clients', 'website', 'intro']:
        if k in d:
            m[k] = new[k]
    for tk, ok in FAC_LIST_KEYS.items():
        if tk in d:
            m[ok] = new[ok]
    return m


# ------------------------- 主流程 -------------------------
def main():
    ap = argparse.ArgumentParser(description='文本模板导入工具')
    ap.add_argument('file', help='模板 .txt 文件路径')
    ap.add_argument('--dry-run', action='store_true', help='只预览，不写入')
    ap.add_argument('--type', choices=['ingredient', 'factory'], help='强制类型')
    args = ap.parse_args()

    with open(args.file, encoding='utf-8') as f:
        text = f.read()
    blocks = parse_blocks(text)
    if args.type:
        blocks = [b for b in blocks if b['type'] == args.type]
    if not blocks:
        print('未找到可导入的内容（需要以 === 原料 === 或 === 代工厂 === 开头的段落）')
        sys.exit(1)

    cats = load_json(CATS_FILE)
    cats_by_name = {c['name']: c['id'] for c in cats}
    cats_by_id = {c['id']: c['name'] for c in cats}

    ings = load_json(INGS_FILE)
    facs = load_json(FACS_FILE)
    ing_ids = {x['id'] for x in ings}
    fac_ids = {x['id'] for x in facs}

    report = []
    for b in blocks:
        d = lines_to_dict(b['lines'])
        name = d.get('名称', '').strip()
        if not name:
            report.append('[跳过] 某段落缺少「名称」字段，已跳过')
            continue
        if b['type'] == 'ingredient':
            existing = next((x for x in ings if x['name'].strip() == name), None)
            obj = build_ingredient(d, cats_by_name, cats_by_id, ing_ids, existing)
            if existing:
                for i, x in enumerate(ings):
                    if x['name'].strip() == name:
                        ings[i] = obj
                        break
                report.append(f'[更新] 原料: {name}')
            else:
                ings.append(obj)
                ing_ids.add(obj['id'])
                report.append(f'[新增] 原料: {name}  (id={obj["id"]})')
        else:
            existing = next((x for x in facs if x['name'].strip() == name), None)
            obj = build_factory(d, fac_ids, existing)
            if existing:
                for i, x in enumerate(facs):
                    if x['name'].strip() == name:
                        facs[i] = obj
                        break
                report.append(f'[更新] 代工厂: {name}')
            else:
                facs.append(obj)
                fac_ids.add(obj['id'])
                report.append(f'[新增] 代工厂: {name}  (id={obj["id"]})')

    print('\n'.join(report))
    if args.dry_run:
        print('\n[dry-run] 未写入文件。')
        return

    save_json(INGS_FILE, ings)
    save_json(FACS_FILE, facs)
    print(f'\n已写入：原料 {len(ings)} 条，代工厂 {len(facs)} 条')
    print('下一步：python scripts/build_from_json.py && npm run build && git add -A && git commit -m "更新数据" && git push')


if __name__ == '__main__':
    main()
