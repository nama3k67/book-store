import { takeEvery, put } from "redux-saga/effects";
import axios from "axios";

import { WISHLIST_ACTION, REQUEST, SUCCESS, FAIL } from "../constants";

function* addToWishlistSaga(action) {
  try {
    const { userId, data } = action.payload;
    const result = yield axios.patch(
      `https://book-store-fe19-api.herokuapp.com/users/${userId}`,
      data
    );
    yield put({
      type: SUCCESS(WISHLIST_ACTION.ADD_TO_WISHLIST),
      payload: result.data.wishlist,
    });
  } catch (e) {
    yield put({
      type: FAIL(WISHLIST_ACTION.ADD_TO_WISHLIST),
      payload: e.message,
    });
  }
}

function* deleteWishlistSaga(action) {
  try {
    const { userId, data } = action.payload;
    const result = yield axios.patch(
      `https://book-store-fe19-api.herokuapp.com/users/${userId}`,
      data
    );
    yield put({
      type: SUCCESS(WISHLIST_ACTION.DELETE_WISHLIST),
      payload: result.data.wishlist,
    });
  } catch (e) {
    yield put({
      type: FAIL(WISHLIST_ACTION.DELETE_WISHLIST),
      payload: e.message,
    });
  }
}

export default function* wishlistSaga() {
  yield takeEvery(REQUEST(WISHLIST_ACTION.ADD_TO_WISHLIST), addToWishlistSaga);
  yield takeEvery(REQUEST(WISHLIST_ACTION.DELETE_WISHLIST), deleteWishlistSaga);
}
