import { call, put, takeEvery } from "redux-saga/effects";
import { hideLoader, showLoader, showError } from "./actions";
import { FETCH_POSTS, REQUEST_POSTS } from "./types";

export function* sagaWatcher() {
  yield takeEvery(REQUEST_POSTS, sagaWorker);
}

function* sagaWorker() {
  try {
    yield put(showLoader());
    const payload = yield call(fetchPosts);
    yield put({ type: FETCH_POSTS, payload });
    yield put(hideLoader());
  } catch (e) {
    yield put(showError("Что-то пошло не так"));
    yield put(hideLoader());
  }
}

async function fetchPosts() {
  const response = await fetch(
    "https://ajsonplaceholder.typicode.com/todos?_limit=5"
  );
  return await response.json();
}
