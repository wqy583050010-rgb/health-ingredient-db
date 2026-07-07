#!/usr/bin/env python3
"""
保健食品原料网站 - JSON → TS 转换 + 构建 + 部署 一键脚本

用法:
  python scripts/build_from_json.py          # 转换 + 构建（不部署）
  python scripts/build_from_json.py --deploy  # 转换 + 构建 + 部署到 GitHub Pages
  python scripts/build_from_json.py --check   # 仅验证 JSON 格式，不生成文件

功能:
  1. 读取 data/ 目录下的 JSON 文件
  2. 生成对应的 TypeScript 数据文件
  3. 运行 npm run build 构建网站
  4. (可选) 部署到 GitHub Pages
"""

import json
import os
import sys
import subprocess
import argparse
import math
from pathlib import Path
from datetime import datetime

# 项目根目录
SCRIPT_DIR = Path(__file__).parent
PROJECT_ROOT = SCRIPT_DIR.parent
DATA_DIR = PROJECT_ROOT / "data"
SRC_DATA_DIR = PROJECT_ROOT / "src" / "data"

# Node 和 npm 路径
NODE_BIN = r"C:\ProgramData\WorkBuddy\users\d282b1d\.workbuddy\binaries\node\versions\22.22.2\node.exe"

def log(msg, level="INFO"):
    """带颜色的日志输出"""
    colors = {
        "INFO": "\033[36m",    # 青色
        "OK": "\033[32m",      # 绿色
        "WARN": "\033[33m",    # 黄色
        "ERROR": "\033[31m",   # 红色
        "RESET": "\033[0m",
    }
    c = colors.get(level, colors["INFO"])
    print(f"{c}[{level}]{colors['RESET']} {msg}")

def load_json(file_path):
    """加载 JSON 文件"""
    with open(file_path, 'r', encoding='utf-8') as f:
        return json.load(f)

def _clean(obj):
    """递归移除值为 None 的键/元素，使生成的 TS 中对应字段为 undefined（类型合法）"""
    if isinstance(obj, dict):
        return {k: _clean(v) for k, v in obj.items() if v is not None}
    if isinstance(obj, list):
        return [_clean(v) for v in obj if v is not None]
    return obj

def validate_ingredient(ing, idx):
    """验证原料数据格式"""
    errors = []
    required_fields = ['id', 'name', 'nameEn', 'category', 'categoryId', 'summary',
                       'chemicalStructure', 'dosage', 'forms', 'suppliers',
                       'dosageForms', 'compliance', 'efficacy', 'mechanism',
                       'productCases', 'costs']
    for field in required_fields:
        if field not in ing:
            errors.append(f"缺少必填字段: {field}")
    
    if 'id' in ing and not ing['id']:
        errors.append("id 不能为空")
    
    if 'chemicalStructure' in ing:
        cs = ing['chemicalStructure']
        for f in ['smiles', 'molecularFormula', 'molecularWeight', 'casNumber']:
            if f not in cs:
                errors.append(f"chemicalStructure 缺少: {f}")
    
    if 'dosage' in ing:
        d = ing['dosage']
        for f in ['minEffective', 'recommended', 'safeUpperLimit', 'unit', 'note']:
            if f not in d:
                errors.append(f"dosage 缺少: {f}")
    
    return errors

def validate_factory(fac, idx):
    """验证代工厂数据格式"""
    errors = []
    required_fields = ['id', 'name', 'nameEn', 'region', 'location', 'address',
                       'phone', 'email', 'founded', 'employees', 'revenue',
                       'factories', 'moq', 'priceRange', 'dosageForms', 'patents',
                       'certifications', 'clients', 'successCases', 'website', 'intro', 'highlights']
    for field in required_fields:
        if field not in fac:
            errors.append(f"缺少必填字段: {field}")
    
    if 'region' in fac and fac['region'] not in ['domestic', 'international']:
        errors.append(f"region 必须是 'domestic' 或 'international'，当前值: {fac.get('region')}")
    
    return errors

def generate_ingredients_ts(json_data):
    """生成原料 TS 文件内容（单一 canonical 数据源）"""
    ts_code = "import type { Ingredient } from '@/types/ingredient';\n\n"
    ts_code += "export const ingredients: Ingredient[] = "
    ts_code += json.dumps(_clean(json_data), ensure_ascii=False, indent=2)
    ts_code += ";\n"
    return ts_code

def generate_categories_ts(json_data):
    """生成分类 TS 文件内容"""
    ts_code = "import type { Category } from '@/types/ingredient';\n\n"
    ts_code += "export const categories: Category[] = "
    ts_code += json.dumps(_clean(json_data), ensure_ascii=False, indent=2)
    ts_code += ";\n"
    return ts_code

