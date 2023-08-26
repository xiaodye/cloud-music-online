import { useEffect, useState } from "react";

/**
 * 用来处理防抖值的 state
 * @param value
 * @param wait
 * @returns
 */
function useDebounceState<T>(value: T, wait: number): T {
  const [debounceValue, setDebounceValue] = useState(value);

  useEffect(() => {
    // 在 wait 时间后更新 debouncedValue
    const timer = setTimeout(() => {
      setDebounceValue(value);
    }, wait);

    // 当传入的value变化时，清除之前的定时器
    return () => clearTimeout(timer);
  }, [value, wait]);

  return debounceValue;
}

export default useDebounceState;
