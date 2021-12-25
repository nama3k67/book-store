import { put, takeEvery } from "redux-saga/effects";
import axios from "axios";

import { ORDER_ACTION, REQUEST, SUCCESS, FAIL } from "../constants";

function* getOrderListSaga(action) {
  try {
    const { id } = action.payload;
    const result = yield axios.get(
      "https://book-store-fe19-api.herokuapp.com/orders",
      {
        params: {
          userId: id,
          _order: "desc",
          _sort: "createdAt",
        },
      }
    );
    yield put({
      type: SUCCESS(ORDER_ACTION.GET_ORDER_LIST),
      payload: {
        data: result.data,
      },
    });
  } catch (e) {
    yield put({
      type: FAIL(ORDER_ACTION.GET_ORDER_LIST),
      payload: { error: e.message },
    });
  }
}

function* orderCartSaga(action) {
  try {
    const { data, callback } = action.payload;
    yield axios.post("https://book-store-fe19-api.herokuapp.com/orders", data);
    yield data.products.forEach((productItem) => {
      axios.delete(
        `https://book-store-fe19-api.herokuapp.com/carts/${productItem.cartId}`
      );
    });

    yield callback.success();
    yield put({
      type: SUCCESS(ORDER_ACTION.ORDER_CART),
      payload: {
        cartIds: data.products.map((productItem) => productItem.cartId),
      },
    });
  } catch (e) {
    yield put({
      type: FAIL(ORDER_ACTION.ORDER_CART),
      payload: { error: e.message },
    });
  }
}

export default function* orderSaga() {
  yield takeEvery(REQUEST(ORDER_ACTION.GET_ORDER_LIST), getOrderListSaga);
  yield takeEvery(REQUEST(ORDER_ACTION.ORDER_CART), orderCartSaga);
}
