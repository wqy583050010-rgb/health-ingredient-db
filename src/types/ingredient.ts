// 保健食品原料类型定义

export type ComplianceRegion = 'CN' | 'US' | 'EU' | 'JP' | 'KR' | 'AU' | 'CA' | 'DE' | 'IN' | 'UK';

export interface ComplianceStatus {
  region: ComplianceRegion;
  regionName: string;
  status: 'approved' | 'restricted' | 'prohibited' | 'pending';
  description: string;
  maxDosage?: string;
  usageNote?: string;
}

export interface Supplier {
  name: string;
  country: string;
  website?: string;
  purity: string;
  features?: string;
}

export type DosageFormCategory = '传统剂型' | '新型剂型' | '前沿剂型';

export interface DosageForm {
  name: string;
  category: DosageFormCategory;
  description: string;
  advantages: string[];
}

export interface ProductCase {
  name: string;
  brand: string;
  url: string;
  price: string;
  sales: string;
  otherIngredients: string[];
  dosageForm: string;
}

export interface CostEstimate {
  rawMaterial: string; // 原料成本/kg
  dosageFormCost: {
    form: string;
    cost: string; // 制备成本/kg or per unit
  }[];
  packagingCost: string; // 包装成本 per unit
  totalEstimate: string; // 总体评估
}

export interface MechanismStep {
  title: string;
  description: string;
}

export interface WadaStatus {
  status: 'allowed' | 'monitor' | 'prohibited'; // allowed=不禁用; monitor=监测物质; prohibited=禁用
  inCompetition: boolean;   // 赛内是否允许
  outOfCompetition: boolean; // 赛外是否允许
  note?: string;            // 补充说明
}

// 溶解性 / 亲疏水性
export type Solubility = 'water' | 'fat' | 'both' | 'insoluble';
// water=水溶性 / fat=脂溶性 / both=两亲可溶 / insoluble=难溶或不溶
export type Hydrophilicity = 'hydrophilic' | 'lipophilic' | 'amphiphilic';
// hydrophilic=亲水 / lipophilic=疏水 / amphiphilic=两亲
export interface SolubilityInfo {
  solubility: Solubility;
  hydrophilicity: Hydrophilicity;
  note?: string; // 吸收/服用提示，如"随餐脂类同服吸收更佳"
}

// 科学证据 / 文献来源
export type EvidenceType = 'meta' | 'rct' | 'review' | 'animal' | 'cell' | 'theoretical' | 'other';
// meta=Meta分析 / rct=随机对照试验 / review=综述 / animal=动物实验 / cell=细胞实验 / theoretical=理论机制 / other=其他
export type EvidenceLevel = 'A' | 'B' | 'C' | 'D';
// A=强证据(Meta/RCT一致) B=中等(RCT/综述) C=初步(动物/细胞) D=理论/机制
export interface Reference {
  citation: string;       // 文献引文
  type?: EvidenceType;    // 研究类型
  evidenceLevel?: EvidenceLevel; // 证据等级
  source?: string;        // 来源，如 PubMed / EFSA / FDA / NMPA / 期刊
  pmid?: string;          // PubMed ID（查不到则留空，前端显示"待补充"，严禁编造）
  url?: string;           // 来源链接
}
export interface EvidenceSummary {
  level: EvidenceLevel;   // 整体最高证据等级
  note?: string;          // 说明
}
export interface BrandedIngredient {
  name: string;   // 成分/通用名
  brand: string;  // 商标名，如 Uthever®
  company: string;// 商标持有公司
  note?: string;  // 备注
}

export interface Ingredient {
  id: string;
  name: string;
  nameEn: string;
  category: string;
  categoryId: string;
  secondaryCategoryIds?: string[]; // 次要分类ID，支持一个原料出现在多个分类中
  popularity?: number; // 1-5 星级热度评分
  wada?: WadaStatus;   // 运动营养：WADA 兴奋剂合规状态（赛内/赛外）
  solubilityInfo?: SolubilityInfo; // 溶解性与亲疏水性（水溶性/脂溶性/两亲、亲水/疏水、吸收提示）
  evidenceSummary?: EvidenceSummary; // 整体证据等级（A-D）
  references?: Reference[];          // 结构化科学文献（替代 mechanism.scientificReferences 纯文本）
  brandedIngredients?: BrandedIngredient[]; // 知名商标原料（如 Uthever®/Kaneka®/AstaReal®）
  summary: string;
  
  // 化学信息
  chemicalStructure: {
    smiles: string;
    molecularFormula: string;
    molecularWeight: string;
    casNumber: string;
  };

  // 起效剂量
  dosage: {
    minEffective: string;
    recommended: string;
    safeUpperLimit: string;
    unit: string;
    note: string;
  };

  // 常见存在形式
  forms: {
    name: string;
    description: string;
    bioavailability: string;
    advantages: string[];
    disadvantages: string[];
  }[];

  // 供应商
  suppliers: Supplier[];

  // 剂型
  dosageForms: DosageForm[];

  // 全球合规性
  compliance: ComplianceStatus[];

  // 功效说明
  efficacy: string;

  // 作用机理
  mechanism: {
    overview: string;
    steps: MechanismStep[];
    scientificReferences: string[];
  };

  // 产品案例
  productCases: ProductCase[];

  // 成本评估
  costs: CostEstimate;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  description: string;
  ingredientCount: number;
}
