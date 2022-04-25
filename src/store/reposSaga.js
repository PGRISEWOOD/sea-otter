import { call, put, takeLatest } from "redux-saga/effects";
import { fetchRepos } from "../api/fetchRepos";
import { REPO_ACTIONS } from "./reducer";

const REPO_EVENTS = {
  SEARCH_REQUESTED: "REPOS_SEARCH_REQUESTED",
};

function* searchRepos({ payload }) {
  try {
    yield put({
      type: REPO_ACTIONS.FETCH,
    });
    const data = yield call(fetchRepos, payload);
    yield put({
      type: payload.page === 1 ? REPO_ACTIONS.SET : REPO_ACTIONS.APPEND,
      payload: data,
    });
  } catch ({ message }) {
    yield put({ type: REPO_ACTIONS.ERROR, message });
  }
}
function* reposSaga() {
  yield takeLatest(REPO_EVENTS.SEARCH_REQUESTED, searchRepos);
}

export { reposSaga, REPO_EVENTS };
