import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface RegisterState {
  isRegistering: boolean;
  isAuthenticated: boolean;
  isNewAuthenticated: boolean;
  isNewStationFavorite: boolean;
  currentAudioUrl: string | null;
  currentAudioIsPlaying: boolean; 
  currentAudioId: string | null;
}

const initialState: RegisterState = {
  isRegistering: false,
  isAuthenticated: false,
  isNewAuthenticated: false,
  isNewStationFavorite: false,
  currentAudioIsPlaying: false,
  currentAudioId: '',
  currentAudioUrl: ''
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
      state.isNewStationFavorite = action.payload;
    },
    setAudioState(state, action: PayloadAction<{ changeuuid: string; url: string; isPlaying: boolean }>) {
      state.currentAudioId = action.payload.changeuuid;
      state.currentAudioUrl = action.payload.url;
      state.currentAudioIsPlaying = !state.currentAudioIsPlaying;
    },
    setCurrentAudioId(state, action: PayloadAction<string | null>) {
      state.currentAudioId = action.payload;
    },
    setIsPlaying(state, action: PayloadAction<{ id: string; isPlaying: boolean }>) {
      if (state.currentAudioId === action.payload.id) {
        state.currentAudioIsPlaying = action.payload.isPlaying;
      }
    },
    // setIsNewUrlAudio(state, action: PayloadAction<string>) {
    //   if (state.currentAudioId) {
    //     state.currentAudioUrl = action.payload;
    //   }
    // },
    setIsNewUrlAudio(state, action: PayloadAction<string>) {
      state.currentAudioUrl = action.payload;
    },
  },
});

export const { setRegistering, setAuthenticatedUser, setNewAuthenticatedUser, setIsNewStationFavorite, setAudioState, setCurrentAudioId, setIsPlaying, setIsNewUrlAudio } = registerSlice.actions;
export default registerSlice.reducer;

