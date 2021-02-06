import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RouteComponentProps } from 'react-router-dom';
import api from 'utils/api';
import { SignInParams, SignupParams, IUser } from './../../../../shared/types';

export const requestSignup = createAsyncThunk(
  'users/signup',
  async (
    data: { values: SignupParams; history: RouteComponentProps['history'] },
    { rejectWithValue }
  ) => {
    try {
      const res = await api.auth.userSignUp(data.values);
      data.history.push('/');
      return res.data;
    } catch (error) {
      return rejectWithValue({
        status: error.response.status,
        message: error.response.data
      });
    }
  }
);

export const requestLogin = createAsyncThunk(
  'users/login',
  async (
    data: { values: SignInParams; history: RouteComponentProps['history'] },
    { rejectWithValue }
  ) => {
    try {
      const res = await api.auth.userLogin(data.values);
      data.history.push('/');
      return res.data;
    } catch (error) {
      return rejectWithValue({
        status: error.response.status,
        message: error.response.data
      });
    }
  }
);

export const getUser = createAsyncThunk(
  'users/get',
  async (data, { rejectWithValue }) => {
    try {
      const res = await api.auth.findUser();
      return res.data;
    } catch (error) {
      return rejectWithValue({
        status: error.response.status,
        message: error.response.data
      });
    }
  }
);

export const requestLogout = createAsyncThunk('users/logout', async () => {
  return true;
  // const res = await api.post('/api/auth/login/', { username, password });
  // return (await response.json()) as LoginProps;
});

interface Auth {
  user: IUser | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null | undefined;
}

const authSlice = createSlice({
  name: 'user',
  initialState: {
    status: 'idle',
    error: null,
    user: null
  } as Auth,
  reducers: {},
  extraReducers: builder => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(requestSignup.fulfilled, (state, action) => {
      state.user = action.payload;
      state.status = 'succeeded';
    });
    builder.addCase(requestSignup.pending, (state, action) => {
      state.status = 'loading';
    });
    builder.addCase(requestSignup.rejected, (state, action) => {
      console.log('rejected', action.payload);
    });
    builder.addCase(requestLogin.fulfilled, (state, action) => {
      state.user = action.payload;
      state.status = 'succeeded';
    });
    builder.addCase(requestLogin.pending, (state, action) => {
      state.status = 'loading';
    });
    builder.addCase(requestLogin.rejected, (state, action) => {
      state.status = 'failed';
    });
    builder.addCase(requestLogout.fulfilled, (state, action) => {
      state.status = 'idle';
      state.user = null;
    });
    builder.addCase(requestLogout.pending, (state, action) => {
      state.status = 'loading';
    });
    builder.addCase(requestLogout.rejected, (state, action) => {
      state.status = 'failed';
    });
    builder.addCase(getUser.fulfilled, (state, action) => {
      state.status = 'idle';
      state.user = action.payload;
    });
    builder.addCase(getUser.pending, (state, action) => {
      state.status = 'loading';
    });
    builder.addCase(getUser.rejected, (state, action) => {
      state.status = 'failed';
    });
  }
});

export default authSlice.reducer;

// export const getUser = (state: { user: AuthParams }) => state.user;
