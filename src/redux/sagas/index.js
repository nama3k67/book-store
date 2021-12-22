import { fork } from "redux-saga/effects";

import authSaga from "./auth.saga";
import categorySaga from "./category.saga";
import productSaga from "./product.saga";
import commentSaga from "./comment.saga";
import cartSaga from "./cart.saga";
import ticketSaga from "./ticket.saga";
import orderSaga from "./order.saga";
import authorSaga from "./author.saga";
import publisherSaga from "./publisher.saga";
import coverSaga from "./cover.saga";

export default function* rootSaga() {
  yield fork(authSaga);
  yield fork(categorySaga);
  yield fork(productSaga);
  yield fork(commentSaga);
  yield fork(cartSaga);
  yield fork(ticketSaga);
  yield fork(orderSaga);
  yield fork(authorSaga);
  yield fork(publisherSaga);
  yield fork(coverSaga);
}
