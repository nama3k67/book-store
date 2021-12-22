import { createReducer } from "@reduxjs/toolkit";
import { COMMON_ACTION } from "../constants";

const initialState = {
  theme: "light",
  isShowSidebar: false,
};

const commonReducer = createReducer(initialState, {
  [COMMON_ACTION.SET_THEME]: (state, action) => {
    return {
      ...state,
      theme: action.payload,
    };
  },
  [COMMON_ACTION.TOGGLE_SIDEBAR]: (state, action) => {
    return {
      ...state,
      isShowSidebar: !state.isShowSidebar,
    };
  },
});

export default commonReducer;
