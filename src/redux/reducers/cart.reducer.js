import { createReducer } from "@reduxjs/toolkit";
import {
  CART_ACTION,
  ORDER_ACTION,
  AUTH_ACTION,
  REQUEST,
  SUCCESS,
  FAIL,
} from "../constants";

const initialState = {
  cartList: {
    data: [],
    loading: false,
    error: null,
  },
  cartInfo: {
    selectedCarts: [],
    tickets: [],
  },
  actionLoading: {
    addToCart: false,
    updateCartProduct: false,
    removeCartProduct: false,
  },
};

const cartReducer = createReducer(initialState, {
  [REQUEST(CART_ACTION.GET_CART_LIST)]: (state, action) => {
    return {
      ...state,
      cartList: {
        ...state.cartList,
        loading: true,
      },
    };
  },
  [SUCCESS(CART_ACTION.GET_CART_LIST)]: (state, action) => {
    const { data } = action.payload;
    return {
      ...state,
      cartList: {
        ...state.cartList,
        data,
        loading: false,
        error: null,
      },
    };
  },
  [FAIL(CART_ACTION.GET_CART_LIST)]: (state, action) => {
    const { error } = action.payload;
    return {
      ...state,
      cartList: {
        ...state.cartList,
        loading: false,
        error,
      },
    };
  },

  [REQUEST(CART_ACTION.ADD_TO_CART)]: (state, action) => {
    return {
      ...state,
      actionLoading: {
        ...state.actionLoading,
        addToCart: true,
      },
    };
  },
  [SUCCESS(CART_ACTION.ADD_TO_CART)]: (state, action) => {
    return {
      ...state,
      actionLoading: {
        ...state.actionLoading,
        addToCart: false,
      },
    };
  },
  [FAIL(CART_ACTION.ADD_TO_CART)]: (state, action) => {
    return {
      ...state,
      actionLoading: {
        ...state.actionLoading,
        addToCart: false,
      },
    };
  },

  [REQUEST(CART_ACTION.UPDATE_CART_PRODUCT)]: (state, action) => {
    return {
      ...state,
      actionLoading: {
        ...state.actionLoading,
        updateCartProduct: true,
      },
    };
  },
  [SUCCESS(CART_ACTION.UPDATE_CART_PRODUCT)]: (state, action) => {
    const { data } = action.payload;
    const newCartList = [...state.cartList.data];
    const productIndex = newCartList.findIndex(
      (product) => product.id === data.id
    );
    newCartList.splice(productIndex, 1, {
      ...state.cartList.data[productIndex],
      quantity: data.quantity,
    });
    const newSelectedCarts = [...state.cartInfo.selectedCarts];
    if (newSelectedCarts.length > 0) {
      const cartIndex = newSelectedCarts.findIndex(
        (cartItem) => cartItem.id === data.id
      );
      newSelectedCarts.splice(cartIndex, 1, {
        ...state.cartInfo.selectedCarts[cartIndex],
        quantity: data.quantity,
      });
    }

    return {
      ...state,
      cartList: {
        ...state.cartList,
        data: newCartList,
      },
      cartInfo: {
        ...state.cartInfo,
        selectedCarts: newSelectedCarts,
      },
      actionLoading: {
        ...state.actionLoading,
        updateCartProduct: false,
      },
    };
  },
  [FAIL(CART_ACTION.UPDATE_CART_PRODUCT)]: (state, action) => {
    return {
      ...state,
      actionLoading: {
        ...state.actionLoading,
        updateCartProduct: false,
      },
    };
  },

  [REQUEST(CART_ACTION.REMOVE_CART_PRODUCT)]: (state, action) => {
    return {
      ...state,
      actionLoading: {
        ...state.actionLoading,
        removeCartProduct: true,
      },
    };
  },
  [SUCCESS(CART_ACTION.REMOVE_CART_PRODUCT)]: (state, action) => {
    const { id } = action.payload;
    const newCartList = [...state.cartList.data];
    const productIndex = newCartList.findIndex((product) => product.id === id);
    newCartList.splice(productIndex, 1);
    const newSelectedCarts = [...state.cartInfo.selectedCarts];
    const cartIndex = newSelectedCarts.findIndex(
      (cartItem) => cartItem.id === id
    );
    newSelectedCarts.splice(cartIndex, 1);
    return {
      ...state,
      cartList: {
        ...state.cartList,
        data: newCartList,
      },
      actionLoading: {
        ...state.actionLoading,
        removeCartProduct: false,
      },
    };
  },
  [FAIL(CART_ACTION.REMOVE_CART_PRODUCT)]: (state, action) => {
    return {
      ...state,
      actionLoading: {
        ...state.actionLoading,
        removeCartProduct: false,
      },
    };
  },

  [REQUEST(CART_ACTION.SET_CART_INFO)]: (state, action) => {
    const { selectedCarts, tickets } = action.payload;

    return {
      ...state,
      cartInfo: {
        ...state.cartInfo,
        ...(selectedCarts && { selectedCarts }),
        ...(tickets && { tickets }),
      },
    };
  },

  [SUCCESS(ORDER_ACTION.ORDER_CART)]: (state, action) => {
    const { cartIds } = action.payload;
    const newCartList = state.cartList.data.filter(
      (cartItem) => !cartIds.includes(cartItem.id)
    );
    return {
      ...state,
      cartList: {
        ...state.cartList,
        data: newCartList,
      },
      cartInfo: {
        selectedCarts: [],
        tickets: [],
      },
    };
  },

  [REQUEST(AUTH_ACTION.LOGOUT)]: (state, action) => {
    return {
      ...state,
      cartList: {
        data: [],
        loading: false,
        error: null,
      },
      cartInfo: {
        selectedCarts: [],
        tickets: [],
      },
    };
  },
});

export default cartReducer;
