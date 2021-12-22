import { put, takeEvery } from "redux-saga/effects";
import axios from "axios";

import { AUTHOR_ACTION, REQUEST, SUCCESS, FAIL } from "../constants";

function* getAuthorListSaga(action) {
  try {
    const result = yield axios.get("http://localhost:4000/authors");
    yield put({
      type: SUCCESS(AUTHOR_ACTION.GET_AUTHOR_LIST),
      payload: {
        data: result.data,
      },
    });
  } catch (e) {
    yield put({
      type: FAIL(AUTHOR_ACTION.GET_AUTHOR_LIST),
      payload: {
        error: e.message,
      },
    });
  }
}

export default function* authorSaga() {
  yield takeEvery(REQUEST(AUTHOR_ACTION.GET_AUTHOR_LIST), getAuthorListSaga);
}
