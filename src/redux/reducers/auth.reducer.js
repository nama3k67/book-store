import { createReducer } from "@reduxjs/toolkit";
import { AUTH_ACTION, REQUEST, FAIL, SUCCESS } from "../constants";

const initialState = {
  userInfo: {
    data: {},
    loading: false,
  },
  responseAction: {
    login: {
      loading: false,
      error: "",
    },
    register: {
      loading: false,
      error: "",
    },
  },
};

const authReducer = createReducer(initialState, {
  [SUCCESS(AUTH_ACTION.GET_USER_INFO)]: (state, action) => {
    const { data } = action.payload;
    return {
      ...state,
      userInfo: {
        ...state.userInfo,
        data,
      },
    };
  },

  [REQUEST(AUTH_ACTION.UPDATE_USER_INFO)]: (state, action) => {
    return {
      ...state,
      userInfo: {
        ...state.userInfo,
        loading: true,
      },
    };
  },
  [SUCCESS(AUTH_ACTION.UPDATE_USER_INFO)]: (state, action) => {
    const { data } = action.payload;
    return {
      ...state,
      userInfo: {
        data,
        loading: false,
      },
    };
  },
  [FAIL(AUTH_ACTION.UPDATE_USER_INFO)]: (state, action) => {
    return {
      ...state,
      userInfo: {
        ...state.userInfo,
        loading: false,
      },
    };
  },

  [REQUEST(AUTH_ACTION.CHANGE_PASSWORD)]: (state, action) => {
    return {
      ...state,
      userInfo: {
        ...state.userInfo,
        loading: true,
      },
    };
  },
  [SUCCESS(AUTH_ACTION.CHANGE_PASSWORD)]: (state, action) => {
    const { data } = action.payload;
    return {
      ...state,
      userInfo: {
        data,
        loading: false,
      },
    };
  },
  [FAIL(AUTH_ACTION.CHANGE_PASSWORD)]: (state, action) => {
    return {
      ...state,
      userInfo: {
        ...state.userInfo,
        loading: false,
      },
    };
  },

  [REQUEST(AUTH_ACTION.ADD_TO_WISHLIST)]: (state, action) => {
    return {
      ...state,
      userInfo: {
        ...state.userInfo,
        loading: true,
      },
    };
  },
  [SUCCESS(AUTH_ACTION.ADD_TO_WISHLIST)]: (state, action) => {
    const { data } = action.payload;
    return {
      ...state,
      userInfo: {
        data,
        loading: false,
      },
    };
  },
  [FAIL(AUTH_ACTION.ADD_TO_WISHLIST)]: (state, action) => {
    return {
      ...state,
      userInfo: {
        ...state.userInfo,
        loading: false,
      },
    };
  },

  [REQUEST(AUTH_ACTION.DELETE_WISHLIST)]: (state, action) => {
    return {
      ...state,
      userInfo: {
        ...state.userInfo,
        loading: true,
      },
    };
  },
  [SUCCESS(AUTH_ACTION.DELETE_WISHLIST)]: (state, action) => {
    const { data } = action.payload;
    return {
      ...state,
      userInfo: {
        data,
        loading: false,
      },
    };
  },
  [FAIL(AUTH_ACTION.DELETE_WISHLIST)]: (state, action) => {
    return {
      ...state,
      userInfo: {
        ...state.userInfo,
        loading: false,
      },
    };
  },

  [REQUEST(AUTH_ACTION.LOGIN)]: (state, action) => {
    return {
      ...state,
      responseAction: {
        ...state.responseAction,
        login: {
          ...state.responseAction.login,
          loading: true,
        },
      },
    };
  },
  [SUCCESS(AUTH_ACTION.LOGIN)]: (state, action) => {
    const { data } = action.payload;
    return {
      ...state,
      userInfo: {
        ...state.userInfo,
        data,
      },
      responseAction: {
        ...state.responseAction,
        login: {
          loading: false,
          error: "",
        },
      },
    };
  },
  [FAIL(AUTH_ACTION.LOGIN)]: (state, action) => {
    const { error } = action.payload;
    return {
      ...state,
      responseAction: {
        ...state.responseAction,
        login: {
          loading: false,
          error,
        },
      },
    };
  },

  [REQUEST(AUTH_ACTION.REGISTER)]: (state, action) => {
    return {
      state,
      responseAction: {
        ...state.responseAction,
        register: {
          ...state.responseAction.register,
          loading: true,
        },
      },
    };
  },
  [SUCCESS(AUTH_ACTION.REGISTER)]: (state, action) => {
    return {
      ...state,
      responseAction: {
        ...state.responseAction,
        register: {
          loading: false,
          error: "",
        },
      },
    };
  },
  [FAIL(AUTH_ACTION.REGISTER)]: (state, action) => {
    const { error } = action.payload;
    return {
      ...state,
      responseAction: {
        ...state.responseAction,
        register: {
          loading: false,
          error,
        },
      },
    };
  },

  [REQUEST(AUTH_ACTION.LOGOUT)]: (state, action) => {
    return {
      ...state,
      userInfo: {
        data: {},
        loading: false,
      },
    };
  },
});

export default authReducer;
