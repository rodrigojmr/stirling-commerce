import { Product } from '@prisma/client';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from 'utils/api';

export const requestProducts = createAsyncThunk(
  'products/get-all',
  async (data, { rejectWithValue }) => {
    try {
      const res = await api.products.fetchAll();
      // Prices are stored as Int on database, need to parse
      // to two point decimals as Prisma.Decimal
      // type wasn't being handled properly with typescript
      res.data.forEach(product => (product.price = product.price / 100));
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
  name: 'products',
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
