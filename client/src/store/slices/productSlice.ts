import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RouteComponentProps } from 'react-router-dom';
import api from 'utils/api';
import { SignInParams, SignupParams, IUser } from '../../../../shared/types';
import { Product } from '@prisma/client';

export const requestProducts = createAsyncThunk(
  'users/register',
  async (data, { rejectWithValue }) => {
    try {
      const res = await api.products.fetchAll();
      console.log('res: ', res);
      return res.data;
    } catch (error) {
      return rejectWithValue({
        status: error.response.status,
        message: error.response.data
      });
    }
  }
);

interface ProductStore {
  products: Product[] | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null | undefined;
}

const productSlice = createSlice({
  name: 'product',
  initialState: {
    status: 'idle',
    error: null,
    products: null
  } as ProductStore,
  reducers: {},
  extraReducers: builder => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(requestProducts.fulfilled, (state, action) => {
      state.products = action.payload;
      state.status = 'succeeded';
    });
    builder.addCase(requestProducts.pending, (state, action) => {
      state.status = 'loading';
    });
    builder.addCase(requestProducts.rejected, (state, action) => {
      state.error = 'failed';
    });
  }
});

export default productSlice.reducer;

// export const getUser = (state: { user: AuthParams }) => state.user;
