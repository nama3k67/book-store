import { createReducer } from "@reduxjs/toolkit";
import { BLOG_ACTION, REQUEST, SUCCESS, FAIL } from "../constants";

const initialState = {
  blogList: {
    data: [],
    meta: {},
    loading: false,
    error: null,
  },
  featureBlogList: {
    data: [],
    loading: false,
    error: null,
  },
  blogDetail: {
    data: {},
    loading: false,
    error: null,
  },
};

const blogReducer = createReducer(initialState, {
  [REQUEST(BLOG_ACTION.GET_BLOG_LIST)]: (state, action) => {
    return {
      ...state,
      blogList: {
        ...state.blogList,
        loading: true,
      },
    };
  },
  [SUCCESS(BLOG_ACTION.GET_BLOG_LIST)]: (state, action) => {
    const { data, meta } = action.payload;
    return {
      ...state,
      blogList: {
        ...state.blogList,
        data,
        meta,
        loading: false,
        error: null,
      },
    };
  },
  [FAIL(BLOG_ACTION.GET_BLOG_LIST)]: (state, action) => {
    const { error } = action.payload;
    return {
      ...state,
      blogList: {
        ...state.blogList,
        loading: false,
        error,
      },
    };
  },

  [REQUEST(BLOG_ACTION.GET_FEATURE_BLOG_LIST)]: (state, action) => {
    return {
      ...state,
      featureBlogList: {
        ...state.featureBlogList,
        loading: true,
      },
    };
  },
  [SUCCESS(BLOG_ACTION.GET_FEATURE_BLOG_LIST)]: (state, action) => {
    const { data } = action.payload;
    return {
      ...state,
      featureBlogList: {
        ...state.featureBlogList,
        data,
        loading: false,
        error: null,
      },
    };
  },
  [FAIL(BLOG_ACTION.GET_FEATURE_BLOG_LIST)]: (state, action) => {
    const { error } = action.payload;
    return {
      ...state,
      featureBlogList: {
        ...state.featureBlogList,
        loading: false,
        error,
      },
    };
  },

  [REQUEST(BLOG_ACTION.GET_BLOG_DETAIL)]: (state, action) => {
    return {
      ...state,
      blogDetail: {
        ...state.blogDetail,
        loading: true,
      },
    };
  },
  [SUCCESS(BLOG_ACTION.GET_BLOG_DETAIL)]: (state, action) => {
    const { data } = action.payload;
    return {
      ...state,
      blogDetail: {
        ...state.blogDetail,
        data,
        loading: false,
        error: null,
      },
    };
  },
  [FAIL(BLOG_ACTION.GET_BLOG_DETAIL)]: (state, action) => {
    const { error } = action.payload;
    return {
      ...state,
      blogDetail: {
        ...state.blogDetail,
        loading: false,
        error,
      },
    };
  },
});

export default blogReducer;
