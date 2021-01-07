import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import AppContext from "../Context/AppContext";
const BothRoutes = ({ component: Component, ...rest }) => {
  const appcontext = useContext(AppContext);
  return (
    <Route
      {...rest}
      render={props =>
        !appcontext.isAuthenticated || !appcontext.user ? (
          <Redirect to='/admin' />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

export default BothRoutes;
