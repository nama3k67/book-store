import React from "react";
import { Route } from "react-router-dom";

import UserHeader from "../UserHeader";
import UserSidebar from "../UserSidebar";
import Footer from "../Footer";

import * as S from "./styles";

const PublicRoute = ({ component: Component, ...props }) => {
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

export default PublicRoute;
