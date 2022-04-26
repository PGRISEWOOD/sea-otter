import { appReducer, REPO_ACTIONS } from "./reducer";

const MOCK_REPO_PAYLOAD = {
  incomplete_results: true,
  items: [{ id: 126577260, name: "someRepoName" }],
  total_count: 14925106,
};

const INITIAL_STATE = {
  incompleteResults: false,
  items: [],
  totalCount: 0,
  loading: false,
  error: null,
};

describe("App reducer", () => {
  test("app reducer has initial state", () => {
    expect(appReducer(undefined, {})).toEqual(INITIAL_STATE);
  });

  test("app reducer sets error state on error action", () => {
    const error = "Some Error";
    const expectedState = { ...INITIAL_STATE, error };

    expect(
      appReducer(INITIAL_STATE, { type: REPO_ACTIONS.ERROR, payload: error })
    ).toEqual(expectedState);
  });

  test("app reducer sets loading state on fetch action", () => {
    const expectedState = { ...INITIAL_STATE, loading: true };

    expect(appReducer(INITIAL_STATE, { type: REPO_ACTIONS.FETCH })).toEqual(
      expectedState
    );
  });

  test("app reducer sets items state on set action", () => {
    const expectedState = {
      ...INITIAL_STATE,
      items: MOCK_REPO_PAYLOAD.items,
      totalCount: MOCK_REPO_PAYLOAD.total_count,
      incompleteResults: MOCK_REPO_PAYLOAD.incomplete_results,
    };

    expect(
      appReducer(INITIAL_STATE, {
        type: REPO_ACTIONS.SET,
        payload: MOCK_REPO_PAYLOAD,
      })
    ).toEqual(expectedState);
  });

  test("app reducer appends items state on append action", () => {
    const newItem = { id: 2, name: "item2" };
    const initialState = {
      ...INITIAL_STATE,
      items: [{ id: 1, name: "item1" }],
    };
    const expectedState = {
      ...initialState,
      items: [...initialState.items, newItem],
      totalCount: MOCK_REPO_PAYLOAD.total_count,
      incompleteResults: MOCK_REPO_PAYLOAD.incomplete_results,
    };

    expect(
      appReducer(initialState, {
        type: REPO_ACTIONS.APPEND,
        payload: { ...MOCK_REPO_PAYLOAD, items: [newItem] },
      })
    ).toEqual(expectedState);
  });
});
