import { createReducer } from "@reduxjs/toolkit";
import { TICKET_ACTION, REQUEST, SUCCESS, FAIL } from "../constants";

const initialState = {
  ticketList: {
    data: [],
    loading: false,
    error: null,
  },
};

const ticketReducer = createReducer(initialState, {
  [REQUEST(TICKET_ACTION.GET_TICKET_LIST)]: (state, action) => {
    return {
      ...state,
      ticketList: {
        ...state.ticketList,
        loading: true,
      },
    };
  },
  [SUCCESS(TICKET_ACTION.GET_TICKET_LIST)]: (state, action) => {
    const { data } = action.payload;
    return {
      ...state,
      ticketList: {
        ...state.ticketList,
        data,
        loading: false,
        error: null,
      },
    };
  },
  [FAIL(TICKET_ACTION.GET_TICKET_LIST)]: (state, action) => {
    const { error } = action.payload;
    return {
      ...state,
      ticketList: {
        ...state.ticketList,
        loading: false,
        error,
      },
    };
  },
});

export default ticketReducer;
