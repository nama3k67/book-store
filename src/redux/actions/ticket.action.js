import { createAction } from "@reduxjs/toolkit";
import { REQUEST, TICKET_ACTION } from "../constants";

export const getTicketListAction = createAction(
  REQUEST(TICKET_ACTION.GET_TICKET_LIST)
);
