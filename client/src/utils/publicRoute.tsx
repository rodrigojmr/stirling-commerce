import * as React from 'react';
import { RouteProps, Route, Redirect } from 'react-router-dom';

// import { useAppContext } from 'containers/App/AppContext';

const PublicRoute: React.FC<RouteProps & { restricted: boolean }> = ({
  children,
  restricted,
  ...rest
}) => {
  // restricted = false meaning public route
  // restricted = true meaning restricted route
  return (
    <Route
      {...rest}
      render={({ location }) => {
        // TODO Get user from state
        return restricted ? (
          children
        ) : (
          <Redirect to={{ pathname: '/sign-in', state: { from: location } }} />
        );
      }}
    />
  );
};

export default PublicRoute;
