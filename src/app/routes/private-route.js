import React from 'react'
import { Route, Redirect } from 'react-router-dom'

import Auth from './auth';
import { store } from '../stores/store';

export const PrivateRoute = ({ component: Component, ...rest }) => {
  const token = store.getState().userReducer.userToken || localStorage.getItem("token");
  const Authentication = new Auth(token);
  return (
    <Route
      {...rest}
      render={props => {
        // Check if it is authenticated if not it will redirect to landing page
        if (Authentication.isAuthenticated()) {
          return <Component {...props} />;
        } else {
          return (
            <Redirect
              to={{
                pathname: "/"
              }}
            />
          );
        }
      }}
    />
  );
};

export default PrivateRoute;
