import { put, takeEvery } from "redux-saga/effects";
import { notification } from "antd";
import axios from "axios";

import { AUTH_ACTION, REQUEST, SUCCESS, FAIL } from "../constants";

function* loginSaga(action) {
  try {
    const { data, callback } = action.payload;
    const result = yield axios.post(
      "https://book-store-fe19-api.herokuapp.com/login",
      data
    );

    yield localStorage.setItem(
      "userInfo",
      JSON.stringify({
        accessToken: result.data.accessToken,
        role: result.data.user.role,
      })
    );

    yield put({
      type: SUCCESS(AUTH_ACTION.LOGIN),
      payload: {
        data: result.data.user,
      },
    });

    //TODO: Create callback redirect rely on role
    if (result.data.user.role === "admin") {
      yield callback.redirectDashboard();
    } else {
      yield notification.success({ message: "Đăng nhập thành công" });
      yield callback.redirectHome();
    }
  } catch (e) {
    yield put({
      type: FAIL(AUTH_ACTION.LOGIN),
      payload: { error: e.response.data },
    });
  }
}

function* registerSaga(action) {
  try {
    const { data, callback } = action.payload;
    yield axios.post(
      "https://book-store-fe19-api.herokuapp.com/register",
      data
    );

    yield put({
      type: SUCCESS(AUTH_ACTION.REGISTER),
    });
    yield callback.goBackLogin();
    yield notification.success({ message: "Đăng ký thành công" });
  } catch (e) {
    yield put({
      type: FAIL(AUTH_ACTION.REGISTER),
      payload: {
        error:
          e.response.data === "Email already exists"
            ? e.response.data
            : "Register failed!",
      },
    });
  }
}

function* getUserInfoSaga(action) {
  try {
    const { id } = action.payload;
    const result = yield axios.get(
      `https://book-store-fe19-api.herokuapp.com/users/${id}`
    );
    yield put({
      type: SUCCESS(AUTH_ACTION.GET_USER_INFO),
      payload: {
        data: result.data,
      },
    });
  } catch (e) {
    yield put({
      type: FAIL(AUTH_ACTION.GET_USER_INFO),
      payload: {
        error: e.message,
      },
    });
  }
}

function* updateUserInfoSaga(action) {
  try {
    const { id, data } = action.payload;
    const result = yield axios.patch(
      `https://book-store-fe19-api.herokuapp.com/users/${id}`,
      data
    );
    yield put({
      type: SUCCESS(AUTH_ACTION.UPDATE_USER_INFO),
      payload: {
        data: result.data,
      },
    });
    yield notification.success({ message: "Thay đổi thông tin thành công!" });
  } catch (e) {
    yield put({
      type: FAIL(AUTH_ACTION.UPDATE_USER_INFO),
      payload: e.message,
    });
    notification.warning({
      message: "Thay đổi thông tin không thành công!",
    });
  }
}

function* changePasswordSaga(action) {
  try {
    const { id, data, callback } = action.payload;

    yield axios.post("https://book-store-fe19-api.herokuapp.com/login", {
      email: data.email,
      password: data.oldPassword,
    });
    const result = yield axios.patch(
      `https://book-store-fe19-api.herokuapp.com/users/${id}`,
      {
        password: data.newPassword,
      }
    );

    yield callback.clearForm();
    yield put({
      type: SUCCESS(AUTH_ACTION.CHANGE_PASSWORD),
      payload: {
        data: result.data,
      },
    });
    yield notification.success({ message: "Đổi mật khẩu thành công!" });
  } catch (e) {
    yield put({
      type: FAIL(AUTH_ACTION.CHANGE_PASSWORD),
      payload: e.message,
    });
    notification.warning({
      message: "Đổi mật khẩu không thành công!",
    });
  }
}

function* addToWishlistSaga(action) {
  try {
    const { id, data } = action.payload;
    const result = yield axios.patch(
      `https://book-store-fe19-api.herokuapp.com/users/${id}`,
      data
    );
    yield put({
      type: SUCCESS(AUTH_ACTION.ADD_TO_WISHLIST),
      payload: { data: result.data },
    });
  } catch (e) {
    yield put({
      type: FAIL(AUTH_ACTION.ADD_TO_WISHLIST),
      payload: e.message,
    });
  }
}

function* deleteWishlistSaga(action) {
  try {
    const { id, data } = action.payload;
    const result = yield axios.patch(
      `https://book-store-fe19-api.herokuapp.com/users/${id}`,
      data
    );
    yield put({
      type: SUCCESS(AUTH_ACTION.DELETE_WISHLIST),
      payload: { data: result.data },
    });
  } catch (e) {
    yield put({
      type: FAIL(AUTH_ACTION.DELETE_WISHLIST),
      payload: e.message,
    });
  }
}

export default function* authSaga() {
  yield takeEvery(REQUEST(AUTH_ACTION.LOGIN), loginSaga);
  yield takeEvery(REQUEST(AUTH_ACTION.REGISTER), registerSaga);
  yield takeEvery(REQUEST(AUTH_ACTION.GET_USER_INFO), getUserInfoSaga);
  yield takeEvery(REQUEST(AUTH_ACTION.UPDATE_USER_INFO), updateUserInfoSaga);
  yield takeEvery(REQUEST(AUTH_ACTION.CHANGE_PASSWORD), changePasswordSaga);
  yield takeEvery(REQUEST(AUTH_ACTION.ADD_TO_WISHLIST), addToWishlistSaga);
  yield takeEvery(REQUEST(AUTH_ACTION.DELETE_WISHLIST), deleteWishlistSaga);
}
