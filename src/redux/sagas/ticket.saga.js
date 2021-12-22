import { put, takeEvery } from "redux-saga/effects";
import axios from "axios";
import { TICKET_ACTION, SUCCESS, FAIL, REQUEST } from "../constants";

function* getTicketListSaga(action) {
  try {
    const result = yield axios.get(`http://localhost:4000/tickets`);
    yield put({
      type: SUCCESS(TICKET_ACTION.GET_TICKET_LIST),
      payload: {
        data: result.data,
      },
    });
  } catch (e) {
    yield put({
      type: FAIL(TICKET_ACTION.GET_TICKET_LIST),
      payload: {
        error: e.message,
      },
    });
  }
}

export default function* ticketSaga() {
  yield takeEvery(REQUEST(TICKET_ACTION.GET_TICKET_LIST), getTicketListSaga);
}
