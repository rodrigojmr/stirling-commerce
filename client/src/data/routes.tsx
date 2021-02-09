import Home from 'pages/homepage';
import SignInPage from 'pages/signInPage';
import SingleProduct from 'pages/productPage';
import RegisterPage from 'pages/registerPage';
import Dashboard from 'pages/dashboard';

const routes = [
  {
    path: '/',
    exact: true,
    component: Home
  },
  {
    path: '/men',
    exact: true,
    component: () => <>Men</>
  },
  {
    path: '/women',
    exact: true,
    component: () => <>Women</>
  },
  {
    path: '/kids',
    exact: true,
    component: () => <>Kids</>
  },
  {
    path: '/product/:id',
    exact: true,
    component: SingleProduct
  },
  {
    path: '/register',
    exact: true,
    component: RegisterPage,
    restricted: true
  },
  {
    path: '/sign-in',
    exact: true,
    component: SignInPage,
    restricted: true
  },
  {
    path: '/dashboard',
    exact: true,
    component: Dashboard,
    isPrivate: true
  }
];

export default routes;
