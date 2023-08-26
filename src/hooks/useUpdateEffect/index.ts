import { useEffect, DependencyList } from "react";
import useFirstMount from "../useFirstMount";

/**
 * useUpdateEffect 用法等同于 useEffect，但是会忽略首次执行，只在依赖更新时执行。
 * @param effect
 * @param deps
 */
function useUpdateEffect(effect: () => void, deps?: DependencyList): void {
  // 判断是否是初次渲染
  const isFirst = useFirstMount();

  useEffect(() => {
    if (!isFirst) {
      effect();
    }
  }, deps);
}

export default useUpdateEffect;
