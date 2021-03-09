import {
  IProduct,
  IUser,
  OrderPayload,
  SignInParams,
  SingleOrderPayload,
  SubmitOrderPayload
} from '@shared/types';
//here we are importing our Axios dependency
import axios from 'axios';

const baseURL =
  process.env.NODE_ENV === 'development'
    ? `${process.env.REACT_APP_API}/api`
    : '/api';

const apiClient = axios.create({
  baseURL,
  withCredentials: true
});

//Now set up the routes.  We are going to export a default object with keys that keep our API routes organized.  For example, all of the auth routes live in the Auth object

const api = {
  auth: {
    userRegister(payload: SignInParams) {
      return apiClient.post<IUser>('/auth/signup/', payload);
    },
    userSignIn(payload: SignInParams) {
      return apiClient.post<IUser>('/auth/signin/', payload);
    },
    findUser() {
      return apiClient.get<IUser>('/auth/me');
    },
    userLogout() {
      return apiClient.post('/auth/logout/');
    }
    // generateResetToken(payload) {
    //   return apiClient.post('/auth/generate_reset_token/', payload);
    // },
    // resetPassword(payload) {
    //   return apiClient.post('/auth/reset_password/', payload);
    // }
  },
  products: {
    fetchAll() {
      return apiClient.get<IProduct[]>('/products/all');
    },
    fetchProduct(id: string) {
      return apiClient.get<IProduct>(`/products/${id}`);
    }
  },
  orders: {
    submitOrder(payload: SubmitOrderPayload) {
      return apiClient.post<OrderPayload>('/orders/submit', payload);
    },
    fetchOrder(id: string) {
      return apiClient.get<SingleOrderPayload>(`/orders/${id}`);
    }
  }
};

export default api;
