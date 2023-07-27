import { useCallback, useReducer } from "react";
import actions from "./actions.js";
import { KeepAliveContext } from "./KeepAliveContext.js";

const AliveScope = ({ children }) => {
  /**
   * keepAliveId: {
   *  keepAliveId,
   *  reactElement,
   *  nodes,
   *  status: create | created
   * }
   */
  const [keepAliveStates, dispatch] = useReducer(keepAliveReducer, {});

  const setKeepAliveStates = useCallback(
    (keepAliveId, reactElement) => {
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
          key={keepAliveId}
          ref={(node) => {
            if (node && !keepAliveStates[keepAliveId].nodes) {
              dispatch({
                type: actions.CREATED,
                payload: {
                  keepAliveId,
                  nodes: [...node.childNodes],
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

function keepAliveReducer(state, action) {
  const { type, payload } = action;
  const { keepAliveId, nodes, reactElement } = payload;

  switch (type) {
    case actions.CREATING:
      return {
        ...state,
        [keepAliveId]: {
          keepAliveId,
          reactElement,
          nodes: null,
          status: type,
        },
      };
    case actions.CREATED:
      return {
        ...state,
        [keepAliveId]: {
          ...state[keepAliveId],
          status: type,
          nodes,
        },
      };

    default:
      return state;
  }
}

export default AliveScope;
