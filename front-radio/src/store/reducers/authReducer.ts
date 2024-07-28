import { createReducer } from '@reduxjs/toolkit';
import { setAuthMode } from '../actions/authActions';

interface AuthState {
  mode: 'login' | 'register';
}

const initialState: AuthState = {
  mode: 'login',
};

const authReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setAuthMode, (state, action) => {
      state.mode = action.payload;
    });
});

export default authReducer;
