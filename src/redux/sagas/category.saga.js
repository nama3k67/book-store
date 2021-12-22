import { put, takeEvery } from "redux-saga/effects";
import axios from "axios";

import { CATEGORY_ACTION, REQUEST, SUCCESS, FAIL } from "../constants";

function* getCategoryListSaga(action) {
  try {
    const result = yield axios.get("http://localhost:4000/categories");
    yield put({
      type: SUCCESS(CATEGORY_ACTION.GET_CATEGORY_LIST),
      payload: {
        data: result.data,
      },
    });
  } catch (e) {
    yield put({
      type: FAIL(CATEGORY_ACTION.GET_CATEGORY_LIST),
      payload: {
        error: e.message,
      },
    });
  }
}

export default function* categorySaga() {
  yield takeEvery(
    REQUEST(CATEGORY_ACTION.GET_CATEGORY_LIST),
    getCategoryListSaga
  );
}
