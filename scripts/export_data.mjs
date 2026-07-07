/**
 * 数据导出脚本 - 将 src/data/*.ts 中的所有数据导出为 JSON 文件
 * 
 * 用法: node scripts/export_data.mjs
 * 
 * 生成文件:
 *   data/categories.json         - 所有分类
 *   data/factories.json          - 所有代工厂
 *   data/ingredients-batch1.json ~ batch9.json - 各批原料数据
 *   data/all_ingredients.json    - 所有原料汇总
 */

import { transform } from 'esbuild';
import { readFileSync, writeFileSync, mkdirSync, unlinkSync, existsSync } from 'fs';
import { join, resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(__dirname, '..');

async function loadTSData(filePath, exportName) {
  const fullPath = resolve(projectRoot, filePath);
  const code = readFileSync(fullPath, 'utf8');
  
  // 用 esbuild 转换 TS → JS（移除类型注解和 import type 语句）
  const result = await transform(code, {
    loader: 'ts',
    format: 'esm',
  });
  
  // 写入临时文件并 import
  const tempPath = join(projectRoot, `.temp_${exportName}.mjs`);
  writeFileSync(tempPath, result.code);
  
  try {
    const mod = await import(`file://${tempPath}`);
    return mod[exportName];
  } finally {
    // 清理临时文件
    if (existsSync(tempPath)) unlinkSync(tempPath);
  }
}

async function main() {
  const dataDir = resolve(projectRoot, 'data');
  mkdirSync(dataDir, { recursive: true });
  
  console.log('开始导出数据...\n');
  
  // 1. 导出分类
  console.log('导出分类数据...');
  const categories = await loadTSData('src/data/categories.ts', 'categories');
  writeFileSync(join(dataDir, 'categories.json'), JSON.stringify(categories, null, 2) + '\n', 'utf8');
  console.log(`  ✓ categories.json (${categories.length} 个分类)`);
  
  // 2. 导出代工厂
  console.log('导出代工厂数据...');
  const factories = await loadTSData('src/data/factories.ts', 'oemFactories');
  writeFileSync(join(dataDir, 'factories.json'), JSON.stringify(factories, null, 2) + '\n', 'utf8');
  console.log(`  ✓ factories.json (${factories.length} 家代工厂)`);
  
  // 3. 导出原料数据（各批次）
  console.log('\n导出原料数据...');
  const allIngredients = [];
  
  for (let i = 1; i <= 9; i++) {
    const fileName = `ingredients-batch${i}`;
    const tsPath = `src/data/${fileName}.ts`;
    
    if (!existsSync(resolve(projectRoot, tsPath))) {
      console.log(`  跳过 ${fileName}.ts (文件不存在)`);
      continue;
    }
    
    const batch = await loadTSData(tsPath, `batch${i}`);
    const jsonPath = join(dataDir, `${fileName}.json`);
    writeFileSync(jsonPath, JSON.stringify(batch, null, 2) + '\n', 'utf8');
    console.log(`  ✓ ${fileName}.json (${batch.length} 种原料)`);
    allIngredients.push(...batch);
  }
  
  // 4. 汇总所有原料
  writeFileSync(join(dataDir, 'all_ingredients.json'), JSON.stringify(allIngredients, null, 2) + '\n', 'utf8');
  console.log(`\n  ✓ all_ingredients.json (共 ${allIngredients.length} 种原料)`);
  
  // 5. 统计信息
  const stats = {
    exportTime: new Date().toISOString(),
    totalCategories: categories.length,
    totalFactories: factories.length,
    totalIngredients: allIngredients.length,
    ingredientsByCategory: {},
  };
  
  for (const cat of categories) {
    const count = allIngredients.filter(
      i => i.categoryId === cat.id || (i.secondaryCategoryIds && i.secondaryCategoryIds.includes(cat.id))
    ).length;
    stats.ingredientsByCategory[cat.id] = count;
  }
  
  writeFileSync(join(dataDir, '_stats.json'), JSON.stringify(stats, null, 2) + '\n', 'utf8');
  
  console.log('\n========================================');
  console.log('导出完成！');
  console.log(`  分类: ${stats.totalCategories} 个`);
  console.log(`  原料: ${stats.totalIngredients} 种`);
  console.log(`  代工厂: ${stats.totalFactories} 家`);
  console.log(`\nJSON 文件位于: data/`);
  console.log('========================================');
}

main().catch(err => {
  console.error('导出失败:', err);
  process.exit(1);
});
