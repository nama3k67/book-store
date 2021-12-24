import { put, takeEvery } from "redux-saga/effects";
import axios from "axios";

import { BLOG_ACTION, REQUEST, SUCCESS, FAIL } from "../constants";

function* getBlogListSaga(action) {
  try {
    const { limit, page, sortFilter, keyword } = action.payload;

    const result = yield axios.get(`http://localhost:4000/blogs`, {
      params: {
        _limit: limit,
        _page: page,
        ...(keyword && { q: keyword }),
        ...(sortFilter && { _sort: "id", _order: sortFilter }),
      },
    });
    yield put({
      type: SUCCESS(BLOG_ACTION.GET_BLOG_LIST),
      payload: {
        data: result.data,
        meta: {
          page,
          total: parseInt(result.headers["x-total-count"]),
        },
      },
    });
  } catch (e) {
    yield put({
      type: FAIL(BLOG_ACTION.GET_BLOG_LIST),
      payload: { error: e.message },
    });
  }
}

function* getFeatureBlogListSaga(action) {
  try {
    const result = yield axios.get(`http://localhost:4000/blogs`);
    yield put({
      type: SUCCESS(BLOG_ACTION.GET_FEATURE_BLOG_LIST),
      payload: {
        data: result.data,
      },
    });
  } catch (e) {
    yield put({
      type: FAIL(BLOG_ACTION.GET_FEATURE_BLOG_LIST),
      payload: { error: e.message },
    });
  }
}

function* getBlogDetailSaga(action) {
  try {
    const { id } = action.payload;
    const result = yield axios.get(`http://localhost:4000/blogs/${id}`);
    yield put({
      type: SUCCESS(BLOG_ACTION.GET_BLOG_DETAIL),
      payload: { data: result.data },
    });
  } catch (e) {
    yield put({
      type: FAIL(BLOG_ACTION.GET_BLOG_DETAIL),
      payload: { error: e.message },
    });
  }
}

export default function* blogSaga() {
  yield takeEvery(REQUEST(BLOG_ACTION.GET_BLOG_LIST), getBlogListSaga);
  yield takeEvery(
    REQUEST(BLOG_ACTION.GET_FEATURE_BLOG_LIST),
    getFeatureBlogListSaga
  );
  yield takeEvery(REQUEST(BLOG_ACTION.GET_BLOG_DETAIL), getBlogDetailSaga);
}
