import React, { useEffect } from "react";
import { Switch, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import jwtDecode from "jwt-decode";
import { BackTop } from "antd";
import "moment/locale/vi";

import PublicRoute from "./layouts/PublicRoute";
import PrivateRoute from "./layouts/PrivateRoute";
import LoginRoute from "./layouts/LoginRoute";

import LoginAndRegisterPage from "./pages/LoginAndRegister";
import HomePage from "./pages/user/Home";
import ProductListPage from "./pages/user/ProductList";
import ProductDetailPage from "./pages/user/ProductDetail";
import CartPage from "./pages/user/Cart";
import ContactPage from "./pages/user/Contact";
import AboutUsPage from "./pages/user/AboutUs";
import CheckoutPage from "./pages/user/Checkout";
import ProfilePage from "./pages/user/Profile";

import "antd/dist/antd.css";
import "react-image-lightbox/style.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "antd/dist/antd.less";
import "./App.css";

import { ROUTER } from "./constants/router";
import { getUserInfoAction, getCartListAction } from "./redux/actions";

function App() {
  const location = useLocation();

  const { userInfo } = useSelector((state) => state.authReducer);

  const dispatch = useDispatch();

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (userInfo) {
      const decodedUserData = jwtDecode(userInfo.accessToken);
      dispatch(getUserInfoAction({ id: decodedUserData.sub }));
    }
  }, []);

  useEffect(() => {
    if (userInfo?.data.id) {
      dispatch(getCartListAction({ userId: userInfo.data.id }));
    }
  }, [userInfo]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <>
      <Switch>
        <PublicRoute exact path={ROUTER.USER.HOME} component={HomePage} />
        <PublicRoute
          exact
          path={ROUTER.USER.PRODUCTS_LIST}
          component={ProductListPage}
        />
        <PublicRoute
          exact
          path={ROUTER.USER.PRODUCTS_LIST_DOMESTIC}
          component={ProductListPage}
        />
        <PublicRoute
          exact
          path={ROUTER.USER.PRODUCTS_LIST_FOREIGN}
          component={ProductListPage}
        />
        <PublicRoute
          exact
          path={ROUTER.USER.PRODUCTS_LIST_BESTSELLER}
          component={ProductListPage}
        />
        <PublicRoute exact path={ROUTER.USER.CONTACT} component={ContactPage} />
        <PublicRoute
          exact
          path={ROUTER.USER.ABOUT_US}
          component={AboutUsPage}
        />
        <PublicRoute
          exact
          path={ROUTER.USER.PRODUCT_DETAIL}
          component={ProductDetailPage}
        />
        <PrivateRoute exact path={ROUTER.USER.CART} component={CartPage} />
        <PrivateRoute
          exact
          path={ROUTER.USER.CHECKOUT}
          component={CheckoutPage}
        />
        <PrivateRoute
          exact
          path={ROUTER.USER.PROFILE}
          component={ProfilePage}
        />
        <LoginRoute
          exact
          path={ROUTER.LOGIN}
          component={LoginAndRegisterPage}
        />
      </Switch>
      <BackTop />
    </>
  );
}

export default App;
