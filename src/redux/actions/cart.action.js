import { createAction } from "@reduxjs/toolkit";
import { CART_ACTION, REQUEST } from "../constants";

export const getCartListAction = createAction(
  REQUEST(CART_ACTION.GET_CART_LIST)
);
export const addToCardAction = createAction(REQUEST(CART_ACTION.ADD_TO_CART));
export const removeCardProductAction = createAction(
  REQUEST(CART_ACTION.REMOVE_CART_PRODUCT)
);
export const updateCartProductAction = createAction(
  REQUEST(CART_ACTION.UPDATE_CART_PRODUCT)
);
export const setCartInfo = createAction(REQUEST(CART_ACTION.SET_CART_INFO));
