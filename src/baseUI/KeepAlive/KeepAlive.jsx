import React, { useRef, useContext, useEffect } from "react";
import { KeepAliveContext } from "./KeepAliveContext";

const KeepAlive = ({ children, keepAliveId }) => {
  const _ref = useRef(null);
  const { keepAliveStates, setKeepAliveStates } = useContext(KeepAliveContext);

  useEffect(() => {
    const state = keepAliveStates[keepAliveId];

    if (state && state.nodes) {
      state.nodes.forEach((node) => _ref.current.appendChild(node));
    } else {
      setKeepAliveStates({
        keepAliveId,
        reactElement: children,
      });
    }
  }, [children, keepAliveId, keepAliveStates, setKeepAliveStates]);

  return <div ref={_ref}>{children}</div>;
};

export default KeepAlive;
