import { HashRouter, Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { CategoryPage } from './pages/CategoryPage';
import { IngredientDetailPage } from './pages/IngredientDetailPage';
import FactoryPage from './pages/FactoryPage';
import { SearchBar } from './components/SearchBar';
import ScrollManager from './components/ScrollManager';
import { FlaskConical, Factory } from 'lucide-react';

function App() {
  return (
    <HashRouter>
      <ScrollManager />
      <div className="min-h-screen bg-gradient-to-br from-teal-50/80 via-white to-cyan-50/60">
        {/* Glass Header */}
        <header className="sticky top-0 z-50 glass border-b border-teal-100/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center gap-4">
            <a
              href="#/"
              className="flex items-center gap-2.5 shrink-0 group"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center shadow-md shadow-teal-500/20 group-hover:shadow-teal-500/40 transition-shadow">
                <FlaskConical className="w-5 h-5 text-white" strokeWidth={2} />
              </div>
              <span className="text-lg font-bold text-gray-800 hidden sm:inline tracking-tight">
                保健食品原料库
              </span>
              <span className="text-lg font-bold text-gray-800 sm:hidden tracking-tight">
                原料库
              </span>
            </a>

            <div className="flex-1 flex justify-center">
              <SearchBar />
            </div>

            <a
              href="#/factories"
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-teal-700 hover:bg-teal-100/60 transition-colors shrink-0"
            >
              <Factory className="w-4 h-4" />
              <span className="hidden md:inline">代工厂</span>
            </a>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/category/:categoryId" element={<CategoryPage />} />
            <Route path="/ingredient/:ingredientId" element={<IngredientDetailPage />} />
            <Route path="/factories" element={<FactoryPage />} />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="border-t border-teal-100/50 bg-gradient-to-r from-teal-50/40 to-cyan-50/40 py-8 mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <FlaskConical className="w-4 h-4 text-teal-400" />
              <span className="text-sm font-medium text-teal-700">保健食品原料查询系统</span>
            </div>
            <p className="text-xs text-gray-400">
              仅供专业研究与参考，不构成医疗建议。数据持续更新中。
            </p>
          </div>
        </footer>
      </div>
    </HashRouter>
  );
}

export default App;
