import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";

import {
  authReducer,
  categoryReducer,
  productReducer,
  commentReducer,
  commonReducer,
  cartReducer,
  ticketReducer,
  orderReducer,
  authorReducer,
  publisherReducer,
  coverReducer,
  blogReducer,
} from "./redux/reducers";
import rootSaga from "./redux/sagas";

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    authReducer,
    categoryReducer,
    productReducer,
    commentReducer,
    commonReducer,
    cartReducer,
    ticketReducer,
    orderReducer,
    authorReducer,
    publisherReducer,
    coverReducer,
    blogReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);
