import { Product } from '@prisma/client';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Dispatch } from 'redux';

interface CartProduct {
  product: Product;
  amount: number;
}
const cartSlice = createSlice({
  name: 'cart',
  initialState: [] as CartProduct[],
  reducers: {
    addProduct: (state, action: PayloadAction<CartProduct>) => {
      const { amount, product } = action.payload;
      const matchingProduct = state.find(
        (item: CartProduct) => item.product.id === product.id
      );
      if (!state.length || !matchingProduct) {
        state.push(action.payload);
      } else {
        if (matchingProduct) {
          matchingProduct.amount += amount;
        }
      }
    },
    removeProduct: (state, action: PayloadAction<Product>) => {
      state.splice(
        state.findIndex(item => item.product.id === action.payload.id),
        1
      );
    }
  }
});

export default cartSlice.reducer;

export const { addProduct, removeProduct } = cartSlice.actions;
