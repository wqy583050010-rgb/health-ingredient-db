import { useParams, useNavigate } from 'react-router-dom';
import { useState, useMemo } from 'react';
import { ingredients } from '@/data/index';
import { categories } from '@/data/categories';
import { PopularityBadge } from '@/components/PopularityBadge';
import { getIcon } from '@/lib/icons';
import { ArrowLeft, Search, ArrowUpDown } from 'lucide-react';

// 分类专属 Banner 配置（渐变 hero + 标语 + 运动员提示）
const CATEGORY_BANNER: Record<string, { gradient: string; tagline: string; note?: string }> = {
  sports: {
    gradient: 'from-orange-500 via-red-500 to-rose-500',
    tagline: '力量 · 耐力 · 爆发力 · 恢复——基于循证的科学运动表现营养',
    note: '运动员提示：选购请认准 Informed-Sport / NSF Certified for Sport 认证产品，警惕补充剂交叉污染导致兴奋剂检测阳性。',
  },
  women: {
    gradient: 'from-pink-500 via-rose-500 to-fuchsia-500',
    tagline: '经期 · 孕期 · 更年期 · 骨骼 · 泌尿——女性全周期健康营养',
  },
};

export function CategoryPage() {
  const { categoryId } = useParams<{ categoryId: string }>();
  const navigate = useNavigate();
  const [localSearch, setLocalSearch] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'formula' | 'popularity'>('popularity');

  const category = categories.find((c) => c.id === categoryId);
  const categoryIngredients = useMemo(
    () => ingredients.filter((i) => i.categoryId === categoryId || (categoryId && i.secondaryCategoryIds?.includes(categoryId))),
    [categoryId]
  );

  // 本地过滤
  const filtered = useMemo(() => {
    let list = categoryIngredients;
    if (localSearch.trim()) {
      const q = localSearch.trim().toLowerCase();
      list = list.filter(
        (ing) =>
          ing.name.toLowerCase().includes(q) ||
          ing.nameEn.toLowerCase().includes(q) ||
          ing.chemicalStructure.molecularFormula.toLowerCase().includes(q) ||
          ing.chemicalStructure.casNumber.toLowerCase().includes(q)
      );
    }
    // 排序：默认按热度降序，热度相同按名称兜底，保证稳定
    return [...list].sort((a, b) => {
      if (sortBy === 'popularity') {
        const diff = (b.popularity ?? 3) - (a.popularity ?? 3);
        return diff !== 0 ? diff : a.name.localeCompare(b.name, 'zh');
      }
      if (sortBy === 'name') return a.name.localeCompare(b.name, 'zh');
      return a.chemicalStructure.molecularFormula.localeCompare(b.chemicalStructure.molecularFormula);
    });
  }, [categoryIngredients, localSearch, sortBy]);

  if (!category) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-400 text-lg">分类未找到</p>
        <button onClick={() => navigate('/')} className="mt-4 text-teal-600 hover:underline">返回首页</button>
      </div>
    );
  }

  const CategoryIcon = getIcon(category.icon);
  const banner = CATEGORY_BANNER[category.id] || { gradient: 'from-teal-500 to-cyan-500', tagline: category.description };

  return (
    <div className="animate-fade-in">
      {/* 专属 Banner */}
      <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${banner.gradient} p-6 md:p-8 mb-8 shadow-lg`}>
        <div className="absolute -top-12 -right-10 w-44 h-44 bg-white/10 rounded-full blur-2xl" />
        <div className="absolute -bottom-14 -left-10 w-40 h-40 bg-white/10 rounded-full blur-2xl" />
        <button onClick={() => navigate('/')} className="relative text-white/80 hover:text-white mb-4 inline-flex items-center gap-1 transition-colors text-sm">
          <ArrowLeft className="w-4 h-4" />
          返回分类列表
        </button>
        <div className="relative flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center shadow-inner">
            <CategoryIcon className="w-8 h-8 text-white" strokeWidth={1.8} />
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">{category.name}</h2>
            <p className="text-white/90 mt-1">共 {categoryIngredients.length} 种原料</p>
          </div>
        </div>
        <p className="relative text-white/95 mt-4 max-w-2xl text-sm md:text-base leading-relaxed">{banner.tagline}</p>
        {banner.note && (
          <p className="relative mt-3 text-white/90 text-xs bg-black/15 rounded-lg px-3 py-2 inline-block max-w-2xl">{banner.note}</p>
        )}
      </div>

      {/* 工具栏：本地搜索 + 排序 */}
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            placeholder="在此分类内搜索..."
            className="w-full pl-9 pr-4 py-2 text-sm bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-400 transition-all"
          />
        </div>
        <div className="flex items-center gap-2 text-sm">
          <ArrowUpDown className="w-4 h-4 text-gray-400" />
          <button
            onClick={() => setSortBy('popularity')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${sortBy === 'popularity' ? 'bg-teal-100 text-teal-700 font-medium' : 'bg-white text-gray-500 border border-gray-200 hover:bg-gray-50'}`}
          >
            按热度
          </button>
          <button
            onClick={() => setSortBy('name')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${sortBy === 'name' ? 'bg-teal-100 text-teal-700 font-medium' : 'bg-white text-gray-500 border border-gray-200 hover:bg-gray-50'}`}
          >
            按名称
          </button>
          <button
            onClick={() => setSortBy('formula')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${sortBy === 'formula' ? 'bg-teal-100 text-teal-700 font-medium' : 'bg-white text-gray-500 border border-gray-200 hover:bg-gray-50'}`}
          >
            按分子式
          </button>
        </div>
        <span className="text-sm text-gray-400 ml-auto">显示 {filtered.length}/{categoryIngredients.length}</span>
      </div>

      {/* 原料列表 */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-gray-100">
          <p className="text-gray-400">未找到匹配的原料</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((ing) => (
            <button
              key={ing.id}
              onClick={() => navigate(`/ingredient/${ing.id}`)}
              className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-lg hover:border-teal-200 transition-all duration-300 p-5 text-left group cursor-pointer"
            >
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-lg font-semibold text-gray-800 group-hover:text-teal-600 transition-colors">
                  {ing.name}
                </h3>
                <PopularityBadge popularity={ing.popularity} />
              </div>
              <p className="text-xs text-teal-600 font-mono mb-2">{ing.nameEn}</p>
              <p className="text-sm text-gray-500 line-clamp-2 mb-3">{ing.summary}</p>
              <div className="flex flex-wrap gap-1.5">
                <span className="text-xs bg-gray-50 text-gray-500 px-2 py-0.5 rounded-full font-mono">
                  {ing.chemicalStructure.molecularFormula}
                </span>
                <span className="text-xs bg-teal-50 text-teal-600 px-2 py-0.5 rounded-full">
                  {ing.dosage.recommended}{ing.dosage.unit}
                </span>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
