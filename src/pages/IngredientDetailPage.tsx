import { useParams, useNavigate } from 'react-router-dom';
import { ingredients, interactionsByIngredient, type InteractionItem } from '@/data/index';
import { ComplianceBadge } from '@/components/ComplianceBadge';
import { PopularityBadge } from '@/components/PopularityBadge';
import { Pill, Beaker, Factory, Globe, Target, Microscope, Trophy, DollarSign, BookOpen, ExternalLink, AlertTriangle, Sparkles, Droplets, Tag } from 'lucide-react';

// 研究类型徽章
const EVIDENCE_TYPE_META: Record<string, { label: string; className: string }> = {
  meta:        { label: 'Meta分析',  className: 'bg-purple-100 text-purple-700' },
  rct:         { label: 'RCT',       className: 'bg-blue-100 text-blue-700' },
  review:      { label: '综述',      className: 'bg-cyan-100 text-cyan-700' },
  animal:      { label: '动物实验',  className: 'bg-amber-100 text-amber-700' },
  cell:        { label: '细胞实验',  className: 'bg-orange-100 text-orange-700' },
  theoretical: { label: '理论机制',  className: 'bg-gray-100 text-gray-600' },
  other:       { label: '研究/文献', className: 'bg-gray-100 text-gray-600' },
};
function EvidenceTypeBadge({ type }: { type?: string }) {
  if (!type) return null;
  const m = EVIDENCE_TYPE_META[type] || EVIDENCE_TYPE_META.other;
  return <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${m.className}`}>{m.label}</span>;
}

// 证据等级星标
const LEVEL_COLOR: Record<string, string> = { A: 'text-emerald-500', B: 'text-blue-500', C: 'text-amber-500', D: 'text-gray-400' };
function EvidenceStars({ level }: { level?: string }) {
  const n = level === 'A' ? 4 : level === 'B' ? 3 : level === 'C' ? 2 : level === 'D' ? 1 : 0;
  return (
    <span className={`text-sm leading-none ${LEVEL_COLOR[level || ''] || 'text-gray-400'}`}>
      {'★'.repeat(n)}{'☆'.repeat(4 - n)}
    </span>
  );
}
function EvidenceLevelBadge({ level }: { level?: string }) {
  const color = LEVEL_COLOR[level || ''] || 'text-gray-400';
  return (
    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full bg-gray-100 ${color}`}>
      {level ? `证据 ${level}` : '等级待定'}
    </span>
  );
}

