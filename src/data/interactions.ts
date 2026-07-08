// 配伍禁忌与协同增效关系表
// 由 data/interactions.json 自动生成，请勿手改

export interface InteractionItem {
  otherId?: string;      // 对方原料 id（站内可跳转）；药物/食物类别则为 undefined
  otherName: string;     // 对方名称（原料名或药物/食物类别名）
  type: 'synergy' | 'contra';
  level?: 'high' | 'medium' | 'low';  // 仅 contra 使用
  text: string;
}

export const interactionsByIngredient: Record<string, InteractionItem[]> = {
  "calcium-carbonate-bone": [
    {
      "otherName": "铁元素（甘氨酸铁）",
      "type": "contra",
      "text": "钙盐在肠道与铁竞争吸收并抑制非血红素铁吸收（降幅约50–60%），两者需间隔≥2小时服用。",
      "otherId": "iron-bisglycinate",
      "level": "high"
    },
    {
      "otherName": "锌",
      "type": "contra",
      "text": "高剂量钙与锌竞争同一吸收通道，长期同服可能降低锌吸收，建议错峰补充。",
      "otherId": "zinc-immune",
      "level": "medium"
    },
    {
      "otherName": "左甲状腺素（甲状腺激素药）",
      "type": "contra",
      "text": "钙盐显著降低左甲状腺素吸收，需间隔≥4小时服用。",
      "level": "high"
    },
    {
      "otherName": "维生素D3",
      "type": "synergy",
      "text": "维生素D3促进肠道钙吸收，补钙须同补维D，二者为核心骨骼组合。",
      "otherId": "vitamin-d3-immune"
    },
    {
      "otherName": "维生素K2 MK-7",
      "type": "synergy",
      "text": "钙需维K2引导进入骨骼，避免钙异位沉积于血管。",
      "otherId": "vitamin-k2-mk7"
    },
    {
      "otherName": "咖啡因",
      "type": "contra",
      "text": "高剂量咖啡因（>300–400mg/日）轻度增加尿钙排泄，长期大量或影响骨密度，建议适量补钙。",
      "otherId": "caffeine",
      "level": "low"
    },
    {
      "otherName": "大豆异黄酮",
      "type": "synergy",
      "text": "大豆异黄酮（植物雌激素）与钙协同支持女性骨密度，常用于围绝经期骨骼养护。",
      "otherId": "soy-isoflavone"
    }
  ],
  "iron-bisglycinate": [
    {
      "otherName": "钙(碳酸钙)",
      "type": "contra",
      "text": "钙盐在肠道与铁竞争吸收并抑制非血红素铁吸收（降幅约50–60%），两者需间隔≥2小时服用。",
      "otherId": "calcium-carbonate-bone",
      "level": "high"
    },
    {
      "otherName": "锌",
      "type": "contra",
      "text": "锌与铁在肠道竞争吸收，高剂量同服互相削弱吸收，建议间隔服用。",
      "otherId": "zinc-immune",
      "level": "medium"
    },
    {
      "otherName": "茶/咖啡（鞣酸）",
      "type": "contra",
      "text": "鞣酸与铁形成不溶复合物降低吸收，服铁前后1–2小时避免饮茶、咖啡。",
      "level": "medium"
    },
    {
      "otherName": "镁制剂（各类）",
      "type": "contra",
      "text": "镁与铁在肠道竞争吸收，建议错峰服用。",
      "level": "medium"
    },
    {
      "otherName": "维生素C",
      "type": "synergy",
      "text": "维生素C将Fe³⁺还原为易吸收的Fe²⁺并络合铁，显著提升非血红素铁吸收，建议同服。",
      "otherId": "vitamin-c-beauty"
    },
    {
      "otherName": "咖啡因",
      "type": "contra",
      "text": "咖啡因可轻度抑制非血红素铁吸收，服铁剂前后1–2小时避免饮咖啡/浓茶。",
      "otherId": "caffeine",
      "level": "medium"
    }
  ],
  "zinc-immune": [
    {
      "otherName": "钙(碳酸钙)",
      "type": "contra",
      "text": "高剂量钙与锌竞争同一吸收通道，长期同服可能降低锌吸收，建议错峰补充。",
      "otherId": "calcium-carbonate-bone",
      "level": "medium"
    },
    {
      "otherName": "铁元素（甘氨酸铁）",
      "type": "contra",
      "text": "锌与铁在肠道竞争吸收，高剂量同服互相削弱吸收，建议间隔服用。",
      "otherId": "iron-bisglycinate",
      "level": "medium"
    },
    {
      "otherName": "铜（膳食矿物质）",
      "type": "contra",
      "text": "长期高剂量补锌（>40mg/日）可诱导铜缺乏，需注意膳食铜摄入或适量补充。",
      "level": "medium"
    }
  ],
  "magnesium-citrate-bone": [
    {
      "otherName": "喹诺酮/四环素类抗菌药物",
      "type": "contra",
      "text": "镁在肠道与喹诺酮/四环素类抗菌药螯合，显著降低其吸收，需间隔2–4小时服用。",
      "level": "high"
    },
    {
      "otherName": "维生素D3",
      "type": "synergy",
      "text": "镁是维生素D活化为1,25-(OH)₂D₃的必需辅酶，缺镁则维D难以起效，二者协同增效。",
      "otherId": "vitamin-d3-immune"
    },
    {
      "otherName": "褪黑素",
      "type": "synergy",
      "text": "镁放松神经肌肉、褪黑素调节睡眠节律，二者协同改善入睡与睡眠质量。",
      "otherId": "melatonin"
    },
    {
      "otherName": "钾",
      "type": "synergy",
      "text": "镁、钾共同维持心肌电稳定与电解质平衡，常协同补充。",
      "otherId": "potassium-cardio"
    },
    {
      "otherName": "咖啡因",
      "type": "contra",
      "text": "咖啡因的利尿作用增加镁经尿排泄，长期大量咖啡摄入者需关注镁水平。",
      "otherId": "caffeine",
      "level": "low"
    }
  ],
  "magnesium-cardio": [
    {
      "otherName": "喹诺酮/四环素类抗菌药物",
      "type": "contra",
      "text": "镁在肠道与喹诺酮/四环素类抗菌药螯合，显著降低其吸收，需间隔2–4小时服用。",
      "level": "high"
    },
    {
      "otherName": "维生素D3",
      "type": "synergy",
      "text": "镁是维生素D活化为1,25-(OH)₂D₃的必需辅酶，缺镁则维D难以起效，二者协同增效。",
      "otherId": "vitamin-d3-immune"
    },
    {
      "otherName": "褪黑素",
      "type": "synergy",
      "text": "镁放松神经肌肉、褪黑素调节睡眠节律，二者协同改善入睡与睡眠质量。",
      "otherId": "melatonin"
    },
    {
      "otherName": "钾",
      "type": "synergy",
      "text": "镁、钾共同维持心肌电稳定与电解质平衡，常协同补充。",
      "otherId": "potassium-cardio"
    }
  ],
  "magnesium-glycinate": [
    {
      "otherName": "喹诺酮/四环素类抗菌药物",
      "type": "contra",
      "text": "镁在肠道与喹诺酮/四环素类抗菌药螯合，显著降低其吸收，需间隔2–4小时服用。",
      "level": "high"
    },
    {
      "otherName": "维生素D3",
      "type": "synergy",
      "text": "镁是维生素D活化为1,25-(OH)₂D₃的必需辅酶，缺镁则维D难以起效，二者协同增效。",
      "otherId": "vitamin-d3-immune"
    },
    {
      "otherName": "褪黑素",
      "type": "synergy",
      "text": "镁放松神经肌肉、褪黑素调节睡眠节律，二者协同改善入睡与睡眠质量。",
      "otherId": "melatonin"
    },
    {
      "otherName": "钾",
      "type": "synergy",
      "text": "镁、钾共同维持心肌电稳定与电解质平衡，常协同补充。",
      "otherId": "potassium-cardio"
    }
  ],
  "potassium-cardio": [
    {
      "otherName": "ACE抑制剂/ARB/保钾类利尿剂",
      "type": "contra",
      "text": "同用可致高钾血症，肾功能不全者尤甚，须监测血钾水平。",
      "level": "high"
    },
    {
      "otherName": "柠檬酸镁",
      "type": "synergy",
      "text": "镁、钾共同维持心肌电稳定与电解质平衡，常协同补充。",
      "otherId": "magnesium-citrate-bone"
    },
    {
      "otherName": "镁",
      "type": "synergy",
      "text": "镁、钾共同维持心肌电稳定与电解质平衡，常协同补充。",
      "otherId": "magnesium-cardio"
    },
    {
      "otherName": "甘氨酸镁",
      "type": "synergy",
      "text": "镁、钾共同维持心肌电稳定与电解质平衡，常协同补充。",
      "otherId": "magnesium-glycinate"
    }
  ],
  "coenzyme-q10-energy": [
    {
      "otherName": "华法林等维生素K拮抗类抗凝药",
      "type": "contra",
      "text": "辅酶Q10可能增强华法林抗凝效果或影响INR稳定，联用需监测凝血指标。",
      "level": "medium"
    },
    {
      "otherName": "Omega-3 EPA/DHA",
      "type": "synergy",
      "text": "辅酶Q10与Omega-3协同护心：前者改善线粒体能量与抗氧化，后者调脂抗炎。",
      "otherId": "omega-3-epa-dha"
    },
    {
      "otherName": "左旋肉碱",
      "type": "synergy",
      "text": "左旋肉碱转运脂肪酸入线粒体、辅酶Q10参与电子传递链，二者协同提升能量代谢。",
      "otherId": "l-carnitine-weight"
    },
    {
      "otherName": "维生素E(生育酚)",
      "type": "synergy",
      "text": "脂溶性抗氧化协同：维生素E保护细胞膜、辅酶Q10保护线粒体。",
      "otherId": "vitamin-e"
    }
  ],
  "omega-3-epa-dha": [
    {
      "otherName": "抗凝药/抗血小板药（阿司匹林、氯吡格雷等）",
      "type": "contra",
      "text": "Omega-3抑制血小板聚集，与抗凝/抗血小板药联用增加出血风险。",
      "level": "high"
    },
    {
      "otherName": "辅酶Q10",
      "type": "synergy",
      "text": "辅酶Q10与Omega-3协同护心：前者改善线粒体能量与抗氧化，后者调脂抗炎。",
      "otherId": "coenzyme-q10-energy"
    },
    {
      "otherName": "维生素D3",
      "type": "synergy",
      "text": "Omega-3抗炎与维D免疫调节协同，常见于心血管/免疫复合配方。",
      "otherId": "vitamin-d3-immune"
    },
    {
      "otherName": "纳豆激酶",
      "type": "synergy",
      "text": "纳豆激酶溶栓、Omega-3调脂抗炎，心血管健康协同组合。",
      "otherId": "nattokinase"
    }
  ],
  "nattokinase": [
    {
      "otherName": "抗凝药/抗血小板药",
      "type": "contra",
      "text": "纳豆激酶有纤溶作用，与抗凝/抗血小板药联用出血风险叠加，手术前建议停用。",
      "level": "high"
    },
    {
      "otherName": "Omega-3 EPA/DHA",
      "type": "synergy",
      "text": "纳豆激酶溶栓、Omega-3调脂抗炎，心血管健康协同组合。",
      "otherId": "omega-3-epa-dha"
    }
  ],
  "curcumin-antioxidant": [
    {
      "otherName": "抗凝药/抗血小板药",
      "type": "contra",
      "text": "姜黄具轻度抗血小板与抗凝活性，大剂量联用可能增加出血风险。",
      "level": "medium"
    },
    {
      "otherName": "黑胡椒（胡椒碱）",
      "type": "synergy",
      "text": "黑胡椒中的胡椒碱抑制姜黄代谢、将其生物利用度提升约20倍，建议同服。"
    }
  ],
  "vitamin-e": [
    {
      "otherName": "高剂量抗凝药",
      "type": "contra",
      "text": "高剂量维生素E（>400IU/日）可能延长出血时间，与抗凝药联用需谨慎。",
      "level": "medium"
    },
    {
      "otherName": "硒",
      "type": "synergy",
      "text": "维生素E与硒协同构成抗氧化防线：硒是谷胱甘肽过氧化物酶成分，并可再生维E。",
      "otherId": "selenium"
    },
    {
      "otherName": "维生素C",
      "type": "synergy",
      "text": "维生素C在水相再生被氧化的维生素E，形成脂质-水相联合抗氧化。",
      "otherId": "vitamin-c-beauty"
    },
    {
      "otherName": "辅酶Q10",
      "type": "synergy",
      "text": "脂溶性抗氧化协同：维生素E保护细胞膜、辅酶Q10保护线粒体。",
      "otherId": "coenzyme-q10-energy"
    }
  ],
  "lactobacillus-acidophilus-gut": [
    {
      "otherName": "抗菌药物（抗生素）",
      "type": "contra",
      "text": "抗生素会杀灭益生菌，需间隔≥2小时服用，疗程结束后建议补菌恢复菌群。",
      "level": "high"
    },
    {
      "otherName": "菊粉",
      "type": "synergy",
      "text": "菊粉作为益生元被益生菌发酵增殖，形成『合生元』协同，改善肠道微生态。",
      "otherId": "inulin-gut"
    },
    {
      "otherName": "低聚果糖(FOS)",
      "type": "synergy",
      "text": "低聚果糖(FOS)作为益生元选择性增殖益生菌，与益生菌形成『合生元』协同。",
      "otherId": "fos-gut"
    },
    {
      "otherName": "低聚半乳糖(GOS)",
      "type": "synergy",
      "text": "低聚半乳糖(GOS)作为益生元喂养益生菌，与益生菌形成『合生元』协同。",
      "otherId": "gos-gut"
    }
  ],
  "saccharomyces-boulardii-gut": [
    {
      "otherName": "抗菌药物（抗生素）",
      "type": "contra",
      "text": "抗生素会杀灭益生菌，需间隔≥2小时服用，疗程结束后建议补菌恢复菌群。",
      "level": "high"
    },
    {
      "otherName": "菊粉",
      "type": "synergy",
      "text": "菊粉作为益生元被益生菌发酵增殖，形成『合生元』协同，改善肠道微生态。",
      "otherId": "inulin-gut"
    },
    {
      "otherName": "低聚果糖(FOS)",
      "type": "synergy",
      "text": "低聚果糖(FOS)作为益生元选择性增殖益生菌，与益生菌形成『合生元』协同。",
      "otherId": "fos-gut"
    },
    {
      "otherName": "低聚半乳糖(GOS)",
      "type": "synergy",
      "text": "低聚半乳糖(GOS)作为益生元喂养益生菌，与益生菌形成『合生元』协同。",
      "otherId": "gos-gut"
    }
  ],
  "melatonin": [
    {
      "otherName": "镇静/催眠类中枢抑制药",
      "type": "contra",
      "text": "与镇静催眠药叠加中枢抑制，可能引起过度嗜睡，应避免同服。",
      "level": "medium"
    },
    {
      "otherName": "柠檬酸镁",
      "type": "synergy",
      "text": "镁放松神经肌肉、褪黑素调节睡眠节律，二者协同改善入睡与睡眠质量。",
      "otherId": "magnesium-citrate-bone"
    },
    {
      "otherName": "镁",
      "type": "synergy",
      "text": "镁放松神经肌肉、褪黑素调节睡眠节律，二者协同改善入睡与睡眠质量。",
      "otherId": "magnesium-cardio"
    },
    {
      "otherName": "甘氨酸镁",
      "type": "synergy",
      "text": "镁放松神经肌肉、褪黑素调节睡眠节律，二者协同改善入睡与睡眠质量。",
      "otherId": "magnesium-glycinate"
    }
  ],
  "vitamin-c-beauty": [
    {
      "otherName": "维生素B12（甲钴胺）",
      "type": "contra",
      "text": "大剂量维生素C可能破坏维生素B12活性，长期高VC摄入者注意B12补充。",
      "level": "medium"
    },
    {
      "otherName": "铁元素（甘氨酸铁）",
      "type": "synergy",
      "text": "维生素C将Fe³⁺还原为易吸收的Fe²⁺并络合铁，显著提升非血红素铁吸收，建议同服。",
      "otherId": "iron-bisglycinate"
    },
    {
      "otherName": "维生素E(生育酚)",
      "type": "synergy",
      "text": "维生素C在水相再生被氧化的维生素E，形成脂质-水相联合抗氧化。",
      "otherId": "vitamin-e"
    },
    {
      "otherName": "谷胱甘肽",
      "type": "synergy",
      "text": "维生素C还原氧化型谷胱甘肽，维持细胞内谷胱甘肽抗氧化循环。",
      "otherId": "glutathione"
    },
    {
      "otherName": "绿茶提取物（EGCG）",
      "type": "synergy",
      "text": "维生素C提升儿茶素稳定性与抗氧化活性。",
      "otherId": "green-tea-egcg-antioxidant"
    }
  ],
  "vitamin-d3-immune": [
    {
      "otherName": "噻嗪类利尿剂",
      "type": "contra",
      "text": "长期大剂量维生素D联合噻嗪类利尿剂可能增加高钙血症风险。",
      "level": "medium"
    },
    {
      "otherName": "钙(碳酸钙)",
      "type": "synergy",
      "text": "维生素D3促进肠道钙吸收，补钙须同补维D，二者为核心骨骼组合。",
      "otherId": "calcium-carbonate-bone"
    },
    {
      "otherName": "柠檬酸镁",
      "type": "synergy",
      "text": "镁是维生素D活化为1,25-(OH)₂D₃的必需辅酶，缺镁则维D难以起效，二者协同增效。",
      "otherId": "magnesium-citrate-bone"
    },
    {
      "otherName": "镁",
      "type": "synergy",
      "text": "镁是维生素D活化为1,25-(OH)₂D₃的必需辅酶，缺镁则维D难以起效，二者协同增效。",
      "otherId": "magnesium-cardio"
    },
    {
      "otherName": "甘氨酸镁",
      "type": "synergy",
      "text": "镁是维生素D活化为1,25-(OH)₂D₃的必需辅酶，缺镁则维D难以起效，二者协同增效。",
      "otherId": "magnesium-glycinate"
    },
    {
      "otherName": "维生素K2 MK-7",
      "type": "synergy",
      "text": "维D增加钙吸收，维K2激活骨钙素引导钙沉积入骨、防止血管钙化，构成骨骼健康黄金组合。",
      "otherId": "vitamin-k2-mk7"
    },
    {
      "otherName": "Omega-3 EPA/DHA",
      "type": "synergy",
      "text": "Omega-3抗炎与维D免疫调节协同，常见于心血管/免疫复合配方。",
      "otherId": "omega-3-epa-dha"
    }
  ],
  "vitamin-k2-mk7": [
    {
      "otherName": "维生素D3",
      "type": "synergy",
      "text": "维D增加钙吸收，维K2激活骨钙素引导钙沉积入骨、防止血管钙化，构成骨骼健康黄金组合。",
      "otherId": "vitamin-d3-immune"
    },
    {
      "otherName": "钙(碳酸钙)",
      "type": "synergy",
      "text": "钙需维K2引导进入骨骼，避免钙异位沉积于血管。",
      "otherId": "calcium-carbonate-bone"
    }
  ],
  "inulin-gut": [
    {
      "otherName": "嗜酸乳杆菌",
      "type": "synergy",
      "text": "菊粉作为益生元被益生菌发酵增殖，形成『合生元』协同，改善肠道微生态。",
      "otherId": "lactobacillus-acidophilus-gut"
    },
    {
      "otherName": "布拉氏酵母菌",
      "type": "synergy",
      "text": "菊粉作为益生元被益生菌发酵增殖，形成『合生元』协同，改善肠道微生态。",
      "otherId": "saccharomyces-boulardii-gut"
    },
    {
      "otherName": "吡啶甲酸铬",
      "type": "synergy",
      "text": "铬参与糖代谢、膳食纤维延缓糖吸收，协同支持血糖平稳。",
      "otherId": "chromium-picolinate"
    }
  ],
  "fos-gut": [
    {
      "otherName": "嗜酸乳杆菌",
      "type": "synergy",
      "text": "低聚果糖(FOS)作为益生元选择性增殖益生菌，与益生菌形成『合生元』协同。",
      "otherId": "lactobacillus-acidophilus-gut"
    },
    {
      "otherName": "布拉氏酵母菌",
      "type": "synergy",
      "text": "低聚果糖(FOS)作为益生元选择性增殖益生菌，与益生菌形成『合生元』协同。",
      "otherId": "saccharomyces-boulardii-gut"
    }
  ],
  "gos-gut": [
    {
      "otherName": "嗜酸乳杆菌",
      "type": "synergy",
      "text": "低聚半乳糖(GOS)作为益生元喂养益生菌，与益生菌形成『合生元』协同。",
      "otherId": "lactobacillus-acidophilus-gut"
    },
    {
      "otherName": "布拉氏酵母菌",
      "type": "synergy",
      "text": "低聚半乳糖(GOS)作为益生元喂养益生菌，与益生菌形成『合生元』协同。",
      "otherId": "saccharomyces-boulardii-gut"
    }
  ],
  "folic-acid-cardio": [
    {
      "otherName": "维生素B12（甲钴胺）",
      "type": "synergy",
      "text": "叶酸与B12协同代谢同型半胱氨酸、支持神经与红细胞生成，缺一则另一利用受阻。"
    }
  ],
  "selenium": [
    {
      "otherName": "维生素E(生育酚)",
      "type": "synergy",
      "text": "维生素E与硒协同构成抗氧化防线：硒是谷胱甘肽过氧化物酶成分，并可再生维E。",
      "otherId": "vitamin-e"
    }
  ],
  "glutathione": [
    {
      "otherName": "维生素C",
      "type": "synergy",
      "text": "维生素C还原氧化型谷胱甘肽，维持细胞内谷胱甘肽抗氧化循环。",
      "otherId": "vitamin-c-beauty"
    }
  ],
  "l-carnitine-weight": [
    {
      "otherName": "辅酶Q10",
      "type": "synergy",
      "text": "左旋肉碱转运脂肪酸入线粒体、辅酶Q10参与电子传递链，二者协同提升能量代谢。",
      "otherId": "coenzyme-q10-energy"
    },
    {
      "otherName": "咖啡因",
      "type": "synergy",
      "text": "咖啡因促进脂肪氧化、左旋肉碱转运脂肪酸入线粒体，二者协同提升运动中的脂肪供能与耐力。",
      "otherId": "caffeine"
    }
  ],
  "ginseng-extract": [
    {
      "otherName": "红景天提取物",
      "type": "synergy",
      "text": "人参、红景天同属适应原，协同抗疲劳、提升应激耐受与精力。",
      "otherId": "rhodiola-extract"
    }
  ],
  "rhodiola-extract": [
    {
      "otherName": "人参提取物（人参皂苷）",
      "type": "synergy",
      "text": "人参、红景天同属适应原，协同抗疲劳、提升应激耐受与精力。",
      "otherId": "ginseng-extract"
    }
  ],
  "chromium-picolinate": [
    {
      "otherName": "菊粉",
      "type": "synergy",
      "text": "铬参与糖代谢、膳食纤维延缓糖吸收，协同支持血糖平稳。",
      "otherId": "inulin-gut"
    }
  ],
  "green-tea-egcg-antioxidant": [
    {
      "otherName": "维生素C",
      "type": "synergy",
      "text": "维生素C提升儿茶素稳定性与抗氧化活性。",
      "otherId": "vitamin-c-beauty"
    }
  ],
  "l-arginine": [
    {
      "otherName": "瓜氨酸（膳食/补充）",
      "type": "synergy",
      "text": "精氨酸与瓜氨酸协同提升一氧化氮水平，支持血流与运动表现。"
    }
  ],
  "caffeine": [
    {
      "otherName": "铁元素（甘氨酸铁）",
      "type": "contra",
      "text": "咖啡因可轻度抑制非血红素铁吸收，服铁剂前后1–2小时避免饮咖啡/浓茶。",
      "otherId": "iron-bisglycinate",
      "level": "medium"
    },
    {
      "otherName": "钙(碳酸钙)",
      "type": "contra",
      "text": "高剂量咖啡因（>300–400mg/日）轻度增加尿钙排泄，长期大量或影响骨密度，建议适量补钙。",
      "otherId": "calcium-carbonate-bone",
      "level": "low"
    },
    {
      "otherName": "柠檬酸镁",
      "type": "contra",
      "text": "咖啡因的利尿作用增加镁经尿排泄，长期大量咖啡摄入者需关注镁水平。",
      "otherId": "magnesium-citrate-bone",
      "level": "low"
    },
    {
      "otherName": "肌酸",
      "type": "contra",
      "text": "部分研究显示大剂量咖啡因可能削弱肌酸的部分运动增益（证据不完全一致），叠加使用时注意个体反应。",
      "otherId": "creatine",
      "level": "low"
    },
    {
      "otherName": "左旋肉碱",
      "type": "synergy",
      "text": "咖啡因促进脂肪氧化、左旋肉碱转运脂肪酸入线粒体，二者协同提升运动中的脂肪供能与耐力。",
      "otherId": "l-carnitine-weight"
    }
  ],
  "creatine": [
    {
      "otherName": "咖啡因",
      "type": "contra",
      "text": "部分研究显示大剂量咖啡因可能削弱肌酸的部分运动增益（证据不完全一致），叠加使用时注意个体反应。",
      "otherId": "caffeine",
      "level": "low"
    },
    {
      "otherName": "乳清蛋白",
      "type": "synergy",
      "text": "运动后乳清蛋白修复肌肉、肌酸充能，二者协同促进恢复与力量增长。",
      "otherId": "whey-protein"
    }
  ],
  "cranberry": [
    {
      "otherName": "华法林等维生素K拮抗类抗凝药",
      "type": "contra",
      "text": "蔓越莓（尤其果汁/提取物）可能增强华法林抗凝效应、引起INR波动并升高出血风险，联用需监测凝血指标。",
      "level": "medium"
    },
    {
      "otherName": "其他抗凝/抗血小板药（阿司匹林、氯吡格雷等）",
      "type": "contra",
      "text": "蔓越莓可能轻度影响血小板功能，与上述药物联用出血风险增加。",
      "level": "medium"
    }
  ],
  "soy-isoflavone": [
    {
      "otherName": "他莫昔芬/雌激素受体调节剂（乳腺癌治疗药）",
      "type": "contra",
      "text": "大豆异黄酮具弱植物雌激素活性，雌激素受体阳性乳腺癌患者或服用他莫昔芬者建议咨询医生后再用。",
      "level": "medium"
    },
    {
      "otherName": "左甲状腺素（甲状腺激素药）",
      "type": "contra",
      "text": "大量大豆制品可能影响左甲状腺素吸收，需间隔≥4小时服用。",
      "level": "low"
    },
    {
      "otherName": "钙(碳酸钙)",
      "type": "synergy",
      "text": "大豆异黄酮（植物雌激素）与钙协同支持女性骨密度，常用于围绝经期骨骼养护。",
      "otherId": "calcium-carbonate-bone"
    }
  ],
  "black-cohosh": [
    {
      "otherName": "肝毒性风险药物/他莫昔芬",
      "type": "contra",
      "text": "黑升麻有罕见严重肝损伤报道，避免与他莫昔芬及具肝毒性药物同用，建议短期使用并监测肝功能。",
      "level": "medium"
    }
  ],
  "chasteberry": [
    {
      "otherName": "多巴胺能药物/口服避孕药/SSRI类抗抑郁药",
      "type": "contra",
      "text": "圣洁莓影响多巴胺与泌乳素水平，避免与抗精神病药、口服避孕药、SSRI等联用。",
      "level": "medium"
    }
  ],
  "red-clover": [
    {
      "otherName": "抗凝药/雌激素相关药物",
      "type": "contra",
      "text": "红三叶草含异黄酮（植物雌激素）并可能轻度影响血小板，与抗凝药或激素疗法联用需谨慎。",
      "level": "low"
    }
  ],
  "equol": [
    {
      "otherName": "他莫昔芬/雌激素相关药物",
      "type": "contra",
      "text": "雌马酚为大豆异黄酮代谢物、具植物雌激素活性，ER+乳腺癌患者或服他莫昔芬者慎用。",
      "level": "medium"
    }
  ],
  "citrulline-malate": [
    {
      "otherName": "硝酸酯类/西地那非(PDE5抑制剂)",
      "type": "contra",
      "text": "瓜氨酸经代谢生成精氨酸、提升一氧化氮(NO)而扩血管，与硝酸甘油、西地那非等联用可致严重低血压，属绝对禁忌。",
      "level": "high"
    },
    {
      "otherName": "甜菜根提取物",
      "type": "synergy",
      "text": "瓜氨酸与甜菜根硝酸盐协同提升一氧化氮与血流，增强运动泵感与耐力表现。",
      "otherId": "beetroot-extract"
    }
  ],
  "beetroot-extract": [
    {
      "otherName": "硝酸酯类/西地那非(PDE5抑制剂)",
      "type": "contra",
      "text": "甜菜根硝酸盐扩血管、降血压，与上述药物联用需谨慎监测血压。",
      "level": "medium"
    },
    {
      "otherName": "瓜氨酸苹果酸",
      "type": "synergy",
      "text": "瓜氨酸与甜菜根硝酸盐协同提升一氧化氮与血流，增强运动泵感与耐力表现。",
      "otherId": "citrulline-malate"
    }
  ],
  "bcaa": [
    {
      "otherName": "左旋多巴（帕金森治疗药）",
      "type": "contra",
      "text": "支链氨基酸与左旋多巴竞争同一中性氨基酸转运体，可能削弱药效，需间隔服用。",
      "level": "medium"
    },
    {
      "otherName": "乳清蛋白",
      "type": "synergy",
      "text": "支链氨基酸(BCAA)与完整乳清蛋白协同刺激肌肉蛋白合成、减少运动性肌肉分解。",
      "otherId": "whey-protein"
    }
  ],
  "whey-protein": [
    {
      "otherName": "喹诺酮/四环素类抗菌药物",
      "type": "contra",
      "text": "乳清蛋白中的钙与氨基酸可与喹诺酮、四环素类抗菌药螯合降低吸收，需间隔2小时服用。",
      "level": "medium"
    },
    {
      "otherName": "肌酸",
      "type": "synergy",
      "text": "运动后乳清蛋白修复肌肉、肌酸充能，二者协同促进恢复与力量增长。",
      "otherId": "creatine"
    },
    {
      "otherName": "支链氨基酸",
      "type": "synergy",
      "text": "支链氨基酸(BCAA)与完整乳清蛋白协同刺激肌肉蛋白合成、减少运动性肌肉分解。",
      "otherId": "bcaa"
    }
  ]
};
