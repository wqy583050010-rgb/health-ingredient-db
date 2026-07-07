import { useState } from 'react';
import { api, FactoryItem } from '../api';

const TEXT_KEYS = [
  'id', 'name', 'nameEn', 'region', 'location', 'address', 'phone', 'email',
  'founded', 'employees', 'revenue', 'stockCode', 'factories', 'moq',
  'priceRange', 'patents', 'clients', 'website', 'intro',
];
const LINE_ARRAY_KEYS = ['dosageForms', 'certifications', 'highlights'];

const FACTORY_TEMPLATE = `{
  "id": "",
  "name": "",
  "nameEn": "",
  "region": "domestic",
  "location": "",
  "address": "",
  "phone": "",
  "email": "",
  "founded": "",
  "employees": "",
  "revenue": "",
  "stockCode": "",
  "factories": "",
  "moq": "",
  "priceRange": "",
  "patents": "",
  "clients": "",
  "website": "",
  "intro": "",
  "dosageForms": [],
  "certifications": [],
  "highlights": [],
  "successCases": []
}`;

interface Props {
  initial: FactoryItem | null;
  onSaved: () => void;
  onCancel: () => void;
}

export default function FactoryEditor({ initial, onSaved, onCancel }: Props) {
  const isNew = !initial;
  const [form, setForm] = useState<Record<string, unknown>>(() => {
    if (initial) return { ...initial };
    const t = JSON.parse(FACTORY_TEMPLATE);
    return t;
  });
  const [successCasesJson, setSuccessCasesJson] = useState(() => {
    const sc = (initial as Record<string, unknown> | null)?.successCases;
    return sc ? JSON.stringify(sc, null, 2) : '[]';
  });
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  const set = (k: string, v: unknown) => setForm((prev) => ({ ...prev, [k]: v }));

  const buildPayload = (): { ok: boolean; data?: Record<string, unknown>; err?: string } => {
    let sc: unknown[] = [];
    try {
      sc = JSON.parse(successCasesJson);
    } catch (e) {
      return { ok: false, err: '成功案例 JSON 解析失败: ' + (e as Error).message };
    }
    const payload: Record<string, unknown> = { ...form };
    for (const k of LINE_ARRAY_KEYS) {
      const raw = typeof payload[k] === 'string' ? (payload[k] as string) : '';
      payload[k] = raw.split('\n').map((s) => s.trim()).filter(Boolean);
    }
    payload.successCases = sc;
    return { ok: true, data: payload };
  };

  const handleSave = async () => {
    setError('');
    const built = buildPayload();
    if (!built.ok) {
      setError(built.err || '格式错误');
      return;
    }
    const data = built.data!;
    if (!(data.id as string)?.trim() || !(data.name as string)?.trim()) {
      setError('id 和 名称 必填');
      return;
    }
    setSaving(true);
    try {
      await api.saveFactory(data as FactoryItem);
      onSaved();
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setSaving(false);
    }
  };

  const jsonOf = (k: string) => {
    const v = form[k];
    return Array.isArray(v) ? (v as string[]).join('\n') : '';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-slate-800">
          {isNew ? '➕ 新增代工厂' : `✏️ 编辑：${form.name || form.id}`}
        </h2>
        <div className="flex gap-2">
          <button className="btn btn-ghost" onClick={onCancel}>取消</button>
          <button className="btn btn-primary" onClick={handleSave} disabled={saving}>
            {saving ? '保存中…' : '💾 保存'}
          </button>
        </div>
      </div>

      {error && (
        <div className="rounded-lg bg-rose-50 border border-rose-200 px-4 py-3 text-sm text-rose-700 whitespace-pre-wrap">{error}</div>
      )}

      <div className="card p-5 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="field-label">ID</label>
          <input className="field-input" value={(form.id as string) || ''} disabled={!isNew} onChange={(e) => set('id', e.target.value)} />
        </div>
        <div>
          <label className="field-label">名称</label>
          <input className="field-input" value={(form.name as string) || ''} onChange={(e) => set('name', e.target.value)} />
        </div>
        <div>
          <label className="field-label">英文名</label>
          <input className="field-input" value={(form.nameEn as string) || ''} onChange={(e) => set('nameEn', e.target.value)} />
        </div>
        <div>
          <label className="field-label">区域</label>
          <select className="field-input" value={(form.region as string) || 'domestic'} onChange={(e) => set('region', e.target.value)}>
            <option value="domestic">国内</option>
            <option value="international">国际</option>
          </select>
        </div>
        {['location', 'address', 'phone', 'email', 'founded', 'employees', 'revenue', 'stockCode', 'factories', 'moq', 'priceRange', 'patents', 'clients', 'website'].map((k) => (
          <div key={k}>
            <label className="field-label">{k}</label>
            <input className="field-input" value={(form[k] as string) || ''} onChange={(e) => set(k, e.target.value)} />
          </div>
        ))}
        <div className="md:col-span-2">
          <label className="field-label">简介</label>
          <textarea className="field-input" rows={2} value={(form.intro as string) || ''} onChange={(e) => set('intro', e.target.value)} />
        </div>
        {LINE_ARRAY_KEYS.map((k) => (
          <div key={k} className="md:col-span-2">
            <label className="field-label">{k}（每行一个）</label>
            <textarea className="field-input" rows={3} value={jsonOf(k)} onChange={(e) => set(k, e.target.value)} />
          </div>
        ))}
        <div className="md:col-span-2">
          <label className="field-label">成功案例（JSON 数组，每项 {"{name, url}"}）</label>
          <textarea className="field-area" rows={5} value={successCasesJson} onChange={(e) => setSuccessCasesJson(e.target.value)} spellCheck={false} />
        </div>
      </div>
    </div>
  );
}
