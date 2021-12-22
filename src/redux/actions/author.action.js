import { createAction } from "@reduxjs/toolkit";
import { AUTHOR_ACTION, REQUEST } from "../constants";

export const getAuthorListAction = createAction(
  REQUEST(AUTHOR_ACTION.GET_AUTHOR_LIST)
);
