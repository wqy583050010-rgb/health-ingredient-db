import { useState } from 'react';
import { api, CategoryItem } from '../api';

interface Props {
  initial: CategoryItem | null;
  onSaved: () => void;
  onCancel: () => void;
}

export default function CategoryEditor({ initial, onSaved, onCancel }: Props) {
  const isNew = !initial;
  const [id, setId] = useState(initial?.id || '');
  const [name, setName] = useState(initial?.name || '');
  const [icon, setIcon] = useState(initial?.icon || 'shield');
  const [description, setDescription] = useState(initial?.description || '');
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setError('');
    if (!id.trim() || !name.trim()) {
      setError('id 和 名称 必填');
      return;
    }
    setSaving(true);
    try {
      await api.saveCategory({
        id: id.trim(),
        name: name.trim(),
        icon: icon.trim(),
        description: description.trim(),
        ingredientCount: initial?.ingredientCount || 0,
      });
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
          {isNew ? '➕ 新增分类' : `✏️ 编辑：${name || id}`}
        </h2>
        <div className="flex gap-2">
          <button className="btn btn-ghost" onClick={onCancel}>取消</button>
          <button className="btn btn-primary" onClick={handleSave} disabled={saving}>
            {saving ? '保存中…' : '💾 保存'}
          </button>
        </div>
      </div>

      {error && (
        <div className="rounded-lg bg-rose-50 border border-rose-200 px-4 py-3 text-sm text-rose-700">{error}</div>
      )}

      <div className="card p-5 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="field-label">ID（英文）</label>
          <input className="field-input" value={id} disabled={!isNew} onChange={(e) => setId(e.target.value)} placeholder="如 immune" />
        </div>
        <div>
          <label className="field-label">名称</label>
          <input className="field-input" value={name} onChange={(e) => setName(e.target.value)} placeholder="如 增强免疫力" />
        </div>
        <div>
          <label className="field-label">图标（lucide 名称）</label>
          <input className="field-input" value={icon} onChange={(e) => setIcon(e.target.value)} placeholder="如 shield / leaf" />
        </div>
        <div>
          <label className="field-label">原料数量（自动计算）</label>
          <input className="field-input bg-slate-50" value={initial?.ingredientCount ?? 0} disabled />
        </div>
        <div className="md:col-span-2">
          <label className="field-label">描述</label>
          <textarea className="field-input" rows={2} value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>
      </div>
    </div>
  );
}
