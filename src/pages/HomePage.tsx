import { useNavigate } from 'react-router-dom';
import { categories } from '@/data/categories';
import { ingredients } from '@/data/index';
import { oemFactories } from '@/data/factories';
import { getIcon } from '@/lib/icons';
import { Factory, ArrowRight, Database } from 'lucide-react';

const categoryGradients: Record<string, string> = {
  immune: 'from-rose-500 to-red-600',
  antioxidant: 'from-amber-500 to-orange-600',
  sleep: 'from-indigo-500 to-violet-600',
  weight: 'from-lime-500 to-green-600',
  liver: 'from-teal-500 to-green-600',
  gut: 'from-cyan-500 to-blue-600',
  cardiovascular: 'from-pink-500 to-rose-600',
  bone: 'from-yellow-500 to-amber-600',
  beauty: 'from-fuchsia-500 to-pink-600',
  eye: 'from-sky-500 to-blue-600',
  energy: 'from-orange-500 to-red-600',
  bloodsugar: 'from-blue-500 to-indigo-600',
  probiotics: 'from-violet-500 to-purple-600',
  'herb-food': 'from-emerald-500 to-teal-600',
};

const categoryBgSoft: Record<string, string> = {
  immune: 'bg-rose-50 text-rose-700',
  antioxidant: 'bg-amber-50 text-amber-700',
  sleep: 'bg-indigo-50 text-indigo-700',
  weight: 'bg-lime-50 text-lime-700',
  liver: 'bg-teal-50 text-teal-700',
  gut: 'bg-cyan-50 text-cyan-700',
  cardiovascular: 'bg-pink-50 text-pink-700',
  bone: 'bg-yellow-50 text-yellow-700',
  beauty: 'bg-fuchsia-50 text-fuchsia-700',
  eye: 'bg-sky-50 text-sky-700',
  energy: 'bg-orange-50 text-orange-700',
  bloodsugar: 'bg-blue-50 text-blue-700',
  probiotics: 'bg-violet-50 text-violet-700',
  'herb-food': 'bg-emerald-50 text-emerald-700',
};

const featureList = [
  { icon: 'beaker', title: '化学信息', desc: '分子式、CAS号、SMILES' },
  { icon: 'zap', title: '起效剂量', desc: '最低起效量 + 推荐量' },
  { icon: 'pill', title: '剂型分析', desc: '传统 / 新型 / 前沿剂型' },
  { icon: 'globe', title: '全球合规', desc: '中 / 美 / 欧 / 日 / 韩等' },
  { icon: 'award', title: '产品案例', desc: '品牌、价格、销量对比' },
  { icon: 'dollar-sign', title: '成本评估', desc: '原料 + 剂型 + 包装' },
];

