import { put, takeEvery } from "redux-saga/effects";
import axios from "axios";

import { PUBLISHER_ACTION, REQUEST, SUCCESS, FAIL } from "../constants";

function* getPublisherListSaga(action) {
  try {
    const result = yield axios.get(
      "https://book-store-fe19-api.herokuapp.com/publishers"
    );
    yield put({
      type: SUCCESS(PUBLISHER_ACTION.GET_PUBLISHER_LIST),
      payload: {
        data: result.data,
      },
    });
  } catch (e) {
    yield put({
      type: FAIL(PUBLISHER_ACTION.GET_PUBLISHER_LIST),
      payload: {
        error: e.message,
      },
    });
  }
}

export default function* publisherSaga() {
  yield takeEvery(
    REQUEST(PUBLISHER_ACTION.GET_PUBLISHER_LIST),
    getPublisherListSaga
  );
}
