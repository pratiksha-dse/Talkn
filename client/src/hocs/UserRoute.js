import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";

const PrivateRoute = ({ component: Component, roles, ...rest }) => {
  const { isAuthenticated, isAdmin } = useContext(AuthContext);
  return (
    <Route
      {...rest}
      render={(props) => {
        if (!isAuthenticated || isAdmin)
          return (
            <Redirect to={{ pathname: "/", state: { from: props.location } }} />
          );

        // if(!roles.includes(user.role))
        //     return <Redirect to={{ pathname: '/',
        //                      state : {from : props.location}}}/>
        return <Component {...props} />;
      }}
    />
  );
};

export default PrivateRoute;
