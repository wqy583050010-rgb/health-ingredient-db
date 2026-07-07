import { useEffect, useState } from 'react';
import { api, hasToken, setToken, getToken, IngredientItem, FactoryItem, CategoryItem } from './api';
import IngredientEditor from './components/IngredientEditor';
import FactoryEditor from './components/FactoryEditor';
import CategoryEditor from './components/CategoryEditor';

type Tab = 'ingredients' | 'factories' | 'categories' | 'deploy';
type EditState = { type: Tab; item: IngredientItem | FactoryItem | CategoryItem | null } | null;

const TABS: { key: Tab; label: string; icon: string }[] = [
  { key: 'ingredients', label: '原料', icon: '🧪' },
  { key: 'factories', label: '代工厂', icon: '🏭' },
  { key: 'categories', label: '分类', icon: '🗂️' },
  { key: 'deploy', label: '发布', icon: '🚀' },
];

// ===== Token 输入栏 =====
function TokenBar({ onSet }: { onSet: () => void }) {
  const [val, setVal] = useState('');
  const [show, setShow] = useState(false);
  const connected = hasToken();

  if (connected && !show) {
    return (
      <div className="flex items-center gap-2">
        <span className="rounded-full bg-emerald-50 px-2 py-1 text-xs text-emerald-600">● Token 已设置</span>
        <button className="text-xs text-slate-400 hover:text-rose-500" onClick={() => { setToken(''); setShow(false); onSet(); }}>清除</button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <input
        className="field-input w-56 text-xs"
        type="password"
        placeholder="粘贴 GitHub Token…"
        value={val}
        onChange={(e) => setVal(e.target.value)}
      />
      <button
        className="btn btn-primary text-xs"
        onClick={() => {
          if (!val.trim()) return alert('请输入 Token');
          setToken(val);
          setVal('');
          setShow(false);
          onSet();
        }}
      >
        保存
      </button>
      {connected && <button className="text-xs text-slate-400" onClick={() => setShow(false)}>取消</button>}
    </div>
  );
}

export default function App() {
  const [tab, setTab] = useState<Tab>('ingredients');
  const [ingredients, setIngredients] = useState<IngredientItem[]>([]);
  const [factories, setFactories] = useState<FactoryItem[]>([]);
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [needToken, setNeedToken] = useState(false);
  const [editing, setEditing] = useState<EditState>(null);
  const [search, setSearch] = useState('');

  const loadAll = async () => {
    setLoading(true);
    try {
      const [ing, fac, cat] = await Promise.all([api.ingredients(), api.factories(), api.categories()]);
      setIngredients(ing.items);
      setFactories(fac.items);
      setCategories(cat.items);
      setNeedToken(false);
    } catch (e) {
      const msg = (e as Error).message;
      if (msg.includes('Token')) {
        setNeedToken(true);
      } else {
        alert('加载失败: ' + msg);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!hasToken()) {
      setNeedToken(true);
      setLoading(false);
      return;
    }
    loadAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const counts: Record<Tab, number> = {
    ingredients: ingredients.length,
    factories: factories.length,
    categories: categories.length,
    deploy: 0,
  };

  const filtered = (() => {
    const q = search.trim().toLowerCase();
    if (tab === 'ingredients') {
      return ingredients.filter((i) => !q || i.name.toLowerCase().includes(q) || i.nameEn.toLowerCase().includes(q) || i.id.toLowerCase().includes(q));
    }
    if (tab === 'factories') {
      return factories.filter((f) => !q || f.name.toLowerCase().includes(q) || f.nameEn.toLowerCase().includes(q) || f.id.toLowerCase().includes(q));
    }
    if (tab === 'categories') {
      return categories.filter((c) => !q || c.name.toLowerCase().includes(q) || c.id.toLowerCase().includes(q));
    }
    return [];
  })();

  return (
    <div className="min-h-screen">
      {/* 顶栏 */}
      <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🌿</span>
            <div>
              <h1 className="text-base font-bold text-slate-800">原料库 · 在线管理面板</h1>
              <p className="text-xs text-slate-400">填空式编辑 · 保存即自动部署</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <TokenBar onSet={() => { setNeedToken(false); loadAll(); }} />
            <a href="https://wqy583050010-rgb.github.io/health-ingredient-db/" target="_blank" rel="noreferrer" className="hidden text-xs text-teal-600 hover:underline sm:block">
              查看线上网站 ↗
            </a>
          </div>
        </div>
      </header>

      {needToken ? (
        <div className="mx-auto max-w-2xl px-6 py-20 text-center">
          <div className="card p-8 space-y-4">
            <div className="text-4xl">🔑</div>
            <h2 className="text-lg font-semibold text-slate-800">需要 GitHub Token</h2>
            <p className="text-sm text-slate-500">
              在线版直接把数据写入你的 GitHub 仓库。请在右上角粘贴一个
              <b> 拥有仓库读写权限（repo）</b>的 Personal Access Token。
              Token 仅保存在你本机浏览器，不会上传到任何服务器。
            </p>
            <p className="text-xs text-slate-400">
              生成地址：GitHub → Settings → Developer settings → Personal access tokens → 勾选 <code>repo</code>（如需手动触发部署，额外勾选 <code>workflow</code>）
            </p>
          </div>
        </div>
      ) : (
        <div className="mx-auto flex max-w-6xl gap-6 px-6 py-6">
          {/* 侧边导航 */}
          <aside className="hidden w-40 shrink-0 md:block">
            <nav className="space-y-1 sticky top-20">
              {TABS.map((t) => (
                <button
                  key={t.key}
                  onClick={() => { setTab(t.key); setEditing(null); setSearch(''); }}
                  className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm font-medium transition ${tab === t.key ? 'bg-teal-600 text-white' : 'text-slate-600 hover:bg-slate-100'}`}
                >
                  <span>{t.icon} {t.label}</span>
                  {t.key !== 'deploy' && <span className={`rounded-full px-2 text-xs ${tab === t.key ? 'bg-white/20' : 'bg-slate-200 text-slate-600'}`}>{counts[t.key]}</span>}
                </button>
              ))}
            </nav>
          </aside>

          {/* 主区 */}
          <main className="min-w-0 flex-1">
            {/* 移动端 tab */}
            <div className="mb-4 flex gap-2 overflow-x-auto md:hidden">
              {TABS.map((t) => (
                <button key={t.key} onClick={() => { setTab(t.key); setEditing(null); }} className={`rounded-full px-3 py-1.5 text-sm ${tab === t.key ? 'bg-teal-600 text-white' : 'bg-slate-200 text-slate-600'}`}>
                  {t.icon} {t.label}
                </button>
              ))}
            </div>

            {loading ? (
              <div className="py-20 text-center text-slate-400">加载中…</div>
            ) : editing ? (
              editing.type === 'ingredients' ? (
                <IngredientEditor categories={categories} initial={editing.item as IngredientItem | null} onSaved={() => { loadAll(); setEditing(null); }} onCancel={() => setEditing(null)} />
              ) : editing.type === 'factories' ? (
                <FactoryEditor initial={editing.item as FactoryItem | null} onSaved={() => { loadAll(); setEditing(null); }} onCancel={() => setEditing(null)} />
              ) : (
                <CategoryEditor initial={editing.item as CategoryItem | null} onSaved={() => { loadAll(); setEditing(null); }} onCancel={() => setEditing(null)} />
              )
            ) : tab === 'deploy' ? (
              <DeployPanel counts={counts} onDeployed={loadAll} />
            ) : (
              <div className="space-y-4">
                {/* 工具条 */}
                <div className="flex flex-wrap items-center gap-3">
                  <input
                    className="field-input max-w-xs"
                    placeholder="搜索名称 / ID…"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                  <button className="btn btn-primary ml-auto" onClick={() => setEditing({ type: tab, item: null })}>
                    ➕ 新增{tab === 'ingredients' ? '原料' : tab === 'factories' ? '代工厂' : '分类'}
                  </button>
                </div>

                {/* 列表 */}
                <div className="card divide-y divide-slate-100">
                  {filtered.length === 0 && <div className="px-5 py-10 text-center text-slate-400">暂无数据</div>}
                  {filtered.map((item) => {
                    const it = item as IngredientItem & FactoryItem & CategoryItem;
                    return (
                      <div key={it.id} className="flex items-center justify-between px-5 py-3 hover:bg-slate-50">
                        <div className="min-w-0">
                          <div className="font-medium text-slate-800 truncate">{it.name}{it.nameEn ? <span className="ml-2 text-xs text-slate-400">{it.nameEn}</span> : null}</div>
                          <div className="text-xs text-slate-400 truncate">{it.id}</div>
                        </div>
                        <div className="flex shrink-0 gap-2">
                          <button className="btn btn-ghost text-xs" onClick={() => setEditing({ type: tab, item: it as never })}>编辑</button>
                          <button
                            className="btn btn-danger text-xs"
                            onClick={async () => {
                              if (!confirm(`确定删除「${it.name}」？`)) return;
                              try {
                                if (tab === 'ingredients') await api.deleteIngredient(it.id);
                                else if (tab === 'factories') await api.deleteFactory(it.id);
                                else await api.deleteCategory(it.id);
                                loadAll();
                              } catch (e) { alert('删除失败: ' + (e as Error).message); }
                            }}
                          >
                            删除
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </main>
        </div>
      )}
    </div>
  );
}

// ===== 发布面板 =====
function DeployPanel({ counts, onDeployed }: { counts: Record<Tab, number>; onDeployed: () => void }) {
  const [status, setStatus] = useState('idle');
  const [log, setLog] = useState('');
  const [deploying, setDeploying] = useState(false);
  const [errMsg, setErrMsg] = useState('');

  // 加载时拉一次最新部署状态
  useEffect(() => {
    api.deployStatus().then((s) => { setStatus(s.status); setLog(s.log); }).catch(() => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const poll = () => {
    const timer = setInterval(async () => {
      try {
        const s = await api.deployStatus();
        setStatus(s.status);
        setLog(s.log);
        if (s.status !== 'running') {
          clearInterval(timer);
          setDeploying(false);
          if (s.status === 'success') onDeployed();
        }
      } catch {
        /* ignore */
      }
    }, 3000);
  };

  const handleDeploy = async () => {
    setDeploying(true);
    setStatus('running');
    setLog('▶ 正在触发构建与部署…\n');
    setErrMsg('');
    try {
      await api.deploy();
      poll();
    } catch (e) {
      setErrMsg('触发失败: ' + (e as Error).message + '（提示：手动触发需 Token 勾选 workflow 权限；保存数据已自动部署）');
      setDeploying(false);
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-slate-800">🚀 发布到网站</h2>

      <div className="grid grid-cols-3 gap-3">
        {([
          ['原料', counts.ingredients],
          ['代工厂', counts.factories],
          ['分类', counts.categories],
        ] as [string, number][]).map(([label, n]) => (
          <div key={label} className="card p-4 text-center">
            <div className="text-2xl font-bold text-teal-600">{n}</div>
            <div className="text-xs text-slate-500">{label}</div>
          </div>
        ))}
      </div>

      <div className="card p-5 space-y-3">
        <p className="text-sm text-slate-600">
          你每次<strong>保存</strong>原料/代工厂/分类，数据会直接写入 GitHub 仓库并<strong>自动触发构建部署</strong>，通常 1-2 分钟后网站更新生效。一般无需手动点击发布。
        </p>
        <p className="text-xs text-slate-400">
          如需在多次保存后统一重新部署，可点下方按钮（要求 Token 勾选了 <code>workflow</code> 权限）。
        </p>
        <button className="btn btn-primary" onClick={handleDeploy} disabled={deploying}>
          {deploying ? '部署中…' : '🚀 立即重新部署'}
        </button>
        {errMsg && <div className="text-sm text-rose-600">{errMsg}</div>}
      </div>

      {log && (
        <div className="card p-4">
          <div className="mb-2 flex items-center gap-2 text-sm font-medium">
            <span className={`inline-block h-2 w-2 rounded-full ${status === 'running' ? 'bg-amber-400 animate-pulse' : status === 'success' ? 'bg-emerald-500' : status === 'error' ? 'bg-rose-500' : 'bg-slate-400'}`} />
            部署状态：{status}
          </div>
          <pre className="max-h-80 overflow-auto whitespace-pre-wrap rounded-lg bg-slate-900 p-3 text-xs text-slate-100">{log}</pre>
        </div>
      )}
    </div>
  );
}
