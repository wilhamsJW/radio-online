'use client'

import { configureStore } from '@reduxjs/toolkit';
import registerReducer from './slices/registerSlice';

const store = configureStore({
  reducer: {
    register: registerReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
