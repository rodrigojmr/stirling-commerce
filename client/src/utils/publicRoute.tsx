import * as React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { RootState } from 'store/rootReducer';

const PublicRoute: React.FC<
  RouteProps & { component: React.ElementType; restricted: boolean }
> = ({ component: Component, restricted, ...rest }) => {
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
