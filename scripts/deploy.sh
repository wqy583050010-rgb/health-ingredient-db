#!/usr/bin/env bash
# 快速发布脚本 —— 本地构建 + 推送根 index.html（GitHub Pages 直接由 main 分支根 index.html 提供）
# 用法: bash scripts/deploy.sh "提交说明"
# 前提: node_modules 已安装；Windows GCM 已缓存 GitHub 写凭据
set -e

cd "$(dirname "$0")/.."   # 切到项目根
MSG="${1:-Update: 数据更新 $(date +%Y-%m-%d_%H:%M)}"

# 解析 python（agent 沙箱用受管解释器，本地回退 python3/python）
if [ -x "C:/ProgramData/WorkBuddy/users/d282b1d/.workbuddy/binaries/python/versions/3.13.12/python.exe" ]; then
  PY="C:/ProgramData/WorkBuddy/users/d282b1d/.workbuddy/binaries/python/versions/3.13.12/python.exe"
elif command -v python3 >/dev/null 2>&1; then
  PY=python3
else
  PY=python
fi

echo "==> [1/5] 解除 index.html 可能的 skip-worktree 冻结"
git update-index --no-skip-worktree index.html 2>/dev/null || true

echo "==> [2/5] 由 JSON 重新生成 TS + 同步批次文件"
"$PY" scripts/build_from_json.py --no-build

echo "==> [3/5] 本地构建网站 (npm run build)"
npm run build

echo "==> [4/5] 用构建产物覆盖根 index.html (Pages 源)"
cp dist/index.html index.html

echo "==> [5/5] 暂存数据/源码/入口并推送"
git add data/ src/ index.html
if git diff --cached --quiet; then
  echo "（无变更，跳过提交）"
else
  git commit -m "$MSG"
  GIT_TERMINAL_PROMPT=0 git -c credential.helper=manager push origin main
  echo "✅ 已推送 main。GitHub Pages 由根 index.html 直接提供，通常 10–60s 生效（必要时追加 ?v=时间戳 破 CDN 缓存）。"
fi

echo "==> [6/6] 重新冻结 index.html 为源码入口，避免后续合并污染"
cp index.src.html index.html
git update-index --skip-worktree index.html
echo "备用镜像: https://b5910344a4354e75998105a2f0e670db.app.codebuddy.work"
