import React from "react";
import { Route, Redirect } from "react-router-dom";

import UserSidebar from "../UserSidebar";
import UserHeader from "../UserHeader";
import Footer from "../Footer";

import { ROUTER } from "../../constants/router";

import * as S from "./styles";

const PrivateRoute = ({ component: Component, ...props }) => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  if (!userInfo) {
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
