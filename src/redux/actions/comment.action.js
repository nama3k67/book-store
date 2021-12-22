import { createAction } from "@reduxjs/toolkit";
import { COMMENT_ACTION, REQUEST } from "../constants";

export const getCommentListAction = createAction(
  REQUEST(COMMENT_ACTION.GET_COMMENT_LIST)
);
export const postCommentAction = createAction(
  REQUEST(COMMENT_ACTION.POST_COMMENT)
);
