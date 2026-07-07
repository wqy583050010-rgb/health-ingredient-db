# 保健食品原料网站 - 数据管理指南

## 概述

本系统将网站数据从 TypeScript 代码中分离为 JSON 文本文件，让你可以直接编辑文本就能更新网站内容，无需修改代码。

## 文件结构

```
data/
├── categories.json              # 14个功效分类
├── factories.json               # 35家代工厂
├── ingredients-batch1.json      # 第1批原料（17种）
├── ingredients-batch2.json      # 第2批原料（27种）
├── ingredients-batch3.json      # 第3批原料（17种）
├── ingredients-batch4.json      # 第4批原料（28种）
├── ingredients-batch5.json      # 第5批原料（12种）
├── ingredients-batch6.json      # 第6批原料（18种，益生菌）
├── ingredients-batch7.json      # 第7批原料（17种）
├── ingredients-batch8.json      # 第8批原料（18种）
├── ingredients-batch9.json      # 第9批原料（20种，药食同源）
├── all_ingredients.json         # 所有原料汇总（174种，只读）
├── industry_reference.json      # 行业MOQ和价格参考表
├── template_ingredient.json     # 新原料模板
├── template_factory.json        # 新代工厂模板
└── _stats.json                  # 统计信息（自动生成）
```

## 常用操作

### 1. 修改现有原料

直接打开对应的 `ingredients-batch*.json` 文件，找到要修改的原料，编辑字段值即可。

**示例**：修改维生素D3的热度评级
```json
// 打开 ingredients-batch1.json，找到 "id": "vitamin-d3-immune"
// 将 "popularity": 5 改为 "popularity": 4
```

### 2. 添加新原料

1. 复制 `template_ingredient.json` 作为模板
2. 填入新原料信息
3. 将新原料的 JSON 对象添加到任意 `ingredients-batch*.json` 文件的数组末尾
4. 运行构建命令

**注意**：
- `id` 必须唯一，用英文小写+连字符（如 `new-ingredient-001`）
- `categoryId` 对应分类ID，可选值见下方"分类ID对照表"
- `secondaryCategoryIds` 是可选的，用于让原料同时出现在多个分类中
- `popularity` 是 1-5 的数字，5为最热门

### 3. 添加新代工厂

1. 复制 `template_factory.json` 作为模板
2. 填入新工厂信息
3. 将新工厂的 JSON 对象添加到 `factories.json` 的数组末尾
4. 运行构建命令

**注意**：
- `region` 必须是 `"domestic"` 或 `"international"`
- `stockCode` 是可选字段，没有上市则不需要此行

### 4. 修改分类

编辑 `categories.json`，添加或修改分类信息。

### 5. 构建和部署

打开终端（命令行），进入项目目录，运行：

```bash
# 仅验证数据格式（不生成文件）
python scripts/build_from_json.py --check

# 生成TS文件 + 构建网站（不部署）
python scripts/build_from_json.py

# 生成TS文件 + 构建 + 部署到GitHub Pages
python scripts/build_from_json.py --deploy
```

## 分类ID对照表

| ID | 中文名 | 图标 |
|----|--------|------|
| `immune` | 增强免疫力 | shield |
| `antioxidant` | 抗氧化/延缓衰老 | sparkles |
| `sleep` | 改善睡眠 | moon |
| `weight` | 体重管理 | scale |
| `liver` | 护肝养肝 | heart-pulse |
| `gut` | 肠道健康 | microscope |
| `cardiovascular` | 心血管健康 | heart |
| `bone` | 骨骼关节健康 | bone |
| `beauty` | 美容养颜 | gem |
| `eye` | 护眼明目 | eye |
| `energy` | 抗疲劳/提神 | zap |
| `bloodsugar` | 血糖管理 | activity |
| `probiotics` | 益生菌 | flask-round |
| `herb-food` | 药食同源 | leaf |

## 剂型分类对照

| 值 | 说明 |
|----|------|
| `传统剂型` | 软胶囊、片剂、硬胶囊、粉剂、口服液等 |
| `新型剂型` | 脂质体、微囊化、肠溶等 |
| `前沿剂型` | 口溶膜(ODF)、纳米乳等 |

## 合规状态对照

| 值 | 说明 |
|----|------|
| `approved` | 已批准/可用 |
| `restricted` | 限制使用 |
| `prohibited` | 禁止使用 |
| `pending` | 审批中 |

## 多分类关联

一个原料可以同时属于多个分类。例如，黄芪既是"增强免疫力"原料，又是"药食同源"原料：

```json
{
  "id": "astragalus-extract",
  "name": "黄芪提取物",
  "categoryId": "immune",
  "secondaryCategoryIds": ["herb-food"],
  ...
}
```

这样黄芪会同时出现在"增强免疫力"和"药食同源"两个分类页面中。

## 借助AI助手更新数据

如果你使用 AI 助手（如 WorkBuddy），可以：

1. **查看数据**：让AI读取并展示某个JSON文件的内容
2. **修改数据**：告诉AI要修改什么，AI直接编辑JSON文件
3. **添加数据**：提供原料信息，AI按照模板格式生成JSON并添加到对应文件
4. **一键部署**：让AI运行 `python scripts/build_from_json.py --deploy`

这样可以大幅减少AI的token消耗，因为AI只需要读写JSON文件，不需要理解TypeScript代码。

## 导出最新数据

如果你手动修改了TS文件（比如通过AI直接编辑代码），可以重新导出JSON：

```bash
node scripts/export_data.mjs
```

这会将 `src/data/*.ts` 中的所有数据重新导出为 JSON 文件。

## 常见问题

### Q: 修改了JSON后网站没变化？
A: 需要运行构建命令：`python scripts/build_from_json.py --deploy`

### Q: 部署后网站还是旧内容？
A: GitHub Pages CDN缓存约5-10分钟，请等待后刷新，或按 Ctrl+F5 强制刷新。

### Q: JSON格式报错？
A: 检查JSON语法 - 所有字符串必须用双引号，数组最后一项不能有逗号。可以先用 `--check` 模式验证。

### Q: 想新增一个分类？
A: 在 `categories.json` 中添加新分类，然后运行构建。注意需要在 HomePage.tsx 中添加对应的渐变色配置（需要AI帮助）。
