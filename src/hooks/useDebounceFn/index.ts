import { useMemo } from "react";
import useLatest from "../useLatest";
import debounce from "./debounce.js";

/**
 * 用来处理防抖函数的 Hook
 * @param fn
 * @param wait
 * @returns
 */
function useDebounceFn<T>(fn: T, wait: number) {
  // 使用 fnRef 保证每次传入的函数式最新的
  const fnRef = useLatest(fn);

  const debounceFn = useMemo(() => {
    return debounce(fnRef.current, wait);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return debounceFn;
}

export default useDebounceFn;
