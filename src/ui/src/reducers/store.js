import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './index'; // Ensure you have reducers in your app

export const store = configureStore({
  reducer: rootReducer
});
