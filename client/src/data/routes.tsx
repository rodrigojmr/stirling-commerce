import Home from 'pages/homepage';
import SignInPage from 'pages/signInPage';
import SingleProduct from 'pages/productPage';
import RegisterPage from 'pages/registerPage';
import Dashboard from 'pages/dashboard';
import Search from 'pages/search';
import Checkout from 'pages/checkoutPage';

const routes = [
  {
    path: '/search/:param1?/:param2?',
    exact: true,
    component: Search
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
  },
  {
    path: '/checkout',
    exact: true,
    component: Checkout,
    isPrivate: true
  },
  {
    path: '/',
    exact: true,
    component: Home
  }
];

export default routes;
