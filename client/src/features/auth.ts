import { SignUpFormValues } from '@shared/types';
import axios from 'axios';

const api = axios.create({
  baseURL: `${process.env.REACT_APP_API}/api/auth`,
  withCredentials: true
});

export const signUp = async (
  body: SignUpFormValues
): Promise<{ token: string }> => {
  const { confirm, ...data } = body;
  const response = await api.post('/signup', data);
  return response.data;
};

// export const signIn = body =>
//   api.post('/sign-in', body).then(response => response.data);

// export const signOut = () =>
//   api.post('/sign-out').then(response => response.data);

// export const loadMe = () => api.get('/me').then(response => response.data);

// export const loadUser = () =>
//   api.get('/me/full').then(response => response.data);

// export const confirmEmail = token =>
//   api.get(`/confirmation/${token}`).then(response => response.data);
