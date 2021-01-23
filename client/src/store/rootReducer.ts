import { combineReducers } from '@reduxjs/toolkit';
import authReducer from '../features/auth/userSlice';
import cartReducer from '../features/cart/cartSlice';

const rootReducer = combineReducers({ auth: authReducer, cart: cartReducer });

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
