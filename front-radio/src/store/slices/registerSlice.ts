import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface RegisterState {
  isRegistering: boolean;
  isAuthenticated: boolean;
  isNewAuthenticated: boolean;
  isNewStationFavorite: boolean
}

const initialState: RegisterState = {
  isRegistering: false,
  isAuthenticated: false,
  isNewAuthenticated: false,
  isNewStationFavorite: false
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
    },
    setIsNewStationFavorite(state, action: PayloadAction<boolean>) {
      state.isNewStationFavorite = action.payload
    }
  },
});

export const { setRegistering, setAuthenticatedUser, setNewAuthenticatedUser, setIsNewStationFavorite  } = registerSlice.actions;
export default registerSlice.reducer;
