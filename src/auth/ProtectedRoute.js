import React, { useContext, useEffect } from "react";
import { Redirect, Route } from "react-router-dom";
import { AuthContext } from "../state/AuthContext";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { authData } = useContext(AuthContext);

  useEffect(() => {}, [authData]);
  return (
    <Route
      {...rest}
      render={props =>
        authData.isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
};

export default ProtectedRoute;
