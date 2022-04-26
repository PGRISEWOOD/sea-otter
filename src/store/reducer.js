const initialState = {
  items: [],
  totalCount: 0,
  incompleteResults: false,
  error: null,
  loading: false,
};

const REPO_ACTIONS = {
  FETCH: "REPOS/FETCH",
  APPEND: "REPOS/APPEND",
  SET: "REPOS/SET",
  ERROR: "REPOS/ERROR",
};

// eslint-disable-next-line default-param-last
const appReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case REPO_ACTIONS.FETCH: {
      return { ...state, loading: true };
    }
    case REPO_ACTIONS.APPEND: {
      const {
        incomplete_results: incompleteResults,
        total_count: totalCount,
        items,
      } = payload;

      return {
        ...state,
        totalCount,
        incompleteResults,
        items: [...state.items, ...items],
        error: null,
        loading: false,
      };
    }
    case REPO_ACTIONS.SET: {
      const {
        incomplete_results: incompleteResults,
        total_count: totalCount,
        items,
      } = payload;

      return {
        ...state,
        totalCount,
        incompleteResults,
        items,
        error: null,
        loading: false,
      };
    }
    case REPO_ACTIONS.ERROR: {
      return { ...state, error: payload, loading: false };
    }
    default: {
      return state;
    }
  }
};

export { appReducer, REPO_ACTIONS };
