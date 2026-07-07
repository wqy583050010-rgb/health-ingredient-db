#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
药食同源目录同步工具
------------------------------------------------------------------------
把官方《按照传统既是食品又是中药材的物质目录》的完整名单同步进数据库：
  - 已被现有条目（多为"XX提取物"）覆盖的物质 -> 确保打上 herb-food 标签
  - 未覆盖的物质 -> 新增一条原料记录（category=药食同源）
同时清理同名重复：花青素(越橘)、辅酶Q10。

用法:
  python scripts/sync_herbfood.py --dry-run     # 只预览
  python scripts/sync_herbfood.py               # 执行
"""
import sys
import os
import json
import hashlib
import argparse

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
INGS_FILE = os.path.join(ROOT, 'data', 'all_ingredients.json')

# ----------------- 官方目录（106 种，简化物质名） -----------------
MASTER = [
    # 2002 原名单 87
    '丁香','八角茴香','刀豆','小茴香','小蓟','山药','山楂','马齿苋','乌梢蛇','乌梅',
    '木瓜','火麻仁','代代花','玉竹','甘草','白芷','白果','白扁豆','白扁豆花','龙眼肉',
    '决明子','百合','肉豆蔻','肉桂','余甘子','佛手','杏仁','沙棘','牡蛎','芡实',
    '花椒','赤小豆','阿胶','鸡内金','麦芽','昆布','枣','罗汉果','郁李仁','金银花',
    '青果','鱼腥草','姜','枳椇子','枸杞子','栀子','砂仁','胖大海','茯苓','香橼',
    '香薷','桃仁','桑叶','桑椹','桔红','桔梗','益智仁','荷叶','莱菔子','莲子',
    '高良姜','淡竹叶','淡豆豉','菊花','菊苣','黄芥子','黄精','紫苏','紫苏籽','葛根',
    '黑芝麻','黑胡椒','槐米','槐花','蒲公英','蜂蜜','榧子','酸枣仁','鲜白茅根','鲜芦根',
    '蝮蛇','橘皮','薄荷','薏苡仁','薤白','覆盆子','藿香',
    # 2019 新增 6
    '当归','山柰','西红花','草果','姜黄','荜茇',
    # 2023 新增 9（人参亦已纳入药食同源，库中以"人参提取物"存在）
    '党参','肉苁蓉','铁皮石斛','西洋参','黄芪','灵芝','山茱萸','天麻','杜仲叶','人参',
    # 2024 新增 4
    '地黄','麦冬','天冬','化橘红',
]

# 名称匹配别名（官方物质名 -> 现有条目中可能包含的字，仅用于安全别名）
ALIAS = {
    '枸杞子': ['枸杞'],
    '橘皮': ['陈皮'],
    '枣': ['大枣'],
    '西红花': ['藏红花'],
}

# 简版中英/简介/功效/热度  （未列出的用通用文案）
INFO = {
    '丁香': ['Clove', '温中降逆、温肾助阳的芳香香料，亦入药。', '缓解胃寒呕逆、脘腹冷痛', 3],
    '八角茴香': ['Star Anise', '常用香辛料，含茴香油，温阳散寒。', '理气止痛、温中散寒', 3],
    '刀豆': ['Sword Bean', '豆科植物的种子，健脾温中。', '温中下气、补肾', 2],
    '小茴香': ['Fennel', '芳香健胃香料，散寒理气。', '温肾散寒、和胃理气', 3],
    '小蓟': ['Field Thistle', '凉血止血的野菜与药材。', '凉血止血、散瘀消肿', 3],
    '山药': ['Chinese Yam', '健脾益肺、补肾固精的常用药食两用根茎。', '健脾益胃、补肺益肾', 5],
    '山楂': ['Hawthorn', '消食化积、活血的酸甜果品。', '消食健胃、活血化淤', 5],
    '马齿苋': ['Purslane', '清热解毒的野生蔬菜。', '清热解毒、凉血止痢', 3],
    '乌梢蛇': ['Zaocys Snake', '祛风湿的蛇类药材。', '祛风通络、定惊止痉', 2],
    '乌梅': ['Smoked Plum', '敛肺生津的制干青梅。', '敛肺止咳、生津止泻', 3],
    '木瓜': ['Chaenomeles Fruit', '化湿和胃的皱皮木瓜。', '舒筋活络、和胃化湿', 3],
    '火麻仁': ['Hemp Seed', '润肠通便的油性种子。', '润肠通便', 3],
    '代代花': ['Dai-Dai Flower', '理气宽中、开胃的香橼花。', '理气宽胸、开胃', 2],
    '玉竹': ['Polygonatum Odoratum', '滋阴润燥的百合科根茎。', '养阴润燥、生津止渴', 4],
    '甘草': ['Licorice', '调和诸药、补脾润肺的甘甜根。', '补脾益气、清热解毒、调和药性', 5],
    '白芷': ['Angelica Dahurica', '解表祛风、通窍止痛。', '散风除湿、通窍止痛', 3],
    '白果': ['Ginkgo Nut', '银杏种子，敛肺定喘（需熟食少量）。', '敛肺定喘、收涩止带', 3],
    '白扁豆': ['White Hyacinth Bean', '健脾化湿的豆类。', '健脾化湿、和中消暑', 3],
    '白扁豆花': ['White Hyacinth Bean Flower', '解暑化湿的扁豆花。', '解暑化湿', 2],
    '龙眼肉': ['Longan Pulp', '补益心脾、养血安神的果干。', '补益心脾、养血安神', 4],
    '决明子': ['Cassia Seed', '清肝明目、润肠的的种子。', '清肝明目、润肠通便', 4],
    '百合': ['Lily Bulb', '润肺清心、安神的花鳞茎。', '养阴润肺、清心安神', 4],
    '肉豆蔻': ['Nutmeg', '温中行气的香料（少量）。', '温中涩肠、行气消食', 2],
    '肉桂': ['Cassia Bark', '温肾助阳、散寒止痛的树皮。', '补火助阳、散寒止痛', 4],
    '余甘子': ['Amla', '维生素C极高的生津果。', '清热凉血、生津止咳', 3],
    '佛手': ['Fingered Citron', '疏肝理气、化痰的果。', '疏肝理气、和胃止痛', 3],
    '杏仁': ['Apricot Kernel', '止咳平喘、润肠的种子（苦杏仁需炮制）。', '止咳平喘、润肠通便', 4],
    '沙棘': ['Sea Buckthorn', '富含维生素C与黄酮的橙黄浆果。', '健脾消食、止咳祛痰、活血散瘀', 4],
    '牡蛎': ['Oyster Shell', '潜阳固涩、补钙的贝壳。', '重镇安神、潜阳补阴、软坚散结', 3],
    '芡实': ['Euryale Seed', '补脾止泻、益肾固精的种仁。', '益肾固精、补脾止泻', 3],
    '花椒': ['Sichuan Pepper', '温中止痛的麻辣香料。', '温中止痛、杀虫止痒', 3],
    '赤小豆': ['Adzuki Bean', '利水消肿的红色豆类。', '利水消肿、解毒排脓', 3],
    '阿胶': ['Donkey-Hide Gelatin', '补血滋阴、润燥止血的驴皮胶。', '补血滋阴、润燥止血', 5],
    '鸡内金': ['Chicken Gizzard Lining', '健胃消食的鸡肫内壁。', '健胃消食、涩精止遗', 3],
    '麦芽': ['Malt', '消食健胃、回乳的发芽麦。', '行气消食、健脾开胃', 3],
    '昆布': ['Kelp', '化痰软坚、补碘的海藻。', '软坚散结、利水消肿', 3],
    '枣': ['Jujube', '补中益气、养血安神的甘果。', '补中益气、养血安神', 5],
    '罗汉果': ['Luo Han Guo', '清热润肺、甘甜低卡的果实。', '清热润肺、利咽开音', 4],
    '郁李仁': ['Bush-Cherry Seed', '润肠通便的种仁。', '润肠通便、利水消肿', 2],
    '金银花': ['Honeysuckle Flower', '清热解毒、疏散风热的化瘀花。', '清热解毒、疏散风热', 5],
    '青果': ['Chinese Olive', '清肺利咽的橄榄果。', '清热解毒、利咽生津', 3],
    '鱼腥草': ['Houttuynia', '清热解毒、消痈排脓的野菜。', '清热解毒、消痈排脓', 3],
    '姜': ['Ginger', '发汗解表、温中止呕的根茎。', '发汗解表、温中止呕、温肺止咳', 5],
    '枳椇子': ['Raisin Tree Seed', '解酒毒、利二便的种子。', '解酒毒、止渴除烦', 2],
    '枸杞子': ['Goji Berry', '滋补肝肾、益精明目的红色浆果。', '滋补肝肾、益精明目', 5],
    '栀子': ['Gardenia Fruit', '泻火除烦、凉血利湿的果。', '泻火除烦、清热利湿', 3],
    '砂仁': ['Amomum', '化湿开胃、温脾止泻的砂仁。', '化湿开胃、温脾止泻', 3],
    '胖大海': ['Sterculia Seed', '清肺利咽、润肠的种仁。', '清热润肺、利咽开音', 3],
    '茯苓': ['Poria', '利水渗湿、健脾宁心的菌核。', '利水渗湿、健脾、宁心', 5],
    '香橼': ['Citron', '疏肝理气、宽中的果。', '疏肝理气、宽中化痰', 2],
    '香薷': ['Elsholtzia', '发汗解表、化湿和中的草。', '发汗解表、化湿和中', 2],
    '桃仁': ['Peach Kernel', '活血祛瘀、润肠的种子。', '活血祛瘀、润肠通便', 3],
    '桑叶': ['Mulberry Leaf', '疏散风热、清肺润燥的叶。', '疏散风热、清肺润燥、清肝明目', 4],
    '桑椹': ['Mulberry Fruit', '滋阴补血、生津润燥的紫果。', '滋阴补血、生津润燥', 4],
    '桔红': ['Tangerine Peel Red', '理气宽中、燥湿化痰的橙红皮。', '理气宽中、燥湿化痰', 3],
    '桔梗': ['Platycodon', '宣肺利咽、祛痰的根。', '宣肺、利咽、祛痰、排脓', 3],
    '益智仁': ['Alpinia Oxyphylla', '温脾止泻、固肾缩尿的种仁。', '暖肾固精、温脾止泻', 2],
    '荷叶': ['Lotus Leaf', '清暑化湿、升发清阳的叶。', '清暑化湿、升发清阳、凉血止血', 4],
    '莱菔子': ['Radish Seed', '消食除胀、降气的种子。', '消食除胀、降气化痰', 3],
    '莲子': ['Lotus Seed', '补脾止泻、养心安神的种仁。', '补脾止泻、益肾涩精、养心安神', 4],
    '高良姜': ['Lesser Galangal', '温胃止呕、散寒止痛的根茎。', '温胃止呕、散寒止痛', 2],
    '淡竹叶': ['Lophatherum', '清热泻火、利尿的叶。', '清热泻火、除烦利尿', 2],
    '淡豆豉': ['Fermented Soybean', '解表除烦的发酵豆制品。', '解表、除烦、宣发郁热', 2],
    '菊花': ['Chrysanthemum', '疏风清热、平肝明目的花。', '疏散风热、平肝明目、清热解毒', 5],
    '菊苣': ['Chicory', '清肝利胆、健胃的野菜。', '清肝利胆、健胃消食', 2],
    '黄芥子': ['Yellow Mustard Seed', '温肺豁痰、通络的芥菜子。', '温肺豁痰利气、散结通络', 2],
    '黄精': ['Polygonatum', '补气养阴、健脾润肺的根茎。', '补气养阴、健脾、润肺、益肾', 4],
    '紫苏': ['Perilla', '解表散寒、行气和胃的叶。', '解表散寒、行气和胃', 3],
    '紫苏籽': ['Perilla Seed', '降气化痰、润肠的籽。', '降气化痰、止咳平喘、润肠', 2],
    '葛根': ['Kudzu Root', '解肌退热、生津止渴的根。', '解肌退热、生津止渴、升阳止泻', 4],
    '黑芝麻': ['Black Sesame', '补肝肾、益精血、润肠的籽。', '补肝肾、益精血、润肠燥', 4],
    '黑胡椒': ['Black Pepper', '温中散寒的辛辣香料。', '温中散寒、下气消痰', 2],
    '槐米': ['Sophora Flower Bud', '凉血止血的未开放花蕾（富含芦丁）。', '凉血止血、清肝泻火', 3],
    '槐花': ['Sophora Flower', '凉血止血、清肝的开放花。', '凉血止血、清肝泻火', 3],
    '蒲公英': ['Dandelion', '清热解毒、消肿散结的草。', '清热解毒、消肿散结、利尿通淋', 4],
    '蜂蜜': ['Honey', '补中润燥、润肠解毒的天然甜味剂。', '补中、润燥、止痛、解毒', 4],
    '榧子': ['Torreya Seed', '杀虫消积、润肠的种仁。', '杀虫消积、润肺止咳、润肠', 2],
    '酸枣仁': ['Sour Jujube Seed', '养心补肝、宁心安神的种仁。', '养心补肝、宁心安神、敛汗', 4],
    '鲜白茅根': ['Fresh Imperata Root', '凉血止血、清热利尿的鲜根。', '凉血止血、清热利尿', 2],
    '鲜芦根': ['Fresh Reed Rhizome', '清热生津、止渴的鲜根茎。', '清热泻火、生津止渴、除烦', 2],
    '蝮蛇': ['Pit Viper', '祛风活络的蛇类药材。', '祛风、通络、止痉', 1],
    '橘皮': ['Tangerine Peel', '理气健脾、燥湿化痰的果皮（陈皮）。', '理气健脾、燥湿化痰', 4],
    '薄荷': ['Peppermint', '疏散风热、清利头目的芳香草。', '疏散风热、清利头目、疏肝行气', 4],
    '薏苡仁': ['Coix Seed', '健脾渗湿、排脓的种仁。', '利水渗湿、健脾止泻、除痹排脓', 5],
    '薤白': ['Chinese Chive', '通阳散结、行气导滞的鳞茎。', '通阳散结、行气导滞', 2],
    '覆盆子': ['Raspberry', '益肾固精、缩尿的聚合果。', '益肾固精、缩尿', 3],
    '藿香': ['Agastache', '芳香化湿、解暑发表的草。', '芳香化湿、和中止呕、发表解暑', 3],
    '当归': ['Angelica Sinensis', '补血活血、调经止痛的妇科要药。', '补血活血、调经止痛、润肠', 5],
    '山柰': ['Kaempferia', '温中化湿的沙姜香料。', '行气温中、消食止痛', 2],
    '西红花': ['Saffron', '活血化瘀、凉血解郁的珍贵花蕊。', '活血化瘀、凉血解毒、解郁安神', 4],
    '草果': ['Tsao-Ko', '燥湿温中、截疟的姜科香料。', '燥湿温中、截疟除痰', 2],
    '姜黄': ['Turmeric', '破血行气、通经止痛，富含姜黄素。', '活血行气、通经止痛', 4],
    '荜茇': ['Long Pepper', '温中散寒的胡椒科香料。', '温中散寒、下气止痛', 2],
    '党参': ['Codonopsis', '健脾益肺、养血生津的参类。', '健脾益肺、养血生津', 4],
    '肉苁蓉': ['Cistanche', '补肾阳、益精血、润肠的沙漠药材。', '补肾阳、益精血、润肠通便', 4],
    '铁皮石斛': ['Dendrobium', '益胃生津、滋阴清热的兰科茎。', '益胃生津、滋阴清热', 4],
    '西洋参': ['American Ginseng', '补气养阴、清热生津的参类。', '补气养阴、清热生津', 4],
    '黄芪': ['Astragalus', '补气升阳、固表止汗的补气要药。', '补气升阳、固表止汗、利水消肿', 5],
    '灵芝': ['Reishi', '补气安神、止咳平喘的菌盖。', '补气安神、止咳平喘', 4],
    '山茱萸': ['Cornus Fruit', '补益肝肾、收涩固脱的果肉。', '补益肝肾、收涩固脱', 3],
    '天麻': ['Gastrodia', '平肝息风、止痉的块茎。', '平肝息风、止痉', 4],
    '杜仲叶': ['Eucommia Leaf', '补肝肾、强筋骨的杜仲叶。', '补肝肾、强筋骨', 3],
    '地黄': ['Rehmannia', '清热凉血、养阴生津（生）或补血（熟）。', '清热凉血、养阴生津', 4],
    '麦冬': ['Ophiopogon', '养阴生津、润肺清心的块根。', '养阴生津、润肺清心', 4],
    '天冬': ['Asparagus Cochinchinensis', '养阴润燥、清肺生津的块根。', '养阴润燥、清肺生津', 3],
    '化橘红': ['Exocarpium Citri Grandis', '化痰止咳、理气宽中的化州柚皮。', '理气宽中、燥湿化痰', 3],
}


def norm(s):
    s = s.strip()
    # 去掉括号及内容
    import re as _re
    s = _re.sub(r'[（(].*?[)）]', '', s)
    for suf in ['提取物', '多糖', '酸', '素', ' ', '（', '）', '(', ')']:
        s = s.replace(suf, '')
    return s.strip()


def find_existing(name, ings):
    n = norm(name)
    aliases = ALIAS.get(name, [])
    for x in ings:
        en = x['name'].strip()
        if norm(en) == n or en == name:
            return x
        for a in aliases:
            if a in en:
                return x
    return None


def make_id(name, nameEn, existing_ids):
    import re
    base = re.sub(r'[^a-z0-9]+', '-', (nameEn or '').lower()).strip('-')
    if not base:
        base = 'x' + hashlib.md5(name.encode()).hexdigest()[:8]
    cand = f"ing-{base}" if base else f"ing-{hashlib.md5(name.encode()).hexdigest()[:10]}"
    i = 2
    while cand in existing_ids:
        cand = f"ing-{base}-{i}"
        i += 1
    return cand


def new_record(name, existing_ids):
    nameEn, summary, efficacy, pop = INFO.get(name, ('', f'{name}为药食同源物质，传统既作食材亦作药材，常用于食疗与保健食品。', '药食两用，用于日常食疗与保健食品', 2))
    if not nameEn:
        # 兜底英文名
        nameEn = name
    rid = make_id(name, nameEn, existing_ids)
    return {
        'id': rid,
        'name': name,
        'nameEn': nameEn,
        'category': '药食同源',
        'categoryId': 'herb-food',
        'secondaryCategoryIds': [],
        'popularity': pop,
        'summary': summary,
        'chemicalStructure': {'smiles': '', 'molecularFormula': '', 'molecularWeight': '', 'casNumber': ''},
        'dosage': {'minEffective': '', 'recommended': '', 'safeUpperLimit': '', 'unit': '', 'note': ''},
        'forms': [
            {'name': '提取物', 'description': '', 'bioavailability': '', 'advantages': [], 'disadvantages': []},
            {'name': '粉剂', 'description': '', 'bioavailability': '', 'advantages': [], 'disadvantages': []},
        ],
        'suppliers': [],
        'dosageForms': [
            {'name': '胶囊', 'category': '传统剂型', 'description': '', 'advantages': []},
            {'name': '片剂', 'category': '传统剂型', 'description': '', 'advantages': []},
            {'name': '粉剂', 'category': '传统剂型', 'description': '', 'advantages': []},
        ],
        'compliance': [{'region': 'CN', 'regionName': '中国', 'status': 'approved', 'description': '', 'maxDosage': '', 'usageNote': ''}],
        'efficacy': efficacy,
        'mechanism': {'overview': '', 'steps': [], 'scientificReferences': []},
        'productCases': [],
        'costs': {'rawMaterial': '', 'dosageFormCost': [], 'packagingCost': '', 'totalEstimate': ''},
    }


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--dry-run', action='store_true')
    args = ap.parse_args()

    ings = json.load(open(INGS_FILE, encoding='utf-8'))
    ids = {x['id'] for x in ings}
    report = []

    # ---- 1) 同步药食同源 ----
    covered, added = [], []
    for name in MASTER:
        ex = find_existing(name, ings)
        if ex:
            cats = set([ex.get('categoryId')] + (ex.get('secondaryCategoryIds') or []))
            if 'herb-food' not in cats:
                if not args.dry_run:
                    sec = ex.get('secondaryCategoryIds') or []
                    sec.append('herb-food')
                    ex['secondaryCategoryIds'] = sec
                covered.append(f'[标签] {name} <- 现有「{ex['name']}」补打 herb-food')
            else:
                covered.append(f'[已有] {name} (现有「{ex['name']}」)')
        else:
            if not args.dry_run:
                rec = new_record(name, ids)
                ings.append(rec)
                ids.add(rec['id'])
            added.append(f'[新增] {name}')
    report.append(f'药食同源：覆盖 {len(covered)}，新增 {len(added)}')
    report += covered + added

    # ---- 2) 清理 花青素 重复 ----
    antho = [x for x in ings if '花青素' in x['name']]
    if len(antho) > 1:
        keep = next(x for x in antho if x['id'] == 'bilberry-anthocyanins') or antho[0]
        drop = [x for x in antho if x is not keep]
        # 合并 drop 的供应商到 keep（去重）
        if not args.dry_run:
            ksup = {s.get('name') for s in keep.get('suppliers', [])}
            for d in drop:
                for s in d.get('suppliers', []):
                    if s.get('name') not in ksup:
                        keep['suppliers'].append(s); ksup.add(s.get('name'))
            ings = [x for x in ings if x['id'] != drop[0]['id']]
        report.append(f'[去重] 花青素：保留「{keep["name"]}」，删除「{drop[0]["name"]}」')

    # ---- 3) 清理 辅酶Q10 同名重复 ----
    coq = [x for x in ings if x['name'].strip() == '辅酶Q10']
    if len(coq) > 1:
        keep = next(x for x in coq if x['id'] == 'coenzyme-q10-energy') or coq[0]
        drop = [x for x in coq if x is not keep]
        if not args.dry_run:
            kcat = set([keep.get('categoryId')] + (keep.get('secondaryCategoryIds') or []))
            dcat = set([drop[0].get('categoryId')] + (drop[0].get('secondaryCategoryIds') or []))
            kcat |= dcat
            keep['secondaryCategoryIds'] = [c for c in kcat if c != keep.get('categoryId')] or None
            ksup = {s.get('name') for s in keep.get('suppliers', [])}
            for s in drop[0].get('suppliers', []):
                if s.get('name') not in ksup:
                    keep['suppliers'].append(s); ksup.add(s.get('name'))
            ings = [x for x in ings if x['id'] != drop[0]['id']]
        report.append(f'[去重] 辅酶Q10：合并为 1 条（保留「{keep["id"]}」，并入「{drop[0]["id"]}」的分类与供应商）')

    print('\n'.join(report))
    if args.dry_run:
        print('\n[dry-run] 未写入。')
        return

    json.dump(ings, open(INGS_FILE, 'w', encoding='utf-8'), ensure_ascii=False, indent=2)
    print(f'\n已写入：原料共 {len(ings)} 条')


if __name__ == '__main__':
    main()