export function HomePage() {
  const navigate = useNavigate();
  const totalIngredients = ingredients.length;

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <div className="relative mb-12 pt-4">
        <div className="text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-50 border border-teal-200 mb-5">
            <Database className="w-3.5 h-3.5 text-teal-600" />
            <span className="text-xs font-medium text-teal-700">
              专业保健食品原料数据库
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight leading-tight">
            保健食品
            <span className="gradient-text">原料百科全书</span>
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto text-base leading-relaxed">
            收录常用保健食品原料，按功效分类索引。涵盖化学结构、起效剂量、
            全球合规性、功效机理、成功产品案例及成本评估等全方位信息。
          </p>

          {/* Stats */}
          <div className="inline-flex items-center gap-8 mt-8 bg-white rounded-2xl px-8 py-4 shadow-sm border border-gray-100">
            <div className="text-center">
              <div className="text-3xl font-bold gradient-text">{categories.length}</div>
              <div className="text-xs text-gray-400 mt-0.5">大功效分类</div>
            </div>
            <div className="w-px h-10 bg-gray-200" />
            <div className="text-center">
              <div className="text-3xl font-bold gradient-text">{totalIngredients}</div>
              <div className="text-xs text-gray-400 mt-0.5">种原料收录</div>
            </div>
            <div className="w-px h-10 bg-gray-200" />
            <div className="text-center">
              <div className="text-3xl font-bold gradient-text">{oemFactories.length}</div>
              <div className="text-xs text-gray-400 mt-0.5">家代工厂</div>
            </div>
          </div>
        </div>

        {/* Decorative element */}
        <div className="absolute top-10 left-1/4 w-64 h-64 bg-teal-200/20 rounded-full blur-3xl -z-0" />
        <div className="absolute bottom-0 right-1/4 w-48 h-48 bg-cyan-200/20 rounded-full blur-3xl -z-0" />
      </div>

      {/* Category Grid */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-1 h-6 rounded-full bg-gradient-to-b from-teal-500 to-cyan-500" />
          <h3 className="text-xl font-bold text-gray-800">按功效浏览原料</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {categories.map((cat, idx) => {
            const Icon = getIcon(cat.icon);
            const count = ingredients.filter((i) => i.categoryId === cat.id || i.secondaryCategoryIds?.includes(cat.id)).length;
            return (
              <button
                key={cat.id}
                onClick={() => navigate(`/category/${cat.id}`)}
                className={`card-hover group relative bg-white rounded-2xl border border-gray-100 hover:border-transparent hover:shadow-xl p-5 text-left overflow-hidden animate-slide-up stagger-${(idx % 6) + 1}`}
                style={{ animationFillMode: 'both' }}
              >
                {/* Top gradient bar */}
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${categoryGradients[cat.id] || 'from-gray-400 to-gray-500'}`} />

                <div className="flex items-start justify-between mb-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${categoryBgSoft[cat.id] || 'bg-gray-50 text-gray-600'}`}>
                    <Icon className="w-5 h-5" strokeWidth={1.8} />
                  </div>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-teal-50 text-teal-700 border border-teal-200">
                    {count} 种
                  </span>
                </div>

                <h4 className="text-base font-semibold text-gray-800 mb-1.5 group-hover:text-teal-600 transition-colors">
                  {cat.name}
                </h4>
                <p className="text-sm text-gray-400 line-clamp-2 leading-relaxed">{cat.description}</p>

                <div className="flex items-center gap-1 mt-3 text-xs font-medium text-teal-500 opacity-0 group-hover:opacity-100 transition-opacity">
                  查看全部
                  <ArrowRight className="w-3 h-3" />
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Factory CTA */}
      <button
        onClick={() => navigate('/factories')}
        className="w-full card-hover group relative overflow-hidden rounded-2xl border border-teal-100 bg-gradient-to-r from-teal-50 via-white to-cyan-50 p-6 text-left mt-8"
      >
        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center shadow-md shadow-teal-500/20 group-hover:shadow-lg transition-shadow">
              <Factory className="w-6 h-6 text-white" strokeWidth={1.8} />
            </div>
            <div>
              <h4 className="text-lg font-bold text-gray-800 group-hover:text-teal-700 transition-colors">
                ODM/OEM 代工厂数据库
              </h4>
              <p className="text-sm text-gray-500 mt-0.5">
                覆盖国内{oemFactories.filter(f => f.region === 'domestic').length}家 + 国际{oemFactories.filter(f => f.region === 'international').length}家保健食品合同制造商
              </p>
            </div>
          </div>
          <ArrowRight className="w-5 h-5 text-teal-400 group-hover:translate-x-1 transition-transform shrink-0" />
        </div>
      </button>

      {/* Feature List */}
      <div className="mt-14">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-1 h-6 rounded-full bg-gradient-to-b from-teal-500 to-cyan-500" />
          <h3 className="text-xl font-bold text-gray-800">每种原料涵盖以下维度</h3>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {featureList.map((f) => {
            const Icon = getIcon(f.icon);
            return (
              <div key={f.title} className="bg-white rounded-2xl border border-gray-100 p-4 hover:border-teal-200 hover:shadow-sm transition-all duration-300">
                <div className="w-9 h-9 rounded-lg bg-teal-50 flex items-center justify-center mb-3">
                  <Icon className="w-4.5 h-4.5 text-teal-600" strokeWidth={1.8} />
                </div>
                <h5 className="text-sm font-semibold text-gray-800 mb-1">{f.title}</h5>
                <p className="text-xs text-gray-400">{f.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
