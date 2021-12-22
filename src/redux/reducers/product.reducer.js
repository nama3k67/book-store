import { createReducer } from "@reduxjs/toolkit";
import { PRODUCT_ACTION, REQUEST, SUCCESS, FAIL } from "../constants";

const initialState = {
  productList: {
    data: [],
    meta: {},
    loading: false,
    error: null,
  },
  productDetail: {
    data: {},
    loading: false,
    error: null,
  },
};

const productReducer = createReducer(initialState, {
  [REQUEST(PRODUCT_ACTION.GET_PRODUCT_LIST)]: (state, action) => {
    return {
      ...state,
      productList: {
        ...state.productList,
        loading: true,
      },
    };
  },
  [SUCCESS(PRODUCT_ACTION.GET_PRODUCT_LIST)]: (state, action) => {
    const { data, meta, bestseller, more } = action.payload;

    const newData = data.map((item) => {
      const total = item.comments.reduce((total, item) => total + item.rate, 0);
      const rating =
        item.comments.length === 0 ? 0 : total / item.comments.length;

      return { ...item, rating };
    });

    if (bestseller) {
      newData.sort(function (a, b) {
        return b.rating - a.rating;
      });
    }
    if (more) {
      const newProductList = [...state.productList.data, ...newData];
      if (bestseller) {
        newProductList.sort(function (a, b) {
          return b.rating - a.rating;
        });
      }
      return {
        ...state,
        productList: {
          ...state.productList,
          data: newProductList,
          meta,
          loading: false,
          error: null,
        },
      };
    }
    return {
      ...state,
      productList: {
        ...state.productList,
        data: newData,
        meta,
        loading: false,
        error: null,
      },
    };
  },
  [FAIL(PRODUCT_ACTION.GET_PRODUCT_LIST)]: (state, action) => {
    const { error } = action.payload;
    return {
      ...state,
      productList: {
        ...state.productList,
        loading: false,
        error,
      },
    };
  },

  [REQUEST(PRODUCT_ACTION.GET_PRODUCT_DETAIL)]: (state, action) => {
    return {
      ...state,
      productDetail: {
        ...state.productDetail,
        data: {},
        loading: true,
      },
    };
  },
  [SUCCESS(PRODUCT_ACTION.GET_PRODUCT_DETAIL)]: (state, action) => {
    const { data } = action.payload;
    return {
      ...state,
      productDetail: {
        ...state.productDetail,
        data,
        loading: false,
        error: null,
      },
    };
  },
  [FAIL(PRODUCT_ACTION.GET_PRODUCT_DETAIL)]: (state, action) => {
    const { error } = action.payload;
    return {
      ...state,
      productDetail: {
        ...state.productDetail,
        loading: false,
        error,
      },
    };
  },
});

export default productReducer;
