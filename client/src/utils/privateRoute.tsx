import React from 'react';
import { RouteProps, Route, Redirect } from 'react-router-dom';

// import { useAppContext } from 'containers/App/AppContext';

type PrivateRouteProps = {
  path: RouteProps['path'];
  component: React.ElementType;
};
const PrivateRoute: React.FunctionComponent<PrivateRouteProps> = ({
  component: Component,
  ...routeProps
}) => {
  const isSignedIn = false;
  return (
    <Route
      {...routeProps}
      render={props => (isSignedIn ? <Component /> : <Redirect to="/login" />)}
    />
  );
};

export default PrivateRoute;
