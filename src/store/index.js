import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import adminReducer from './slices/adminSlice';
import cryptoReducer from './slices/cryptoSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    crypto: cryptoReducer,
    admin: adminReducer
  }
});

export default store;
