import { useCallback, useReducer, createContext } from "react";
import keepAliveReducer, { actions } from "./keepAliveReducer.js";

export const KeepAliveContext = createContext({});

const AliveScope = ({ children }) => {
  /**
   * 用于缓存状态
   * keepAliveId: {
   *  keepAliveId,
   *  reactElement,
   *  nodes,
   *  status: create | created
   * }
   */
  const [keepAliveStates, dispatch] = useReducer(keepAliveReducer, {});

  const setKeepAliveStates = useCallback(
    ({ keepAliveId, reactElement }) => {
      if (!keepAliveStates[keepAliveId]) {
        dispatch({
          type: actions.CREATING,
          payload: {
            keepAliveId,
            reactElement,
          },
        });
      }
    },
    [keepAliveStates]
  );

  return (
    <KeepAliveContext.Provider
      value={{
        keepAliveStates,
        setKeepAliveStates,
      }}
    >
      {children}

      {Object.values(keepAliveStates).map(({ keepAliveId, reactElement }) => (
        <div
          id={keepAliveId}
          style={{ display: "none" }}
          key={keepAliveId}
          ref={(node) => {
            if (node && !keepAliveStates[keepAliveId].nodes) {
              dispatch({
                type: actions.CREATED,
                payload: {
                  keepAliveId,
                  nodes: node.firstElementChild,
                },
              });
            }
          }}
        >
          {reactElement}
        </div>
      ))}
    </KeepAliveContext.Provider>
  );
};

export default AliveScope;