def generate_factories_ts(json_data, industry_ref=None):
    """生成代工厂 TS 文件内容"""
    ts_code = """// 国内外保健食品ODM/OEM代工厂数据库

export interface SuccessCase {
  name: string;
  url: string;
}

export interface OEMFactory {
  id: string;
  name: string;
  nameEn: string;
  region: 'domestic' | 'international';
  location: string;
  address: string;
  phone: string;
  email: string;
  founded: string;
  employees: string;
  revenue: string;
  stockCode?: string;
  factories: string;
  moq: string;
  priceRange: string;
  dosageForms: string[];
  patents: string;
  certifications: string[];
  clients: string;
  successCases: SuccessCase[];
  website: string;
  intro: string;
  highlights: string[];
}

export interface IndustryRefRow {
  form: string;
  china: string;
  intl: string;
}

export const oemFactories: OEMFactory[] = """
    ts_code += json.dumps(_clean(json_data), ensure_ascii=False, indent=2)
    ts_code += ";\n\n"
    
    # 附加行业参考数据表
    if industry_ref:
        moq_data = industry_ref.get('industryMoq', [])
        price_data = industry_ref.get('industryPrice', [])
        ts_code += "// 行业MOQ参考\n"
        ts_code += "export const industryMoq: IndustryRefRow[] = "
        ts_code += json.dumps(moq_data, ensure_ascii=False, indent=2)
        ts_code += ";\n\n"
        ts_code += "// 行业价格参考\n"
        ts_code += "export const industryPrice: IndustryRefRow[] = "
        ts_code += json.dumps(price_data, ensure_ascii=False, indent=2)
        ts_code += ";\n"
    
    return ts_code

def generate_index_ts():
    """生成数据汇总入口文件（单一 canonical 原料源）"""
    return f"""// 保健食品原料数据库主入口
// 由 build_from_json.py 自动生成
// 生成时间: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}

import {{ ingredients }} from './ingredients';

export {{ ingredients }};
export {{ categories }} from './categories';
export type {{ Category, ComplianceRegion, ComplianceStatus, Supplier, DosageForm, ProductCase, CostEstimate, MechanismStep }} from '@/types/ingredient';
"""

def step1_validate():
    """步骤1: 验证 JSON 数据格式"""
    log("=" * 50)
    log("步骤 1/4: 验证 JSON 数据格式")
    log("=" * 50)
    
    all_valid = True
    
    # 验证分类
    cat_path = DATA_DIR / "categories.json"
    if not cat_path.exists():
        log(f"错误: 找不到 {cat_path}", "ERROR")
        return False
    categories = load_json(cat_path)
    log(f"分类数据: {len(categories)} 个分类 ✓")
    
    # 验证代工厂
    fac_path = DATA_DIR / "factories.json"
    if not fac_path.exists():
        log(f"错误: 找不到 {fac_path}", "ERROR")
        return False
    factories = load_json(fac_path)
    for i, fac in enumerate(factories):
        errors = validate_factory(fac, i)
        if errors:
            log(f"代工厂 #{i} ({fac.get('name', '?')}): {len(errors)} 个错误", "ERROR")
            for e in errors:
                log(f"  - {e}", "ERROR")
            all_valid = False
    log(f"代工厂数据: {len(factories)} 家代工厂 ✓")
    
    # 验证原料（优先 all_ingredients.json 作为 canonical 源）
    all_ing_path = DATA_DIR / "all_ingredients.json"
    if all_ing_path.exists():
        ingredients = load_json(all_ing_path)
        log(f"原料数据(canonical): {len(ingredients)} 种 ✓")
    else:
        batch_files = sorted(
            DATA_DIR.glob("ingredients-batch*.json"),
            key=lambda p: int(p.stem.replace("ingredients-batch", ""))
        )
        if not batch_files:
            log("错误: 找不到 all_ingredients.json 或 ingredients-batch*.json", "ERROR")
            return False
        ingredients = []
        for bf in batch_files:
            ingredients.extend(load_json(bf))
        log(f"原料数据(legacy batch): {len(ingredients)} 种 ✓")

    for i, ing in enumerate(ingredients):
        errors = validate_ingredient(ing, i)
        if errors:
            log(f"原料 #{i} ({ing.get('name', '?')}): {len(errors)} 个错误", "ERROR")
            for e in errors:
                log(f"  - {e}", "ERROR")
            all_valid = False

    log(f"\n原料总计: {len(ingredients)} 种")

    # 检查 ID 唯一性
    all_ids = [i['id'] for i in ingredients]
    duplicates = [id for id in set(all_ids) if all_ids.count(id) > 1]
    if duplicates:
        log(f"警告: 发现重复 ID: {duplicates}", "WARN")
        all_valid = False
    
    if all_valid:
        log("\n数据验证通过！", "OK")
    else:
        log("\n数据验证失败！请修正上述错误。", "ERROR")
    
    return all_valid

