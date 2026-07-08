import { useParams, useNavigate } from 'react-router-dom';
import { useState, useMemo } from 'react';
import { ingredients } from '@/data/index';
import { categories } from '@/data/categories';
import { PopularityBadge } from '@/components/PopularityBadge';
import { getIcon } from '@/lib/icons';
import { ArrowLeft, Search, ArrowUpDown } from 'lucide-react';

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

  return (
    <div className="animate-fade-in">
      {/* 头部 */}
      <div className="mb-8">
        <button onClick={() => navigate('/')} className="text-sm text-teal-600 hover:text-teal-700 mb-3 inline-flex items-center gap-1 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          返回分类列表
        </button>
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center shadow-md shadow-teal-500/20">
            <CategoryIcon className="w-7 h-7 text-white" strokeWidth={1.8} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800">{category.name}</h2>
            <p className="text-gray-500">{category.description} · 共 {categoryIngredients.length} 种原料</p>
          </div>
        </div>
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
