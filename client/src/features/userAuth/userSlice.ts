import { createAsyncThunk, current, createSlice } from '@reduxjs/toolkit';
import { Dispatch } from 'redux';

// Slice

interface LoginProps {
  username: string;
  password: string;
}

export const login = createAsyncThunk(
  'users/login',
  async ({ username, password }: LoginProps) => {
    // const res = await api.post('/api/auth/login/', { username, password });
    // return (await response.json()) as LoginProps;
    return { username: 'rodrigo' };
  }
);

export const logout = createAsyncThunk('users/logout', async () => {
  // const res = await api.post('/api/auth/login/', { username, password });
  // return (await response.json()) as LoginProps;
});

type SliceState = { username: string };

const slice = createSlice({
  name: 'user',
  initialState: { username: 'test' } as SliceState,
  reducers: {},
  extraReducers: builder => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(login.fulfilled, (state, action) => {
      // Add user to the state array
      state.username = action.payload.username;
    });
  }
});

export default slice.reducer;

export const getUser = (state: { user: LoginProps }) => state.user;
