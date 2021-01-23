import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Dispatch } from 'redux';

// Slice

interface AuthParams {
  username: string;
  password: string;
}

export const requestLogin = createAsyncThunk(
  'users/login',
  async ({ username, password }: AuthParams) => {
    // const res = await api.post('/api/auth/login/', { username, password });
    // return (await response.json()) as LoginProps;
    return {
      username: 'storm',
      name: 'rodrigo',
      avatar: 'red'
    };
  }
);

export const requestLogout = createAsyncThunk('users/logout', async () => {
  // const res = await api.post('/api/auth/login/', { username, password });
  // return (await response.json()) as LoginProps;
});

interface User {
  username: string;
  name: string;
  avatar: string;
}

interface Auth {
  loading: boolean;
  user: User | null;
  token?: string;
}

const authSlice = createSlice({
  name: 'user',
  initialState: {
    loading: true,
    user: null,
    token: undefined
  } as Auth,
  reducers: {},
  extraReducers: builder => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(requestLogin.fulfilled, (state, action) => {
      state.user = action.payload;
      // Add user to the state array
      // state.username = action.payload.username;
    });
  }
});

export default authSlice.reducer;

export const getUser = (state: { user: AuthParams }) => state.user;
