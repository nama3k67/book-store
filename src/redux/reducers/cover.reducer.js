import { createReducer } from "@reduxjs/toolkit";
import { COVER_ACTION, REQUEST, SUCCESS, FAIL } from "../constants";

const initialState = {
  coverList: {
    data: [],
    loading: false,
    error: null,
  },
};

const coverReducer = createReducer(initialState, {
  [REQUEST(COVER_ACTION.GET_COVER_LIST)]: (state, action) => {
    return {
      ...state,
      coverList: {
        ...state.coverList,
        loading: true,
      },
    };
  },
  [SUCCESS(COVER_ACTION.GET_COVER_LIST)]: (state, action) => {
    const { data } = action.payload;
    return {
      ...state,
      coverList: {
        ...state.coverList,
        data,
        loading: false,
        error: null,
      },
    };
  },
  [FAIL(COVER_ACTION.GET_COVER_LIST)]: (state, action) => {
    const { error } = action.payload;
    return {
      ...state,
      coverList: {
        ...state.coverList,
        loading: false,
        error,
      },
    };
  },
});

export default coverReducer;
