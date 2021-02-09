import * as React from 'react';
import { Component } from 'react';
import { useSelector } from 'react-redux';
import { RouteProps, Route, Redirect } from 'react-router-dom';
import { RootState } from 'store/rootReducer';

const PublicRoute: React.FC<
  RouteProps & { component: React.ElementType; restricted: boolean }
> = ({ component: Component, restricted, ...rest }) => {
  // restricted = false meaning public route
  // restricted = true meaning restricted route

  const { user } = useSelector((state: RootState) => state.auth);

  return (
    <Route
      {...rest}
      render={props =>
        user && restricted ? (
          <Redirect
            to={{ pathname: '/dashboard', state: { from: props.location } }}
          />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

export default PublicRoute;
