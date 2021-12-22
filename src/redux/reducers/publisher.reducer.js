import { createReducer } from "@reduxjs/toolkit";
import { PUBLISHER_ACTION, REQUEST, SUCCESS, FAIL } from "../constants";

const initialState = {
  publisherList: {
    data: [],
    loading: false,
    error: null,
  },
};

const publisherReducer = createReducer(initialState, {
  [REQUEST(PUBLISHER_ACTION.GET_PUBLISHER_LIST)]: (state, action) => {
    return {
      ...state,
      publisherList: {
        ...state.publisherList,
        loading: true,
      },
    };
  },
  [SUCCESS(PUBLISHER_ACTION.GET_PUBLISHER_LIST)]: (state, action) => {
    const { data } = action.payload;
    return {
      ...state,
      publisherList: {
        ...state.publisherList,
        data,
        loading: false,
        error: null,
      },
    };
  },
  [FAIL(PUBLISHER_ACTION.GET_PUBLISHER_LIST)]: (state, action) => {
    const { error } = action.payload;
    return {
      ...state,
      publisherList: {
        ...state.publisherList,
        loading: false,
        error,
      },
    };
  },
});

export default publisherReducer;
