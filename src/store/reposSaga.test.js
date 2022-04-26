import { REPO_ACTIONS } from "./reducer";
import { searchRepos } from "./reposSaga";

describe("Repos Saga", () => {
  test("repos sage generates set events", () => {
    const gen = searchRepos({ payload: { page: 1 } });

    const {
      value: {
        payload: {
          action: { type },
        },
      },
    } = gen.next(); // Fetch Event
    expect(type).toEqual(REPO_ACTIONS.FETCH);

    gen.next(); // API call
    const {
      value: {
        payload: {
          action: { type: testType },
        },
      },
    } = gen.next(); // SET/APPEND/ERROR event
    expect(testType).toEqual(REPO_ACTIONS.SET);
  });

  test("repos sage generates append events", () => {
    const gen = searchRepos({ payload: { page: 2 } });

    const {
      value: {
        payload: {
          action: { type },
        },
      },
    } = gen.next(); // Fetch Event
    expect(type).toEqual(REPO_ACTIONS.FETCH);

    gen.next(); // API call
    const {
      value: {
        payload: {
          action: { type: testType },
        },
      },
    } = gen.next(); // SET/APPEND/ERROR event
    expect(testType).toEqual(REPO_ACTIONS.APPEND);
  });

  test("repos sage generates error events", () => {
    const gen = searchRepos({ payload: undefined });

    const {
      value: {
        payload: {
          action: { type },
        },
      },
    } = gen.next(); // Fetch Event
    expect(type).toEqual(REPO_ACTIONS.FETCH);

    gen.next(); // API call
    const {
      value: {
        payload: {
          action: { type: testType },
        },
      },
    } = gen.next(); // SET/APPEND/ERROR event
    expect(testType).toEqual(REPO_ACTIONS.ERROR);
  });
});