def step2_generate_ts():
    """步骤2: 从 JSON 生成 TS 文件"""
    log("\n" + "=" * 50)
    log("步骤 2/4: 从 JSON 生成 TypeScript 文件")
    log("=" * 50)
    
    SRC_DATA_DIR.mkdir(parents=True, exist_ok=True)
    
    # 生成分类（自动重算每个分类的真实原料数）
    categories = load_json(DATA_DIR / "categories.json")
    all_ing_path = DATA_DIR / "all_ingredients.json"
    if all_ing_path.exists():
        all_ings = load_json(all_ing_path)
    else:
        all_ings = []
        for bf in DATA_DIR.glob("ingredients-batch*.json"):
            all_ings.extend(load_json(bf))
    for cat in categories:
        cnt = sum(
            1
            for ing in all_ings
            if ing.get('categoryId') == cat['id']
            or (cat['id'] in (ing.get('secondaryCategoryIds') or []))
        )
        cat['ingredientCount'] = cnt
    ts_code = generate_categories_ts(categories)
    (SRC_DATA_DIR / "categories.ts").write_text(ts_code, encoding='utf-8')
    log(f"生成 categories.ts ({len(categories)} 个分类，已重算数量)")
    
    # 生成代工厂
    factories = load_json(DATA_DIR / "factories.json")
    # 加载行业参考数据（MOQ和价格参考表）
    industry_ref_path = DATA_DIR / "industry_reference.json"
    industry_ref = load_json(industry_ref_path) if industry_ref_path.exists() else None
    ts_code = generate_factories_ts(factories, industry_ref)
    (SRC_DATA_DIR / "factories.ts").write_text(ts_code, encoding='utf-8')
    log(f"生成 factories.ts ({len(factories)} 家代工厂)")
    
    # 生成原料（优先 all_ingredients.json 作为 canonical 源，单一文件）
    all_ing_path = DATA_DIR / "all_ingredients.json"
    if all_ing_path.exists():
        ingredients = load_json(all_ing_path)
        log(f"原料源(canonical): {len(ingredients)} 种 ✓")
    else:
        batch_files = sorted(
            DATA_DIR.glob("ingredients-batch*.json"),
            key=lambda p: int(p.stem.replace("ingredients-batch", ""))
        )
        ingredients = []
        for bf in batch_files:
            ingredients.extend(load_json(bf))
        log(f"原料源(legacy batch): {len(ingredients)} 种 ✓")

    ts_code = generate_ingredients_ts(ingredients)
    (SRC_DATA_DIR / "ingredients.ts").write_text(ts_code, encoding='utf-8')
    log(f"生成 ingredients.ts ({len(ingredients)} 种原料)")

    # 清理旧的 batch ts 文件，避免残留
    for old in SRC_DATA_DIR.glob("ingredients-batch*.ts"):
        old.unlink()
        log(f"清理旧文件: {old.name}")

    # 生成汇总入口
    ts_code = generate_index_ts()
    (SRC_DATA_DIR / "index.ts").write_text(ts_code, encoding='utf-8')
    log(f"生成 index.ts (汇总入口)")
    
    log("\nTypeScript 文件生成完成！", "OK")
    return True

def step3_build():
    """步骤3: 运行 npm run build"""
    log("\n" + "=" * 50)
    log("步骤 3/4: 构建网站 (npm run build)")
    log("=" * 50)
    
    npm_cmd = "npm.cmd" if sys.platform == "win32" else "npm"
    result = subprocess.run(
        [npm_cmd, "run", "build"],
        cwd=str(PROJECT_ROOT),
        capture_output=True,
        text=True,
        shell=True,
    )
    
    if result.returncode != 0:
        log("构建失败！", "ERROR")
        print(result.stdout)
        print(result.stderr)
        return False
    
    # 检查 dist/index.html 是否存在
    dist_html = PROJECT_ROOT / "dist" / "index.html"
    if dist_html.exists():
        size_kb = dist_html.stat().st_size / 1024
        log(f"构建成功！dist/index.html ({size_kb:.1f} KB)", "OK")
    else:
        log("构建可能失败：dist/index.html 不存在", "WARN")
        return False
    
    return True

