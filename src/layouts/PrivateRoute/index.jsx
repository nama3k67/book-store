import React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";

import UserSidebar from "../UserSidebar";
import UserHeader from "../UserHeader";
import Footer from "../Footer";

import { ROUTER } from "../../constants/router";

import * as S from "./styles";

const PrivateRoute = ({ component: Component, ...props }) => {
  const { userInfo } = useSelector((state) => state.authReducer);

  if (
    userInfo.data &&
    Object.keys(userInfo.data).length === 0 &&
    Object.getPrototypeOf(userInfo.data) === Object.prototype
  ) {
    return <Redirect to={ROUTER.USER.HOME} />;
  }
  return (
    <Route
      {...props}
      render={(routeProps) => (
        <>
          <UserHeader />
          <UserSidebar />
          <S.MainContainer>
            <Component {...routeProps} />
          </S.MainContainer>
          <Footer />
        </>
      )}
    />
  );
};

export default PrivateRoute;
