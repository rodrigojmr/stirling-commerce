import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IProduct } from '@shared/types';
import api from 'utils/api';

export const requestProduct = createAsyncThunk(
  'product/getProduct',
  async (id: string, { rejectWithValue }) => {
    try {
      const res = await api.products.fetchProduct(id);
      // Prices are stored as Int on database, need to parse
      // to two point decimals as Prisma.Decimal
      // type wasn't being handled properly with typescript
      const product = { ...res.data, price: res.data.price / 100 };
      return product;
    } catch (error) {
      return rejectWithValue({
        status: error.response.status,
        message: error.response.data
      });
    }
  }
);

interface ProductStore {
  product: IProduct | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null | undefined;
}

const productSlice = createSlice({
  name: 'product',
  initialState: {
    status: 'idle',
    error: null,
    product: null
  } as ProductStore,
  reducers: {},
  extraReducers: builder => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(requestProduct.fulfilled, (state, action) => {
      state.product = action.payload;
      state.status = 'succeeded';
    });
    builder.addCase(requestProduct.pending, (state, action) => {
      state.status = 'loading';
    });
    builder.addCase(requestProduct.rejected, (state, action) => {
      state.error = 'failed';
    });
  }
});

export default productSlice.reducer;

// export const getUser = (state: { user: AuthParams }) => state.user;
