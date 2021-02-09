import Home from 'pages/homepage';
import SignInPage from 'pages/signInPage';
import SingleProduct from 'pages/productPage';
import RegisterPage from 'pages/registerPage';

const Routes = [
  {
    path: '/',
    exact: true,
    component: Home
  },
  {
    path: '/men',
    exact: true,
    component: Home
  },
  {
    path: '/women',
    exact: true,
    component: Home
  },
  {
    path: '/kids',
    exact: true,
    component: Home
  },
  {
    path: '/product/:id',
    exact: true,
    component: SingleProduct,
    restriction: false
  },
  {
    path: '/register',
    exact: true,
    component: RegisterPage,
    restriction: 'public'
  },
  {
    path: '/sign-in',
    exact: true,
    component: SignInPage,
    restriction: 'public'
  }
];

export default Routes;
