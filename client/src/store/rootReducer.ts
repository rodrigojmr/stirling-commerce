import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './slices/userSlice';
import cartReducer from './slices/cartSlice';
import productReducer from './slices/productSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  cart: cartReducer,
  products: productReducer
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
