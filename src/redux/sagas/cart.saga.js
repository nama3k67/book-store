import { put, takeEvery } from "redux-saga/effects";
import axios from "axios";
import { notification } from "antd";

import { CART_ACTION, REQUEST, SUCCESS, FAIL } from "../constants";

function* getCartListSaga(action) {
  try {
    const { userId } = action.payload;
    const result = yield axios.get(
      `https://book-store-fe19-api.herokuapp.com/carts`,
      {
        params: {
          userId,
          _expand: "product",
        },
      }
    );
    yield put({
      type: SUCCESS(CART_ACTION.GET_CART_LIST),
      payload: {
        data: result.data,
      },
    });
  } catch (e) {
    yield put({
      type: FAIL(CART_ACTION.GET_CART_LIST),
      payload: { error: e.message },
    });
  }
}

function* addToCartSaga(action) {
  try {
    const { userId } = action.payload;
    const result = yield axios.post(
      "https://book-store-fe19-api.herokuapp.com/carts",
      action.payload
    );
    yield put({
      type: REQUEST(CART_ACTION.GET_CART_LIST),
      payload: {
        userId,
      },
    });
    yield put({
      type: SUCCESS(CART_ACTION.ADD_TO_CART),
      payload: {
        data: result.data,
      },
    });
    yield notification.success({
      message: "Thêm vào giỏ hàng thành công!",
    });
  } catch (e) {
    yield put({
      type: FAIL(CART_ACTION.ADD_TO_CART),
      payload: { error: e.message },
    });
  }
}

function* updateCartProductSaga(action) {
  try {
    const { data, callback } = action.payload;
    yield axios.patch(
      `https://book-store-fe19-api.herokuapp.com/carts/${data.id}`,
      {
        quantity: data.quantity,
      }
    );
    yield put({
      type: SUCCESS(CART_ACTION.UPDATE_CART_PRODUCT),
      payload: {
        data,
      },
    });
    if (callback?.showSuccess) {
      callback.showSuccess();
    }
  } catch (e) {
    yield put({
      type: FAIL(CART_ACTION.UPDATE_CART_PRODUCT),
      payload: { error: e.message },
    });
  }
}

function* removeCartProductSaga(action) {
  try {
    const { id } = action.payload;

    yield axios.delete(`https://book-store-fe19-api.herokuapp.com/carts/${id}`);
    yield put({
      type: SUCCESS(CART_ACTION.REMOVE_CART_PRODUCT),
      payload: {
        id,
      },
    });
  } catch (e) {
    yield put({
      type: FAIL(CART_ACTION.REMOVE_CART_PRODUCT),
      payload: { error: e.message },
    });
  }
}

export default function* cartSaga() {
  yield takeEvery(REQUEST(CART_ACTION.GET_CART_LIST), getCartListSaga);
  yield takeEvery(REQUEST(CART_ACTION.ADD_TO_CART), addToCartSaga);
  yield takeEvery(
    REQUEST(CART_ACTION.UPDATE_CART_PRODUCT),
    updateCartProductSaga
  );
  yield takeEvery(
    REQUEST(CART_ACTION.REMOVE_CART_PRODUCT),
    removeCartProductSaga
  );
}
