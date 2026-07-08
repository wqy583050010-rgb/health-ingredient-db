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
  website: string;
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

export interface Ingredient {
  id: string;
  name: string;
  nameEn: string;
  category: string;
  categoryId: string;
  secondaryCategoryIds?: string[]; // 次要分类ID，支持一个原料出现在多个分类中
  popularity?: number; // 1-5 星级热度评分
  wada?: WadaStatus;   // 运动营养：WADA 兴奋剂合规状态（赛内/赛外）
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
