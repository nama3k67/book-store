import { createReducer } from "@reduxjs/toolkit";
import { AUTHOR_ACTION, REQUEST, SUCCESS, FAIL } from "../constants";

const initialState = {
  authorList: {
    data: [],
    loading: false,
    error: null,
  },
};

const authorReducer = createReducer(initialState, {
  [REQUEST(AUTHOR_ACTION.GET_AUTHOR_LIST)]: (state, action) => {
    return {
      ...state,
      authorList: {
        ...state.authorList,
        loading: true,
      },
    };
  },
  [SUCCESS(AUTHOR_ACTION.GET_AUTHOR_LIST)]: (state, action) => {
    const { data } = action.payload;
    return {
      ...state,
      authorList: {
        ...state.authorList,
        data,
        loading: false,
        error: null,
      },
    };
  },
  [FAIL(AUTHOR_ACTION.GET_AUTHOR_LIST)]: (state, action) => {
    const { error } = action.payload;
    return {
      ...state,
      authorList: {
        ...state.authorList,
        loading: false,
        error,
      },
    };
  },
});

export default authorReducer;
