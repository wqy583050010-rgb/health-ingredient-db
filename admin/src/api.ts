// 管理面板 API 客户端 — GitHub 版
// 数据直接读写 GitHub 仓库（data/*.json），token 仅存浏览器 localStorage，不经服务器。

const OWNER = 'wqy583050010-rgb';
const REPO = 'health-ingredient-db';
const BRANCH = 'main';
const API = 'https://api.github.com';
const TOKEN_KEY = 'gh_token';

// ===== Token 管理（仅存本地浏览器）=====
export function getToken(): string {
  return localStorage.getItem(TOKEN_KEY) || '';
}
export function setToken(t: string): void {
  if (t && t.trim()) localStorage.setItem(TOKEN_KEY, t.trim());
  else localStorage.removeItem(TOKEN_KEY);
}
export function hasToken(): boolean {
  return !!getToken();
}

function authHeaders(): Record<string, string> {
  const t = getToken();
  if (!t) throw new Error('请先在右上角填入 GitHub Token（仅存本机浏览器）');
  return {
    Authorization: `Bearer ${t}`,
    Accept: 'application/vnd.github+json',
  };
}

// UTF-8 安全的 base64 编解码
function b64encodeUnicode(str: string): string {
  return btoa(unescape(encodeURIComponent(str)));
}
function b64decodeUnicode(b64: string): string {
  return decodeURIComponent(escape(atob(b64.replace(/\s/g, ''))));
}

interface FileData {
  content: any;
  sha: string;
}

async function getFile(path: string): Promise<FileData> {
  const res = await fetch(`${API}/repos/${OWNER}/${REPO}/contents/${path}?ref=${BRANCH}`, {
    headers: authHeaders(),
  });
  if (!res.ok) {
    const e = await res.json().catch(() => ({}));
    throw new Error(e.message || `读取 ${path} 失败 (${res.status})`);
  }
  const data = await res.json();
  return {
    content: JSON.parse(b64decodeUnicode(data.content)),
    sha: data.sha,
  };
}

async function putFile(path: string, content: any, sha: string, message: string): Promise<void> {
  const body = {
    message,
    content: b64encodeUnicode(JSON.stringify(content, null, 2)),
    sha,
    branch: BRANCH,
  };
  const res = await fetch(`${API}/repos/${OWNER}/${REPO}/contents/${path}`, {
    method: 'PUT',
    headers: { ...authHeaders(), 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const e = await res.json().catch(() => ({}));
    throw new Error(e.message || `写入 ${path} 失败 (${res.status})`);
  }
}

async function upsertInFile(path: string, item: any, message: string): Promise<void> {
  const { content, sha } = await getFile(path);
  const arr: any[] = Array.isArray(content) ? content : [];
  const clean = { ...item };
  delete clean._src;
  const idx = arr.findIndex((x) => x.id === item.id);
  if (idx >= 0) arr[idx] = clean;
  else arr.push(clean);
  await putFile(path, arr, sha, message);
}

async function deleteInFile(path: string, id: string, message: string): Promise<void> {
  const { content, sha } = await getFile(path);
  const arr: any[] = Array.isArray(content) ? content : [];
  const next = arr.filter((x) => x.id !== id);
  await putFile(path, next, sha, message);
}

// ===== 类型 =====
export interface IngredientItem {
  id: string;
  name: string;
  nameEn: string;
  category: string;
  categoryId: string;
  secondaryCategoryIds?: string[];
  popularity?: number;
  summary: string;
  efficacy?: string[];
  _src?: string;
  [key: string]: unknown;
}

export interface FactoryItem {
  id: string;
  name: string;
  nameEn: string;
  [key: string]: unknown;
}

export interface CategoryItem {
  id: string;
  name: string;
  icon: string;
  description: string;
  ingredientCount: number;
}

// ===== API =====
export const api = {
  // 原料（canonical 源: data/all_ingredients.json）
  ingredients: async () => {
    const { content } = await getFile('data/all_ingredients.json');
    return { items: content as IngredientItem[] };
  },
  ingredient: async (id: string) => {
    const { content } = await getFile('data/all_ingredients.json');
    const it = (content as IngredientItem[]).find((x) => x.id === id);
    if (!it) throw new Error('未找到原料: ' + id);
    return it;
  },
  saveIngredient: (ing: IngredientItem) => upsertInFile('data/all_ingredients.json', ing, `更新原料: ${ing.name || ing.id}`),
  deleteIngredient: (id: string) => deleteInFile('data/all_ingredients.json', id, `删除原料: ${id}`),

  // 代工厂
  factories: async () => {
    const { content } = await getFile('data/factories.json');
    return { items: content as FactoryItem[] };
  },
  saveFactory: (f: FactoryItem) => upsertInFile('data/factories.json', f, `更新代工厂: ${f.name || f.id}`),
  deleteFactory: (id: string) => deleteInFile('data/factories.json', id, `删除代工厂: ${id}`),

  // 分类
  categories: async () => {
    const { content } = await getFile('data/categories.json');
    return { items: content as CategoryItem[] };
  },
  saveCategory: (c: CategoryItem) => upsertInFile('data/categories.json', c, `更新分类: ${c.name || c.id}`),
  deleteCategory: (id: string) => deleteInFile('data/categories.json', id, `删除分类: ${id}`),

  // 部署状态（GitHub Actions）
  deployStatus: async () => {
    const res = await fetch(`${API}/repos/${OWNER}/${REPO}/actions/runs?per_page=1`, { headers: authHeaders() });
    if (!res.ok) return { status: 'idle', log: '无法获取部署状态', startedAt: null, finishedAt: null };
    const data = await res.json();
    const run = data.workflow_runs?.[0];
    if (!run) return { status: 'idle', log: '暂无部署记录（保存数据后会自动触发首次部署）', startedAt: null, finishedAt: null };
    let status = 'running';
    if (run.status === 'completed') status = run.conclusion === 'success' ? 'success' : 'error';
    const log = `最近部署 #${run.run_number}\n状态: ${run.status} / ${run.conclusion || '-'}\n触发: ${run.created_at}\n${run.html_url}`;
    return { status, log, startedAt: run.created_at, finishedAt: run.updated_at };
  },

  // 手动触发部署（需 Token 勾选 workflow 权限）
  deploy: async () => {
    const res = await fetch(`${API}/repos/${OWNER}/${REPO}/actions/workflows/deploy.yml/dispatches`, {
      method: 'POST',
      headers: { ...authHeaders(), 'Content-Type': 'application/json' },
      body: JSON.stringify({ ref: BRANCH }),
    });
    if (!res.ok) {
      const e = await res.json().catch(() => ({}));
      throw new Error(e.message || `触发部署失败 (${res.status})`);
    }
    return { ok: true };
  },
};
