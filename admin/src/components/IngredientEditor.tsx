import { useState } from 'react';
import { api, CategoryItem, IngredientItem } from '../api';

const BASIC_KEYS = ['id', 'name', 'nameEn', 'category', 'categoryId', 'secondaryCategoryIds', 'popularity', 'summary', 'efficacy', '_src'];

const ADVANCED_TEMPLATE = `{
  "chemicalStructure": {
    "smiles": "",
    "molecularFormula": "",
    "molecularWeight": "",
    "casNumber": ""
  },
  "dosage": {
    "minEffective": "",
    "recommended": "",
    "safeUpperLimit": "",
    "unit": "",
    "note": ""
  },
  "forms": [],
  "suppliers": [],
  "dosageForms": [],
  "compliance": [],
  "mechanism": { "overview": "", "steps": [], "scientificReferences": [] },
  "productCases": [],
  "costs": {}
}`;

interface Props {
  categories: CategoryItem[];
  initial: IngredientItem | null;
  onSaved: () => void;
  onCancel: () => void;
}

export default function IngredientEditor({ categories, initial, onSaved, onCancel }: Props) {
  const isNew = !initial;
  const [id, setId] = useState(initial?.id || '');
  const [name, setName] = useState(initial?.name || '');
  const [nameEn, setNameEn] = useState(initial?.nameEn || '');
  const [categoryId, setCategoryId] = useState(initial?.categoryId || categories[0]?.id || '');
  const [secondary, setSecondary] = useState<string[]>(initial?.secondaryCategoryIds || []);
  const [popularity, setPopularity] = useState<number>(initial?.popularity || 3);
  const [summary, setSummary] = useState(initial?.summary || '');
  const [efficacy, setEfficacy] = useState((initial?.efficacy || []).join('\n'));
  const [advanced, setAdvanced] = useState(() => {
    if (!initial) return ADVANCED_TEMPLATE;
    const rest: Record<string, unknown> = {};
    for (const k of Object.keys(initial)) {
      if (!BASIC_KEYS.includes(k)) rest[k] = (initial as Record<string, unknown>)[k];
    }
    return JSON.stringify(rest, null, 2);
  });
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  const toggleSecondary = (cid: string) => {
    setSecondary((prev) => (prev.includes(cid) ? prev.filter((x) => x !== cid) : [...prev, cid]));
  };

  const formatJson = () => {
    try {
      setAdvanced(JSON.stringify(JSON.parse(advanced), null, 2));
      setError('');
    } catch (e) {
      setError('JSON 格式错误，无法格式化: ' + (e as Error).message);
    }
  };

  const handleSave = async () => {
    setError('');
    let advObj: Record<string, unknown> = {};
    try {
      advObj = JSON.parse(advanced);
    } catch (e) {
      setError('高级字段 JSON 解析失败: ' + (e as Error).message);
      return;
    }
    if (!id.trim() || !name.trim()) {
      setError('id 和 名称 必填');
      return;
    }
    const catName = categories.find((c) => c.id === categoryId)?.name || categoryId;
    const payload: Record<string, unknown> = {
      id: id.trim(),
      name: name.trim(),
      nameEn: nameEn.trim(),
      categoryId,
      category: catName,
      secondaryCategoryIds: secondary,
      popularity: Number(popularity),
      summary: summary.trim(),
      efficacy: efficacy.split('\n').map((s) => s.trim()).filter(Boolean),
      ...advObj,
    };
    setSaving(true);
    try {
      await api.saveIngredient(payload as IngredientItem);
      onSaved();
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-slate-800">
          {isNew ? '➕ 新增原料' : `✏️ 编辑：${name || id}`}
        </h2>
        <div className="flex gap-2">
          <button className="btn btn-ghost" onClick={onCancel}>取消</button>
          <button className="btn btn-primary" onClick={handleSave} disabled={saving}>
            {saving ? '保存中…' : '💾 保存'}
          </button>
        </div>
      </div>

      {error && (
        <div className="rounded-lg bg-rose-50 border border-rose-200 px-4 py-3 text-sm text-rose-700 whitespace-pre-wrap">
          {error}
        </div>
      )}

      <div className="card p-5 space-y-4">
        <h3 className="text-sm font-semibold text-teal-700">基础信息（填空）</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="field-label">ID（英文唯一标识）</label>
            <input className="field-input" value={id} onChange={(e) => setId(e.target.value)} disabled={!isNew} placeholder="如 red-yeast-rice" />
          </div>
          <div>
            <label className="field-label">中文名称</label>
            <input className="field-input" value={name} onChange={(e) => setName(e.target.value)} placeholder="如 红曲米提取物" />
          </div>
          <div>
            <label className="field-label">英文名称</label>
            <input className="field-input" value={nameEn} onChange={(e) => setNameEn(e.target.value)} placeholder="如 Red Yeast Rice Extract" />
          </div>
          <div>
            <label className="field-label">主要分类</label>
            <select className="field-input" value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="field-label">热度评级（1-5 星）</label>
            <select className="field-input" value={popularity} onChange={(e) => setPopularity(Number(e.target.value))}>
              {[5, 4, 3, 2, 1].map((n) => (
                <option key={n} value={n}>{'★'.repeat(n)}{'☆'.repeat(5 - n)}（{n}星）</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="field-label">一句话简介</label>
          <textarea className="field-input" rows={2} value={summary} onChange={(e) => setSummary(e.target.value)} placeholder="简要描述该原料的作用" />
        </div>

        <div>
          <label className="field-label">功效标签（每行一个）</label>
          <textarea className="field-input" rows={3} value={efficacy} onChange={(e) => setEfficacy(e.target.value)} placeholder={'降血脂\n抗氧化'} />
        </div>

        <div>
          <label className="field-label">次要分类（可同时出现在多个分类，如药食同源）</label>
          <div className="flex flex-wrap gap-2 pt-1">
            {categories.map((c) => (
              <label key={c.id} className={`cursor-pointer rounded-full border px-3 py-1 text-xs transition ${secondary.includes(c.id) ? 'bg-teal-600 text-white border-teal-600' : 'bg-white text-slate-600 border-slate-300 hover:border-teal-400'}`}>
                <input type="checkbox" className="hidden" checked={secondary.includes(c.id)} onChange={() => toggleSecondary(c.id)} />
                {c.name}
              </label>
            ))}
          </div>
        </div>
      </div>

      <div className="card p-5 space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-teal-700">详细数据（高级 · JSON）</h3>
          <button className="btn btn-ghost text-xs" onClick={formatJson}>🎨 格式化</button>
        </div>
        <p className="text-xs text-slate-500">
          化学结构、剂量、剂型、供应商、合规、机理、产品案例、成本等复杂字段以 JSON 编辑。保存时会与上方基础信息合并。
        </p>
        <textarea className="field-area" rows={20} value={advanced} onChange={(e) => setAdvanced(e.target.value)} spellCheck={false} />
      </div>
    </div>
  );
}
