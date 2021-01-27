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
    function wait(milliseconds: number) {
      return new Promise(resolve => setTimeout(resolve, milliseconds));
    }
    await wait(1000);

    return Promise.resolve({
      username: 'storm',
      name: 'rodrigo',
      avatar: 'red'
    });

    // const res = await api.post('/api/auth/login/', { username, password });
    // return (await response.json()) as LoginProps;
  }
);

export const requestLogout = createAsyncThunk('users/logout', async () => {
  return true;
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
    builder.addCase(requestLogin.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(requestLogin.rejected, (state, action) => {
      state.loading = false;
    });
    builder.addCase(requestLogout.fulfilled, (state, action) => {
      state.user = null;
      // Add user to the state array
      // state.username = action.payload.username;
    });
    builder.addCase(requestLogout.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(requestLogout.rejected, (state, action) => {
      state.loading = false;
    });
  }
});

export default authSlice.reducer;

export const getUser = (state: { user: AuthParams }) => state.user;
