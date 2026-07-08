import { useState } from 'react';
import { oemFactories, type OEMFactory, type SuccessCase, industryMoq, industryPrice, type IndustryRefRow } from '@/data/factories';
import { Factory, ExternalLink, Link2, MapPin, Phone, Beaker, Award, FileText } from 'lucide-react';

export default function FactoryPage() {
  const [filter, setFilter] = useState<'all' | 'domestic' | 'international'>('all');
  const [search, setSearch] = useState('');

  const filtered = oemFactories.filter((f) => {
    if (filter === 'domestic' && f.region !== 'domestic') return false;
    if (filter === 'international' && f.region !== 'international') return false;
    if (search) {
      const q = search.toLowerCase();
      return f.name.includes(q) || f.nameEn.toLowerCase().includes(q) || f.location.includes(q) || f.dosageForms.some((d) => d.includes(q)) || f.clients.includes(q);
    }
    return true;
  });

  const domesticCount = oemFactories.filter((f) => f.region === 'domestic').length;
  const intlCount = oemFactories.filter((f) => f.region === 'international').length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50/50 via-white to-cyan-50/50 animate-fade-in">
      <div className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <h1 className="text-2xl font-bold text-gray-900">ODM/OEM 代工厂数据库</h1>
          <p className="text-gray-500 mt-1">覆盖国内{domesticCount}家 + 国际{intlCount}家保健食品合同制造商，含公司简介、联系方式、剂型、认证资质、成功案例</p>
          <p className="text-gray-400 text-sm mt-1">数据来源：各公司官网、年报、企查查、专利数据库 | 更新日期：2026-07</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Search & Filter */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <input
            type="text"
            placeholder="搜索工厂名称、位置、剂型、客户..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
          />
          <div className="flex gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === 'all' ? 'bg-teal-600 text-white' : 'bg-white border border-gray-300 text-gray-600 hover:bg-gray-50'
              }`}
            >
              全部 ({domesticCount + intlCount})
            </button>
            <button
              onClick={() => setFilter('domestic')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === 'domestic' ? 'bg-blue-600 text-white' : 'bg-white border border-gray-300 text-gray-600 hover:bg-gray-50'
              }`}
            >
              国内 ({domesticCount})
            </button>
            <button
              onClick={() => setFilter('international')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === 'international' ? 'bg-amber-600 text-white' : 'bg-white border border-gray-300 text-gray-600 hover:bg-gray-50'
              }`}
            >
              国际 ({intlCount})
            </button>
          </div>
        </div>

        {/* Factory Cards - All info visible by default */}
        <div className="space-y-6">
          {filtered.map((factory) => (
            <FactoryCard key={factory.id} factory={factory} />
          ))}
          {filtered.length === 0 && (
            <div className="text-center py-12 text-gray-400">
              <Factory className="w-12 h-12 mx-auto mb-3 text-gray-300" />
              <p>未找到匹配的代工厂</p>
            </div>
          )}
        </div>

        {/* Industry Reference Tables */}
        {filter === 'all' && !search && (
          <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl border p-5">
              <h2 className="font-bold text-gray-800 mb-3">行业 MOQ 参考</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b text-left text-gray-500">
                      <th className="py-2 pr-4">剂型</th>
                      <th className="py-2 pr-4">国内 MOQ</th>
                      <th className="py-2 pr-4">国际 MOQ</th>
                    </tr>
                  </thead>
                  <tbody>
                    {industryMoq.map((row: IndustryRefRow) => (
                      <tr key={row.form} className="border-b border-gray-50">
                        <td className="py-2 pr-4 font-medium text-gray-700">{row.form}</td>
                        <td className="py-2 pr-4 text-gray-600">{row.china}</td>
                        <td className="py-2 pr-4 text-gray-600">{row.intl}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="bg-white rounded-xl border p-5">
              <h2 className="font-bold text-gray-800 mb-3">行业价格参考</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b text-left text-gray-500">
                      <th className="py-2 pr-4">剂型</th>
                      <th className="py-2 pr-4">国内单价</th>
                      <th className="py-2 pr-4">国际单价</th>
                    </tr>
                  </thead>
                  <tbody>
                    {industryPrice.map((row: IndustryRefRow) => (
                      <tr key={row.form} className="border-b border-gray-50">
                        <td className="py-2 pr-4 font-medium text-gray-700">{row.form}</td>
                        <td className="py-2 pr-4 text-gray-600">{row.china}</td>
                        <td className="py-2 pr-4 text-gray-600">{row.intl}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        <div className="mt-8 mb-12 bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-800">
          <p className="font-medium mb-1">说明</p>
          <p>1. MOQ和价格为公开渠道参考范围,实际报价需根据配方、规格、订单量等协商确定。</p>
          <p>2. 部分工厂近期发生股权变更：Lonza CHI 2026年剥离、NBTY 2017年被Reckitt收购、Catalent 2024年被Novo Holdings收购。</p>
          <p>3. 认证信息会随时间变化,建议采购前到认证机构官网查询最新状态。</p>
        </div>
      </div>
    </div>
  );
}

function FactoryCard({ factory }: { factory: OEMFactory }) {
  const isDomestic = factory.region === 'domestic';

  return (
    <div className="bg-white rounded-xl border hover:shadow-sm transition-shadow overflow-hidden">
      {/* Header */}
      <div className="p-5 border-b border-gray-100">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${isDomestic ? 'bg-blue-100 text-blue-700' : 'bg-amber-100 text-amber-700'}`}>
                {isDomestic ? '国内' : '国际'}
              </span>
              <h3 className="text-lg font-bold text-gray-900">{factory.name}</h3>
              <span className="text-sm text-gray-400">{factory.nameEn}</span>
            </div>
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-500">
              <span className="inline-flex items-center gap-1">
                <MapPin className="w-3 h-3" />{factory.location}
              </span>
              <span>成立: {factory.founded}</span>
              <span>{factory.employees}</span>
              {factory.revenue && <span>营收: {factory.revenue}</span>}
              {factory.stockCode && <span className="text-teal-600 font-medium">{factory.stockCode}</span>}
            </div>
          </div>
          {factory.website && (
            <a href={factory.website} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs text-teal-600 hover:underline shrink-0 border border-teal-200 rounded px-3 py-1 transition-colors hover:bg-teal-50">
              官网 <ExternalLink className="w-3 h-3" />
            </a>
          )}
        </div>

        {/* Highlights */}
        <div className="flex flex-wrap gap-2 mt-3">
          {factory.highlights.map((h) => (
            <span key={h} className={`text-xs px-2 py-0.5 rounded-full ${isDomestic ? 'bg-blue-50 text-blue-700' : 'bg-amber-50 text-amber-700'}`}>
              {h}
            </span>
          ))}
        </div>
      </div>

      {/* Body - All info visible */}
      <div className="px-5 py-4 space-y-4">

        {/* Company Intro */}
        <p className="text-gray-700 leading-relaxed text-sm">{factory.intro}</p>

        {/* Contact Info */}
        <div className="bg-gray-50 rounded-lg p-3 space-y-1.5 text-sm">
          <div className="flex items-center gap-1.5 font-medium text-gray-800 mb-1">
            <Phone className="w-4 h-4 text-gray-500" /> 联系方式
          </div>
          <div className="flex items-start gap-2">
            <span className="text-gray-400 shrink-0 w-10">地址</span>
            <span className="text-gray-700">{factory.address}</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-gray-400 shrink-0 w-10">电话</span>
            <span className="text-gray-700">{factory.phone}</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-gray-400 shrink-0 w-10">邮箱</span>
            <span className="text-gray-700">{factory.email}</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-gray-400 shrink-0 w-10">官网</span>
            <a href={factory.website} target="_blank" rel="noopener noreferrer" className="text-teal-600 hover:underline break-all">{factory.website}</a>
          </div>
        </div>

        {/* Business Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
          <DetailRow label="生产基地" value={factory.factories} />
          <DetailRow label="MOQ 起订量" value={factory.moq} />
          <DetailRow label="价格区间" value={factory.priceRange} />
          <DetailRow label="专利技术" value={factory.patents} />
          <div className="md:col-span-2">
            <DetailRow label="主要客户" value={factory.clients} />
          </div>
        </div>

        {/* 优势剂型 - 高亮展示 */}
        {factory.advantageDosageForms && factory.advantageDosageForms.length > 0 && (
          <div className="text-sm">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="font-medium text-gray-800">
                <Beaker className="w-4 h-4 inline-block" /> 优势剂型
              </span>
              <span className="text-xs bg-orange-100 text-orange-700 px-1.5 py-0.5 rounded-full">{factory.advantageDosageForms.length}种</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {factory.advantageDosageForms.map((form) => (
                <span key={form} className="text-xs bg-orange-50 text-orange-700 px-2 py-0.5 rounded border border-orange-200 font-medium">
                  {form}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Dosage Forms - Full List */}
        <div className="text-sm">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="font-medium text-gray-800">            <Beaker className="w-4 h-4" /> 可制备剂型</span>
            <span className="text-xs bg-teal-100 text-teal-700 px-1.5 py-0.5 rounded-full">{factory.dosageForms.length}种</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {factory.dosageForms.map((form) => (
              <span key={form} className="text-xs bg-teal-50 text-teal-700 px-2 py-0.5 rounded border border-teal-100">
                {form}
              </span>
            ))}
          </div>
        </div>

        {/* Certifications - Full List */}
        <div className="text-sm">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="font-medium text-gray-800">            <Award className="w-4 h-4" /> 认证资质</span>
            <span className="text-xs bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded-full">{factory.certifications.length}项</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {factory.certifications.map((cert) => (
              <span key={cert} className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded border border-blue-100">
                {cert}
              </span>
            ))}
          </div>
        </div>

        {/* Success Cases */}
        {factory.successCases.length > 0 && (
          <div className="text-sm">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="font-medium text-gray-800">            <FileText className="w-4 h-4" /> 成功案例</span>
              <span className="text-xs bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded-full">{factory.successCases.length}个</span>
            </div>
            <div className="space-y-1">
              {factory.successCases.map((sc: SuccessCase) => (
                <a key={sc.url} href={sc.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-teal-600 hover:underline hover:text-teal-700">
                  <Link2 className="w-3 h-3" />
                  <span className="text-sm">{sc.name}</span>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <span className="text-gray-400 text-xs">{label}</span>
      <p className="text-gray-700 mt-0.5 text-sm">{value}</p>
    </div>
  );
}
