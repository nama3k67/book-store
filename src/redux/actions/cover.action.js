import { createAction } from "@reduxjs/toolkit";
import { COVER_ACTION, REQUEST } from "../constants";

export const getCoverListAction = createAction(
  REQUEST(COVER_ACTION.GET_COVER_LIST)
);
