import React from "react";
import { Route } from "react-router-dom";

const LoginRoute = ({ component: Component, ...props }) => {
  return (
    <Route
      {...props}
      render={(routeProps) => (
        <>
          <Component {...routeProps} />
        </>
      )}
    />
  );
};

export default LoginRoute;
