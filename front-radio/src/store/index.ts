'use client'

import { configureStore } from '@reduxjs/toolkit';
import registerReducer from './slices/registerSlice';
import authenticatedUserReducer from './reducers/authenticatedUserReducer'
import newAuthenticatedUserReducer from './reducers/newAuthenticatedUserReducer'

const store = configureStore({
  reducer: {
    register: registerReducer,
    authenticatedUserReducer: authenticatedUserReducer,
    newAuthenticatedUserReducer: newAuthenticatedUserReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