export function IngredientDetailPage() {
  const { ingredientId } = useParams<{ ingredientId: string }>();
  const navigate = useNavigate();

  const ing = ingredients.find((i) => i.id === ingredientId);

  if (!ing) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-400 text-lg">原料未找到</p>
        <button onClick={() => navigate('/')} className="mt-4 text-teal-600 hover:underline">返回首页</button>
      </div>
    );
  }

  const interactions: InteractionItem[] = interactionsByIngredient[ing.id] || [];
  const synergies = interactions.filter((i) => i.type === 'synergy');
  const contraindications = interactions.filter((i) => i.type === 'contra');

  // WADA 运动合规标签（仅运动营养上下文展示）
  const isSports = ing.categoryId === 'sports' || (ing.secondaryCategoryIds || []).includes('sports');
  const wadaTone = ing.wada
    ? ing.wada.status === 'prohibited'
      ? 'bg-red-100 text-red-700'
      : ing.wada.status === 'monitor'
        ? 'bg-amber-100 text-amber-700'
        : 'bg-emerald-100 text-emerald-700'
    : '';
  const wadaLabel = ing.wada
    ? ing.wada.status === 'prohibited'
      ? 'WADA 禁用'
      : ing.wada.status === 'monitor'
        ? 'WADA 监测物质'
        : 'WADA 赛内/赛外允许'
    : '';

  // 溶解性 / 亲疏水性 展示元数据（蓝=水溶性/亲水, 琥珀橙=脂溶性/疏水, 紫=两亲, 灰=难溶）
  const SOL_META: Record<string, { label: string; hLabel: string; dot: string; badge: string }> = {
    water:     { label: '水溶性',   hLabel: '亲水', dot: 'bg-blue-500',   badge: 'bg-blue-50 text-blue-700' },
    fat:       { label: '脂溶性',   hLabel: '疏水', dot: 'bg-amber-500',  badge: 'bg-amber-50 text-amber-700' },
    both:      { label: '两亲可溶', hLabel: '两亲', dot: 'bg-purple-500', badge: 'bg-purple-50 text-purple-700' },
    insoluble: { label: '难溶/不溶', hLabel: '—',   dot: 'bg-gray-400',   badge: 'bg-gray-100 text-gray-600' },
  };
  const sol = ing.solubilityInfo;
  const solMeta = sol ? SOL_META[sol.solubility] : null;
  const hydroLabel = sol
    ? sol.hydrophilicity === 'hydrophilic' ? '亲水'
      : sol.hydrophilicity === 'lipophilic' ? '疏水' : '两亲'
    : '';

  return (
    <div className="space-y-6 animate-fade-in">
      {/* 导航 */}
      <div className="flex flex-wrap items-center gap-2 text-sm text-gray-500">
        <button onClick={() => navigate('/')} className="hover:text-teal-600 transition-colors">首页</button>
        <span>/</span>
        <button onClick={() => navigate(`/category/${ing.categoryId}`)} className="hover:text-teal-600 transition-colors">{ing.category}</button>
        <span>/</span>
        <span className="text-gray-800 font-medium">{ing.name}</span>
      </div>

      {/* 标题区 */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
        <div className="flex flex-wrap items-center gap-2 mb-1">
          <span className="text-xs font-medium text-teal-600 bg-teal-50 px-2.5 py-1 rounded-full">{ing.category}</span>
          <PopularityBadge popularity={ing.popularity} />
          {isSports && ing.wada && (
            <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${wadaTone}`}>{wadaLabel}</span>
          )}
          {sol && solMeta && (
            <span className={`text-xs font-medium px-2.5 py-1 rounded-full flex items-center gap-1 ${solMeta.badge}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${solMeta.dot}`}></span>
              {solMeta.label}
            </span>
          )}
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mt-3">{ing.name}</h1>
        <p className="text-sm text-teal-600 font-mono mt-1">{ing.nameEn}</p>
        <p className="text-gray-600 mt-3 leading-relaxed">{ing.summary}</p>
        {isSports && ing.wada?.note && (
          <p className="text-xs text-gray-500 mt-2 bg-gray-50 rounded-lg px-3 py-2 leading-relaxed">{ing.wada.note}</p>
        )}
        {/* 化学信息 */}
        <div className="flex flex-wrap gap-3 mt-4 text-sm">
          <div className="bg-gray-50 px-3 py-1.5 rounded-lg">
            <span className="text-gray-400">分子式 </span>
            <span className="font-mono text-gray-700">{ing.chemicalStructure.molecularFormula}</span>
          </div>
          <div className="bg-gray-50 px-3 py-1.5 rounded-lg">
            <span className="text-gray-400">分子量 </span>
            <span className="font-mono text-gray-700">{ing.chemicalStructure.molecularWeight}</span>
          </div>
          <div className="bg-gray-50 px-3 py-1.5 rounded-lg">
            <span className="text-gray-400">CAS号 </span>
            <span className="font-mono text-gray-700">{ing.chemicalStructure.casNumber}</span>
          </div>
        </div>
      </div>

      {/* 溶解性与亲疏水性 */}
      {sol && solMeta && (
        <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-blue-100 flex items-center justify-center">
              <Droplets className="w-5 h-5 text-blue-600" strokeWidth={1.8} />
            </div>
            溶解性与亲疏水性
          </h2>
          <div className="flex flex-wrap gap-3 mb-4">
            <span className={`text-sm font-medium px-3 py-1.5 rounded-lg flex items-center gap-2 ${solMeta.badge}`}>
              <span className={`w-2 h-2 rounded-full ${solMeta.dot}`}></span>
              {solMeta.label}
            </span>
            <span className="text-sm font-medium px-3 py-1.5 rounded-lg bg-gray-100 text-gray-600">
              亲疏水性：{hydroLabel}
            </span>
          </div>
          {sol.note && (
            <p className="text-sm text-gray-600 bg-gray-50 rounded-lg p-3 leading-relaxed">{sol.note}</p>
          )}
        </section>
      )}

      {/* 起效剂量 */}
      <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-lg bg-amber-100 flex items-center justify-center">
            <Pill className="w-5 h-5 text-amber-600" strokeWidth={1.8} />
          </div>
          起效剂量
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-amber-50 rounded-xl p-4">
            <p className="text-xs text-amber-600 font-medium mb-1">最低起效剂量</p>
            <p className="text-2xl font-bold text-amber-700">{ing.dosage.minEffective}<span className="text-sm font-normal ml-1">{ing.dosage.unit}</span></p>
          </div>
          <div className="bg-teal-50 rounded-xl p-4">
            <p className="text-xs text-teal-600 font-medium mb-1">推荐剂量</p>
            <p className="text-2xl font-bold text-teal-700">{ing.dosage.recommended}<span className="text-sm font-normal ml-1">{ing.dosage.unit}</span></p>
          </div>
          <div className="bg-red-50 rounded-xl p-4">
            <p className="text-xs text-red-600 font-medium mb-1">安全上限</p>
            <p className="text-2xl font-bold text-red-700">{ing.dosage.safeUpperLimit}<span className="text-sm font-normal ml-1">{ing.dosage.unit}</span></p>
          </div>
        </div>
        <p className="mt-4 text-sm text-gray-500 bg-gray-50 rounded-lg p-3">{ing.dosage.note}</p>
      </section>

      {/* 常见存在形式 */}
      <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-lg bg-teal-100 flex items-center justify-center">
            <Beaker className="w-5 h-5 text-teal-600" strokeWidth={1.8} />
          </div>
          常见存在形式
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {ing.forms.map((form, idx) => (
            <div key={idx} className="border border-gray-200 rounded-xl p-4 hover:border-teal-200 transition-colors">
              <h3 className="font-semibold text-gray-800 mb-1">{form.name}</h3>
              <p className="text-xs text-gray-500 mb-2">{form.description}</p>
              <div className="mb-2">
                <span className="text-xs text-gray-400">生物利用度：</span>
                <span className="text-xs font-medium text-teal-600">{form.bioavailability}</span>
              </div>
              <div className="flex flex-wrap gap-1 mb-2">
                {form.advantages.slice(0, 2).map((a, i) => (
                  <span key={i} className="text-xs bg-teal-50 text-teal-700 px-2 py-0.5 rounded-full">✓ {a}</span>
                ))}
              </div>
              {form.disadvantages.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {form.disadvantages.slice(0, 1).map((d, i) => (
                    <span key={i} className="text-xs bg-red-50 text-red-600 px-2 py-0.5 rounded-full">✗ {d}</span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 供应商 */}
      <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-lg bg-cyan-100 flex items-center justify-center">
            <Factory className="w-5 h-5 text-cyan-600" strokeWidth={1.8} />
          </div>
          国内外知名原料供应商
        </h2>
        <div className="overflow-x-auto">
          {ing.suppliers.length > 0 ? (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-3 font-medium text-gray-500">供应商</th>
                <th className="text-left py-3 px-3 font-medium text-gray-500">国家</th>
                <th className="text-left py-3 px-3 font-medium text-gray-500">纯度/标准</th>
                <th className="text-left py-3 px-3 font-medium text-gray-500">特点</th>
                <th className="text-left py-3 px-3 font-medium text-gray-500">官网</th>
              </tr>
            </thead>
            <tbody>
              {ing.suppliers.map((sup, idx) => (
                <tr key={idx} className="border-b border-gray-100 hover:bg-teal-50/30">
                  <td className="py-3 px-3 font-medium text-gray-800">{sup.name}</td>
                  <td className="py-3 px-3 text-gray-500">{sup.country}</td>
                  <td className="py-3 px-3">
                    <span className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-full">{sup.purity}</span>
                  </td>
                  <td className="py-3 px-3 text-gray-500 text-xs max-w-xs">{sup.features || '-'}</td>
                  <td className="py-3 px-3">
                    {sup.website ? (
                    <a href={sup.website} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-teal-600 hover:text-teal-700 hover:underline text-xs transition-colors">
                      {(() => {
                        try { return new URL(sup.website).hostname.replace('www.', ''); }
                        catch { return sup.website; }
                      })()}
                      <ExternalLink className="w-3 h-3" />
                    </a>
                    ) : (
                      <span className="text-gray-300 text-xs">—</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          ) : (
            <p className="text-gray-400 text-sm py-4 text-center">暂无可用供应商链接，信息持续更新中</p>
          )}
        </div>
      </section>

      {/* 品牌原料 */}
      {ing.brandedIngredients && ing.brandedIngredients.length > 0 && (
        <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-fuchsia-100 flex items-center justify-center">
              <Tag className="w-5 h-5 text-fuchsia-600" strokeWidth={1.8} />
            </div>
            知名商标原料
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {ing.brandedIngredients.map((b, idx) => (
              <div key={idx} className="border border-gray-200 rounded-xl p-4">
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="font-semibold text-gray-800">{b.brand}</span>
                  <span className="text-xs text-gray-400">{b.name}</span>
                </div>
                <p className="text-sm text-gray-600">持有方：{b.company}</p>
                {b.note && <p className="text-xs text-gray-400 mt-1">{b.note}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 制剂类型 */}
      <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-lg bg-violet-100 flex items-center justify-center">
            <Pill className="w-5 h-5 text-violet-600" strokeWidth={1.8} />
          </div>
          可制备剂型
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {ing.dosageForms.map((df, idx) => (
            <div key={idx} className="border border-gray-200 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                  df.category === '前沿剂型' ? 'bg-purple-50 text-purple-600' :
                  df.category === '新型剂型' ? 'bg-blue-50 text-blue-600' :
                  'bg-gray-100 text-gray-600'
                }`}>{df.category}</span>
                <h3 className="font-semibold text-gray-800">{df.name}</h3>
              </div>
              <p className="text-sm text-gray-500 mb-2">{df.description}</p>
              <div className="flex flex-wrap gap-1">
                {df.advantages.map((a, i) => (
                  <span key={i} className="text-xs bg-teal-50 text-teal-700 px-2 py-0.5 rounded-full">{a}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 全球合规性 */}
      <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-lg bg-blue-100 flex items-center justify-center">
            <Globe className="w-5 h-5 text-blue-600" strokeWidth={1.8} />
          </div>
          全球合规性
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {ing.compliance.map((comp, idx) => (
            <div key={idx} className="border border-gray-200 rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-gray-800">{comp.regionName} ({comp.region})</span>
                <ComplianceBadge status={comp.status} />
              </div>
              <p className="text-sm text-gray-500">{comp.description}</p>
              {comp.maxDosage && (
                <p className="text-xs text-amber-600 mt-1">限量：{comp.maxDosage}</p>
              )}
              {comp.usageNote && (
                <p className="text-xs text-red-500 mt-1">⚠ {comp.usageNote}</p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 功效说明 */}
      <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-lg bg-red-100 flex items-center justify-center">
            <Target className="w-5 h-5 text-red-600" strokeWidth={1.8} />
          </div>
          核心功效
        </h2>
        <p className="text-gray-700 leading-relaxed">{ing.efficacy}</p>
      </section>

      {/* 作用机理 */}
      <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-lg bg-teal-100 flex items-center justify-center">
            <Microscope className="w-5 h-5 text-teal-600" strokeWidth={1.8} />
          </div>
          作用机理
        </h2>
        <p className="text-gray-700 mb-6 leading-relaxed">{ing.mechanism.overview}</p>
            <div className="space-y-4">
          {ing.mechanism.steps.map((step, idx) => (
            <div key={idx} className="flex gap-4">
              <div className="shrink-0 w-8 h-8 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center font-bold text-sm">
                {idx + 1}
              </div>
              <div className="flex-1 bg-gray-50 rounded-xl p-4">
                <h4 className="font-semibold text-gray-800 mb-1">{step.title}</h4>
                <p className="text-sm text-gray-600">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 科学证据与证据等级 */}
      {ing.references && ing.references.length > 0 && (
        <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-indigo-100 flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-indigo-600" strokeWidth={1.8} />
            </div>
            科学证据与证据等级
          </h2>
          {ing.evidenceSummary && (
            <div className="flex flex-wrap items-center gap-3 mb-4 bg-gray-50 rounded-xl p-3">
              <span className="text-sm text-gray-500">整体证据等级</span>
              <span className="text-lg font-bold text-indigo-600">{ing.evidenceSummary.level}</span>
              <EvidenceStars level={ing.evidenceSummary.level} />
              <span className="text-xs text-gray-400">（依据文献研究类型推断；标注“PMID 待补充”的文献正逐步核实真实来源）</span>
            </div>
          )}
          <div className="space-y-2">
            {ing.references.map((ref, idx) => (
              <div key={idx} className="border border-gray-200 rounded-xl p-3">
                <div className="flex flex-wrap items-center gap-2 mb-1.5">
                  <EvidenceTypeBadge type={ref.type} />
                  <EvidenceLevelBadge level={ref.evidenceLevel} />
                  {ref.source && <span className="text-xs text-gray-400">{ref.source}</span>}
                  {ref.pmid ? (
                    <a
                      href={ref.url || `https://pubmed.ncbi.nlm.nih.gov/${ref.pmid}/`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs text-teal-600 hover:text-teal-700 hover:underline"
                    >
                      PMID: {ref.pmid} <ExternalLink className="w-3 h-3" />
                    </a>
                  ) : (
                    <span className="text-xs text-amber-500">PMID 待补充</span>
                  )}
                </div>
                <p className="text-sm text-gray-600 leading-snug">{ref.citation}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 配伍禁忌与协同增效 */}
      <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-lg bg-rose-100 flex items-center justify-center">
            <AlertTriangle className="w-5 h-5 text-rose-600" strokeWidth={1.8} />
          </div>
          配伍禁忌与协同增效
        </h2>

        {/* 协同增效 */}
        <div className="mb-6">
          <h3 className="flex items-center gap-2 text-sm font-semibold text-emerald-700 mb-3">
            <Sparkles className="w-4 h-4" /> 协同增效
            <span className="text-xs bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded-full">{synergies.length}</span>
          </h3>
          {synergies.length > 0 ? (
            <div className="space-y-2">
              {synergies.map((it, idx) => (
                <div key={idx} className="flex items-start gap-3 bg-emerald-50/60 border border-emerald-200 rounded-xl p-3">
                  <Sparkles className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-medium text-emerald-800">
                      {it.otherId ? (
                        <button onClick={() => navigate(`/ingredient/${it.otherId}`)} className="hover:underline">{it.otherName}</button>
                      ) : it.otherName}
                    </span>
                    <p className="text-sm text-gray-600 mt-0.5">{it.text}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-400">暂无已收录的协同增效组合。</p>
          )}
        </div>

        {/* 配伍禁忌 */}
        <div>
          <h3 className="flex items-center gap-2 text-sm font-semibold text-rose-700 mb-3">
            <AlertTriangle className="w-4 h-4" /> 配伍禁忌
            <span className="text-xs bg-rose-100 text-rose-700 px-1.5 py-0.5 rounded-full">{contraindications.length}</span>
          </h3>
          {contraindications.length > 0 ? (
            <div className="space-y-2">
              {contraindications.map((it, idx) => {
                const lv = it.level || 'medium';
                const tone = lv === 'high'
                  ? 'bg-red-50 border-red-200'
                  : lv === 'low'
                    ? 'bg-amber-50 border-amber-200'
                    : 'bg-orange-50 border-orange-200';
                const badge = lv === 'high'
                  ? 'bg-red-100 text-red-700'
                  : lv === 'low'
                    ? 'bg-amber-100 text-amber-700'
                    : 'bg-orange-100 text-orange-700';
                const label = lv === 'high' ? '高危' : lv === 'low' ? '低危' : '注意';
                return (
                  <div key={idx} className={`flex items-start gap-3 border rounded-xl p-3 ${tone}`}>
                    <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5 text-rose-500" />
                    <div>
                      <span className="font-medium text-gray-800">
                        {it.otherId ? (
                          <button onClick={() => navigate(`/ingredient/${it.otherId}`)} className="hover:underline">{it.otherName}</button>
                        ) : it.otherName}
                        <span className={`ml-1 text-xs px-1.5 py-0.5 rounded-full ${badge}`}>{label}</span>
                      </span>
                      <p className="text-sm text-gray-600 mt-0.5">{it.text}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-sm text-gray-400">暂无已收录的配伍禁忌。</p>
          )}
        </div>
      </section>

      {/* 成功产品案例 */}
      <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-lg bg-amber-100 flex items-center justify-center">
            <Trophy className="w-5 h-5 text-amber-600" strokeWidth={1.8} />
          </div>
          成功产品案例
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {ing.productCases.map((pc, idx) => (
            <div key={idx} className="border border-gray-200 rounded-xl p-5 hover:border-teal-200 transition-colors">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="font-semibold text-gray-800">{pc.name}</h3>
                  <p className="text-xs text-teal-600">{pc.brand}</p>
                </div>
                <span className="text-xs bg-gray-100 text-gray-500 px-2 py-1 rounded-full">{pc.dosageForm}</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm mb-3">
                <div>
                  <span className="text-xs text-gray-400">价格</span>
                  <p className="text-gray-700 font-medium">{pc.price}</p>
                </div>
                <div>
                  <span className="text-xs text-gray-400">销量</span>
                  <p className="text-gray-700 font-medium">{pc.sales}</p>
                </div>
              </div>
              <div>
                <span className="text-xs text-gray-400">其他成分：</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {pc.otherIngredients.map((oi, i) => (
                    <span key={i} className="text-xs bg-gray-50 text-gray-600 px-2 py-0.5 rounded-full">{oi}</span>
                  ))}
                </div>
              </div>
              {pc.url && (
                <a href={pc.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs text-teal-600 hover:text-teal-700 hover:underline mt-2 transition-colors">
                  访问官网 <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 成本评估 */}
      <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-lg bg-teal-100 flex items-center justify-center">
            <DollarSign className="w-5 h-5 text-teal-600" strokeWidth={1.8} />
          </div>
          成本评估
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-50 rounded-xl p-4">
            <h4 className="text-sm font-semibold text-gray-700 mb-2">原料成本</h4>
            <p className="text-sm text-gray-600">{ing.costs.rawMaterial}</p>
          </div>
          <div className="bg-gray-50 rounded-xl p-4">
            <h4 className="text-sm font-semibold text-gray-700 mb-2">包装成本</h4>
            <p className="text-sm text-gray-600">{ing.costs.packagingCost}</p>
          </div>
        </div>
        <div className="mt-4">
          <h4 className="text-sm font-semibold text-gray-700 mb-2">剂型制备成本</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
            {ing.costs.dosageFormCost.map((dfc, idx) => (
              <div key={idx} className="bg-gray-50 rounded-lg p-3">
                <span className="text-xs text-gray-500">{dfc.form}</span>
                <p className="text-sm font-medium text-gray-700">{dfc.cost}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-4 bg-teal-50 rounded-xl p-4">
          <h4 className="text-sm font-semibold text-teal-700 mb-1">终端成本预估</h4>
          <p className="text-sm text-teal-800 font-medium">{ing.costs.totalEstimate}</p>
        </div>
      </section>
    </div>
  );
}
