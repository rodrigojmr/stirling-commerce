import * as React from 'react';
import { RouteProps, Route, Redirect } from 'react-router-dom';

// import { useAppContext } from 'containers/App/AppContext';

const PrivateRoute: React.FC<RouteProps> = ({ children, ...rest }) => {
  // TODO Change to signed in state
  const isSignedIn = true;
  return (
    <Route
      {...rest}
      render={({ location }) => {
        return isSignedIn ? (
          children
        ) : (
          <Redirect to={{ pathname: '/login', state: { from: location } }} />
        );
      }}
    />
  );
};

export default PrivateRoute;
