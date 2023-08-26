import { useRef } from "react";

/**
 * 判断是否首次渲染
 * @returns
 */
function useFirstMount(): boolean {
  const isFirst = useRef(true);

  // 如果是初次渲染
  if (isFirst.current) {
    isFirst.current = false;
    return true;
  }

  return isFirst.current;
}

export default useFirstMount;
