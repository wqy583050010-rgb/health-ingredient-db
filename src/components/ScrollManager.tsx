import { useEffect, useLayoutEffect, useRef } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';

/**
 * 路由级滚动管理（HashRouter 无内置 scroll restoration）：
 * - 前进 / 新导航 (PUSH / REPLACE)：进入新页面时自动滚动到窗口顶部
 * - 返回 / 前进历史 (POP)：恢复到进入该页面前的滚动位置
 */
export default function ScrollManager() {
  const location = useLocation();
  const navType = useNavigationType();
  const positions = useRef<Map<string, number>>(new Map());
  const curKey = useRef<string>(location.key);

  // 禁用浏览器默认的滚动恢复，避免与我们的逻辑冲突
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    const onScroll = () => {
      positions.current.set(curKey.current, window.scrollY);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useLayoutEffect(() => {
    if (navType === 'POP') {
      // 先记下当前（即将离开）页面的位置
      positions.current.set(curKey.current, window.scrollY);
      const targetKey = location.key;
      curKey.current = targetKey;
      const y = positions.current.get(targetKey) ?? 0;
      // 等下一帧新内容渲染完成后再恢复，双 rAF 兜底布局抖动
      requestAnimationFrame(() => {
        window.scrollTo(0, y);
        requestAnimationFrame(() => window.scrollTo(0, y));
      });
    } else {
      // PUSH / REPLACE：先记录离开页的位置，再置顶新页面
      positions.current.set(curKey.current, window.scrollY);
      curKey.current = location.key;
      window.scrollTo(0, 0);
    }
  }, [location.key, navType]);

  return null;
}
