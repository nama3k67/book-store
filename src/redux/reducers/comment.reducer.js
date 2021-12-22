import { createReducer } from "@reduxjs/toolkit";
import { COMMENT_ACTION, REQUEST, SUCCESS, FAIL } from "../constants";

const initialState = {
  commentList: {
    data: [],
    loading: false,
    error: null,
  },
  actionLoading: {
    postComment: false,
  },
};

const commentReducer = createReducer(initialState, {
  [REQUEST(COMMENT_ACTION.GET_COMMENT_LIST)]: (state, action) => {
    return {
      ...state,
      commentList: {
        ...state.commentList,
        loading: true,
      },
    };
  },
  [SUCCESS(COMMENT_ACTION.GET_COMMENT_LIST)]: (state, action) => {
    const { data } = action.payload;
    return {
      ...state,
      commentList: {
        ...state.commentList,
        data,
        loading: false,
        error: null,
      },
    };
  },
  [FAIL(COMMENT_ACTION.GET_COMMENT_LIST)]: (state, action) => {
    const { error } = action.payload;
    return {
      ...state,
      commentList: {
        ...state.commentList,
        loading: false,
        error,
      },
    };
  },

  [REQUEST(COMMENT_ACTION.POST_COMMENT)]: (state, action) => {
    return {
      ...state,
      actionLoading: {
        ...state.actionLoading,
        postComment: true,
      },
    };
  },
  [SUCCESS(COMMENT_ACTION.POST_COMMENT)]: (state, action) => {
    return {
      ...state,
      actionLoading: {
        ...state.actionLoading,
        postComment: false,
      },
    };
  },
  [FAIL(COMMENT_ACTION.POST_COMMENT)]: (state, action) => {
    return {
      ...state,
      actionLoading: {
        ...state.actionLoading,
        postComment: false,
      },
    };
  },
});

export default commentReducer;
