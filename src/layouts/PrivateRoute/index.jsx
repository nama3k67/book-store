import React, { useEffect } from "react";
import { Route, Redirect } from "react-router-dom";

import UserSidebar from "../UserSidebar";
import UserHeader from "../UserHeader";
import Footer from "../Footer";

import { ROUTER } from "../../constants/router";

import * as S from "./styles";

const PrivateRoute = ({ component: Component, ...props }) => {
  // const { userInfo } = useSelector((state) => state.authReducer);
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  if (!userInfo) {
    return <Redirect to={ROUTER.USER.HOME} />;
  }

  // useEffect(() => {
  //   if (!userInfo.loading) {
  //     console.log("adasdas");
  //     if (
  //       userInfo.data &&
  //       Object.keys(userInfo.data).length === 0 &&
  //       Object.getPrototypeOf(userInfo.data) === Object.prototype
  //     ) {
  //       console.log("aaaaaaaa");
  //       return <Redirect to={ROUTER.USER.HOME} />;
  //     }
  //   }
  // }, []);

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
