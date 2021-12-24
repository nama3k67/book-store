import { createAction } from "@reduxjs/toolkit";
import { REQUEST, BLOG_ACTION } from "../constants";

export const getBlogListAction = createAction(
  REQUEST(BLOG_ACTION.GET_BLOG_LIST)
);
export const getFeatureBlogListAction = createAction(
  REQUEST(BLOG_ACTION.GET_FEATURE_BLOG_LIST)
);
export const getBlogDetail = createAction(REQUEST(BLOG_ACTION.GET_BLOG_DETAIL));
