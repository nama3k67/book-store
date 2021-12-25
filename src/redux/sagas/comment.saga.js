import { put, takeEvery } from "redux-saga/effects";
import axios from "axios";

import { COMMENT_ACTION, REQUEST, SUCCESS, FAIL } from "../constants";

function* getCommentListSaga(action) {
  try {
    const { productId } = action.payload;
    const result = yield axios.get(
      `https://book-store-fe19-api.herokuapp.com/comments`,
      {
        params: {
          productId,
          _expand: "user",
          _order: "desc",
          _sort: "id",
        },
      }
    );
    yield put({
      type: SUCCESS(COMMENT_ACTION.GET_COMMENT_LIST),
      payload: {
        data: result.data,
      },
    });
  } catch (e) {
    yield put({
      type: FAIL(COMMENT_ACTION.GET_COMMENT_LIST),
      payload: {
        error: "Lỗi khi lấy dữ liệu",
      },
    });
  }
}

function* postCommentSaga(action) {
  try {
    const { productId } = action.payload;
    const result = yield axios.post(
      `https://book-store-fe19-api.herokuapp.com/comments`,
      action.payload
    );
    yield put({
      type: REQUEST(COMMENT_ACTION.GET_COMMENT_LIST),
      payload: {
        productId,
      },
    });
    yield put({
      type: SUCCESS(COMMENT_ACTION.POST_COMMENT),
      payload: {
        data: result.data,
      },
    });
  } catch (e) {
    yield put({
      type: FAIL(COMMENT_ACTION.POST_COMMENT),
    });
  }
}

export default function* commentSaga() {
  yield takeEvery(REQUEST(COMMENT_ACTION.GET_COMMENT_LIST), getCommentListSaga);
  yield takeEvery(REQUEST(COMMENT_ACTION.POST_COMMENT), postCommentSaga);
}
