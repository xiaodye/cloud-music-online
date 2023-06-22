import { useEffect } from "react";

/**
 * 组件挂载
 * @param fn
 */
function useMount(fn: () => void): void {
  useEffect(() => {
    fn();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

export default useMount;
