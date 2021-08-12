import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import AppContext from "../Context/AppContext";
const ClientRoutes = ({ component: Component, ...rest }) => {
  const appcontext = useContext(AppContext);
  return (
    <Route
      {...rest}
      render={props =>
        !appcontext.isAuthenticated ||
        (appcontext.user && appcontext.user.admin) ? (
          <Redirect to='/login' />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

export default ClientRoutes;
//cejc