import Loader from 'components/Loader';
import * as React from 'react';
import { useSelector } from 'react-redux';
import { RouteProps, Route, Redirect } from 'react-router-dom';
import { RootState } from 'store/rootReducer';

// import { useAppContext } from 'containers/App/AppContext';

const PrivateRoute: React.FC<RouteProps & { component: React.ElementType }> = ({
  component: Component,
  ...rest
}) => {
  const auth = useSelector((state: RootState) => state.auth);

  if (!auth || auth.status === 'idle' || auth.status === 'loading')
    return <Loader />;

  return (
    <Route
      {...rest}
      render={props =>
        auth.user ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: '/sign-in', state: { from: props.location } }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
