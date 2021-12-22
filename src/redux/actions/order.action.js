import { createAction } from "@reduxjs/toolkit";
import { ORDER_ACTION, REQUEST } from "../constants";

export const getOrderListAction = createAction(
  REQUEST(ORDER_ACTION.GET_ORDER_LIST)
);
export const orderCartAction = createAction(REQUEST(ORDER_ACTION.ORDER_CART));
export const setOrderInfoAction = createAction(
  REQUEST(ORDER_ACTION.SET_ORDER_INFO)
);
