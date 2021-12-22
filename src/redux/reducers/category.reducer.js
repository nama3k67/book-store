import { createReducer } from "@reduxjs/toolkit";
import { CATEGORY_ACTION, REQUEST, SUCCESS, FAIL } from "../constants";

const initialState = {
  categoryList: {
    data: [],
    loading: false,
    error: null,
  },
};

const categoryReducer = createReducer(initialState, {
  [REQUEST(CATEGORY_ACTION.GET_CATEGORY_LIST)]: (state, action) => {
    return {
      ...state,
      categoryList: {
        ...state.categoryList,
        loading: true,
      },
    };
  },
  [SUCCESS(CATEGORY_ACTION.GET_CATEGORY_LIST)]: (state, action) => {
    const { data } = action.payload;
    return {
      ...state,
      categoryList: {
        ...state.categoryList,
        data,
        loading: false,
        error: null,
      },
    };
  },
  [FAIL(CATEGORY_ACTION.GET_CATEGORY_LIST)]: (state, action) => {
    const { error } = action.payload;
    return {
      ...state,
      categoryList: {
        ...state.categoryList,
        loading: false,
        error,
      },
    };
  },
});

export default categoryReducer;
