// 保健食品原料数据库主入口
// 由 build_from_json.py 自动生成
// 生成时间: 2026-07-10 10:51:23

import { ingredients } from './ingredients';

export { ingredients };
export { categories } from './categories';
export { interactionsByIngredient } from './interactions';
export type { Category, ComplianceRegion, ComplianceStatus, Supplier, DosageForm, ProductCase, CostEstimate, MechanismStep } from '@/types/ingredient';
export type { InteractionItem } from './interactions';
