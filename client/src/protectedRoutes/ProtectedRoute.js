import React from "react";
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        const loggedInUser =
          localStorage.getItem("loggedInUser") &&
          localStorage.getItem("loggedInUser") !== ""
            ? JSON.parse(localStorage.getItem("loggedInUser"))
            : {};
        if (
          loggedInUser &&
          loggedInUser.data &&
          loggedInUser.data.user &&
          Object.keys(loggedInUser.data.user).length !== 0 &&
          loggedInUser.data.user.constructor === Object
        ) {
          return <Component />;
        } else {
          return (
            <Redirect to={{ pathname: "/", state: { from: props.location } }} />
          );
        }
      }}
    />
  );
};

export default ProtectedRoute;