def step4_deploy():
    """步骤4: 部署到 GitHub Pages"""
    log("\n" + "=" * 50)
    log("步骤 4/4: 部署到 GitHub Pages")
    log("=" * 50)
    
    dist_dir = PROJECT_ROOT / "dist"
    
    # 配置 Git 凭据助手（Windows GCM），避免push时认证失败
    subprocess.run(
        ["git", "config", "credential.helper", "manager"],
        cwd=str(dist_dir),
        capture_output=True,
        text=True,
        shell=True,
    )
    
    # Git 操作
    git_cmds = [
        ["git", "add", "-A"],
        ["git", "commit", "-m", f"Update: {datetime.now().strftime('%Y-%m-%d %H:%M')} data update"],
        ["git", "push", "origin", "main", "--force"],
    ]
    
    for cmd in git_cmds:
        result = subprocess.run(
            cmd,
            cwd=str(dist_dir),
            capture_output=True,
            text=True,
            shell=True,
        )
        if result.returncode != 0 and "nothing to commit" not in result.stdout:
            log(f"命令失败: {' '.join(cmd)}", "ERROR")
            print(result.stdout)
            print(result.stderr)
            return False
    
    log("部署成功！", "OK")
    log(f"网站地址: https://wqy583050010-rgb.github.io/health-ingredient-db/", "OK")
    log("提示: CDN 缓存约需 5-10 分钟刷新", "WARN")
    return True

def sync_batches(chunk=50):
    """将 all_ingredients.json 切分为多个 <1MB 的批次文件，便于通过 API/MCP 推送。
    仅当 all_ingredients.json 存在时执行；批次文件为可入库的 canonical 表示。"""
    all_ing_path = DATA_DIR / "all_ingredients.json"
    if not all_ing_path.exists():
        log("sync_batches: 未找到 all_ingredients.json，跳过批次同步", "WARN")
        return
    ings = load_json(all_ing_path)
    # 清理旧批次
    for old in DATA_DIR.glob("ingredients-batch*.json"):
        old.unlink()
    n = math.ceil(len(ings) / chunk)
    for i in range(n):
        seg = ings[i * chunk:(i + 1) * chunk]
        out = DATA_DIR / f"ingredients-batch{i + 1}.json"
        out.write_text(json.dumps(seg, ensure_ascii=False, indent=2), encoding="utf-8")
    log(f"sync_batches: 已生成 {n} 个批次文件（共 {len(ings)} 种，每批 ≤{chunk}）", "OK")

def main():
    parser = argparse.ArgumentParser(description='保健食品原料网站 - JSON 构建部署工具')
    parser.add_argument('--deploy', action='store_true', help='构建后部署到 GitHub Pages')
    parser.add_argument('--check', action='store_true', help='仅验证 JSON 格式，不生成文件')
    parser.add_argument('--no-build', action='store_true', help='跳过构建步骤（仅生成 TS 文件）')
    args = parser.parse_args()
    
    print("""
╔══════════════════════════════════════════════╗
║   保健食品原料网站 - 数据更新工具 v1.0       ║
║   JSON → TypeScript → Build → Deploy         ║
╚══════════════════════════════════════════════╝
""")
    
    # 步骤1: 验证
    if not step1_validate():
        sys.exit(1)

    # 步骤1.5: 同步批次文件（保证可推送的批次与 all_ingredients.json 一致）
    sync_batches()

    if args.check:
        log("\n仅验证模式完成。", "OK")
        return
    
    # 步骤2: 生成 TS
    if not step2_generate_ts():
        sys.exit(1)
    
    if args.no_build:
        log("\n跳过构建步骤。TS 文件已生成。", "OK")
        return
    
    # 步骤3: 构建
    if not step3_build():
        sys.exit(1)
    
    # 步骤4: 部署
    if args.deploy:
        if not step4_deploy():
            sys.exit(1)
    else:
        log("\n跳过部署步骤。如需部署，请添加 --deploy 参数。", "INFO")
    
    print(f"""
{'=' * 50}
全部完成！
{'=' * 50}
""")
    
    if args.deploy:
        print(f"网站已更新: https://wqy583050010-rgb.github.io/health-ingredient-db/")
        print(f"(CDN缓存约5-10分钟后刷新)")
    else:
        print(f"构建完成，dist/index.html 已生成。")
        print(f"如需部署，运行: python scripts/build_from_json.py --deploy")

if __name__ == '__main__':
    main()
