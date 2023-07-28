export const actions = {
  CREATING: "creating",
  CREATED: "created",
};

function keepAliveReducer(state, action) {
  const { type, payload } = action;
  const { keepAliveId } = payload;

  switch (type) {
    case actions.CREATING:
      return {
        ...state,
        [keepAliveId]: {
          keepAliveId,
          reactElement: payload.reactElement,
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
          nodes: payload.nodes,
        },
      };

    default:
      return state;
  }
}

export default keepAliveReducer;
