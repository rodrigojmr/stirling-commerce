import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './slices/userSlice';
import cartReducer from './slices/cartSlice';
import catalogReducer from './slices/catalogSlice';
import productDetailsSlice from './slices/productDetailsSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  cart: cartReducer,
  catalog: catalogReducer,
  productDetails: productDetailsSlice
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
