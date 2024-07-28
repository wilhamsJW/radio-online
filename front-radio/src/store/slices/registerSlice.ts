import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface RegisterState {
  isRegistering: boolean;
  isAuthenticated: boolean;
  isNewAuthenticated: boolean
}

const initialState: RegisterState = {
  isRegistering: false,
  isAuthenticated: false,
  isNewAuthenticated: false
};

const registerSlice = createSlice({
  name: 'register',
  initialState,
  reducers: {
    setRegistering(state, action: PayloadAction<boolean>) {
      state.isRegistering = action.payload;
    },
    setAuthenticatedUser(state, action: PayloadAction<boolean>) {
      state.isAuthenticated = action.payload;
    },
    setNewAuthenticatedUser(state, action: PayloadAction<boolean>) {
      state.isNewAuthenticated = action.payload;
    }
  },
});

export const { setRegistering, setAuthenticatedUser, setNewAuthenticatedUser  } = registerSlice.actions;
export default registerSlice.reducer;
