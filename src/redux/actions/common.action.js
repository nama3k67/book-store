import { createAction } from "@reduxjs/toolkit";
import { COMMON_ACTION } from "../constants";

export const toggleSidebarAction = createAction(COMMON_ACTION.TOGGLE_SIDEBAR);
export const setThemeAction = createAction(COMMON_ACTION.SET_THEME);
