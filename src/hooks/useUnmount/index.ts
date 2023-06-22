import { useEffect } from "react";
import useLatest from "../useLatest";

function useUnMount(fn: () => void): void {
  const fnRef = useLatest(fn);

  useEffect(
    () => () => {
      fnRef.current();
    },
    []
  );
}

export default useUnMount;
