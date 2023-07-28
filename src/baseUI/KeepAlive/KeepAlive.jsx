import React, { useRef, useContext, useEffect } from "react";
import { KeepAliveContext } from "./AliveScope";

const KeepAlive = ({ children, keepAliveId }) => {
  const _ref = useRef(null);
  const { keepAliveStates, setKeepAliveStates } = useContext(KeepAliveContext);

  useEffect(() => {
    const state = keepAliveStates[keepAliveId];

    if (state && state.nodes) {
      _ref.current.appendChild(state.nodes);
    } else {
      setKeepAliveStates({
        keepAliveId,
        reactElement: children,
      });
    }

    return () => {
      const state = keepAliveStates[keepAliveId];
      if (state && state.nodes) {
        _ref.current.removeChild(state.nodes);
      }
    };
  }, [children, keepAliveId, keepAliveStates, setKeepAliveStates]);

  return <div ref={_ref}></div>;
};

/**
 * 高阶组件
 * @param {React.ReactNode} KeepAliveComponent
 * @param {string} keepAliveId
 * @returns {React.FC}
 */
export const withKeepAlive = (KeepAliveComponent, keepAliveId) => {
  return (props) => {
    const _ref = useRef(null);
    const { keepAliveStates, setKeepAliveStates } = useContext(KeepAliveContext);

    useEffect(() => {
      const state = keepAliveStates[keepAliveId];

      if (state && state.nodes) {
        _ref.current.appendChild(state.nodes);
      } else {
        setKeepAliveStates({
          keepAliveId,
          reactElement: <KeepAliveComponent {...props} />,
        });
      }
    }, [keepAliveStates, props, setKeepAliveStates]);

    return <div ref={_ref}></div>;
  };
};

export default KeepAlive;
