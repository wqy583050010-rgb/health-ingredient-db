import { useState, useMemo, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ingredients } from '@/data/index';
import { Search, X, ChevronRight } from 'lucide-react';

export function SearchBar() {
  const [query, setQuery] = useState('');
  const [showResults, setShowResults] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // 搜索结果（最多显示10条）
  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.trim().toLowerCase();
    return ingredients
      .filter((ing) =>
        ing.name.toLowerCase().includes(q) ||
        ing.nameEn.toLowerCase().includes(q) ||
        ing.category.toLowerCase().includes(q) ||
        ing.summary.toLowerCase().includes(q) ||
        ing.chemicalStructure.molecularFormula.toLowerCase().includes(q) ||
        ing.chemicalStructure.casNumber.toLowerCase().includes(q)
      )
      .slice(0, 10);
  }, [query]);

  // 点击外部关闭结果
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setShowResults(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (id: string) => {
    navigate(`/ingredient/${id}`);
    setQuery('');
    setShowResults(false);
  };

  return (
    <div ref={containerRef} className="relative flex-1 max-w-md">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setShowResults(true);
          }}
          onFocus={() => setShowResults(true)}
          placeholder="搜索原料名称、英文名、CAS号、功效分类..."
          className="w-full pl-9 pr-10 py-2 text-sm bg-gray-50 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white focus:border-teal-400 transition-all"
        />
        {query && (
          <button
            onClick={() => { setQuery(''); setShowResults(false); }}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* 搜索结果下拉 */}
      {showResults && query.trim() && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden z-50 max-h-96 overflow-y-auto">
          {results.length === 0 ? (
            <div className="p-6 text-center text-sm text-gray-400">
              未找到匹配的原料，试试其他关键词
            </div>
          ) : (
            <>
              <div className="px-3 py-2 text-xs text-gray-400 bg-gray-50 border-b border-gray-100">
                找到 {results.length} 条结果
              </div>
              {results.map((ing) => (
                <button
                  key={ing.id}
                  onClick={() => handleSelect(ing.id)}
                  className="w-full px-3 py-2.5 flex items-center gap-3 hover:bg-teal-50 transition-colors text-left border-b border-gray-50 last:border-0 cursor-pointer"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-gray-800 truncate">{ing.name}</span>
                      <span className="text-xs text-teal-600 bg-teal-50 px-1.5 py-0.5 rounded shrink-0">{ing.category}</span>
                    </div>
                    <p className="text-xs text-gray-400 truncate font-mono">{ing.nameEn} · {ing.chemicalStructure.molecularFormula}</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-300 shrink-0" />
                </button>
              ))}
            </>
          )}
        </div>
      )}
    </div>
  );
}
