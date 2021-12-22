import { put, takeEvery } from "redux-saga/effects";
import axios from "axios";

import { COVER_ACTION, REQUEST, SUCCESS, FAIL } from "../constants";

function* getCoverListSaga(action) {
  try {
    const result = yield axios.get("http://localhost:4000/covers");
    yield put({
      type: SUCCESS(COVER_ACTION.GET_COVER_LIST),
      payload: {
        data: result.data,
      },
    });
  } catch (e) {
    yield put({
      type: FAIL(COVER_ACTION.GET_COVER_LIST),
      payload: {
        error: e.message,
      },
    });
  }
}

export default function* coverSaga() {
  yield takeEvery(REQUEST(COVER_ACTION.GET_COVER_LIST), getCoverListSaga);
}
