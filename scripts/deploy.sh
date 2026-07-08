#!/usr/bin/env bash
# 一键本地发布脚本（替代慢速的 GitHub Actions 云端构建）
# 用法： bash scripts/deploy.sh "可选的提交说明"
# 流程： JSON -> TS -> 本地 build -> 复制产物为根 index.html -> 提交 -> 推送（GitHub Pages 自动部署）
set -euo pipefail

# 定位项目根目录（scripts/ 的上一级）
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

MSG="${1:-deploy: 本地构建发布}"

# managed python 绝对路径（含中文用户名，git bash 可正常解析）
PYTHON="C:/Users/康力/.workbuddy/binaries/python/versions/3.13.12/python.exe"

echo "==> [0/5] 恢复源码入口 index.html（防止被上次的构建产物覆盖导致不重新编译）"
cp index.src.html index.html

echo "==> [1/5] 由 JSON 生成 TS 数据"
"$PYTHON" scripts/build_from_json.py --no-build

echo "==> [2/5] 本地构建 (npm run build)"
npm run build

echo "==> [3/5] 复制构建产物为根 index.html"
cp dist/index.html ./index.html

echo "==> [4/5] 提交变更"
git add -f index.html
git add data src
if git diff --cached --quiet; then
  echo "    （没有需要提交的源码/产物变更，跳过 commit）"
else
  git commit -m "$MSG"
fi

echo "==> [5/5] 推送并触发 GitHub Pages 部署"
GIT_TERMINAL_PROMPT=0 git -c credential.helper=manager push origin main

echo "==> 完成 ✅  GitHub Pages 通常十几秒内更新（如看不到请 Ctrl+F5 强刷）"
