import { createAction } from "@reduxjs/toolkit";
import { PUBLISHER_ACTION, REQUEST } from "../constants";

export const getPublisherListAction = createAction(
  REQUEST(PUBLISHER_ACTION.GET_PUBLISHER_LIST)
);
