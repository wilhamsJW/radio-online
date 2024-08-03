import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from 'firebase/auth';

interface MediaQueryState {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isSmallScreen: boolean;
  isDesktopDrawer: boolean
}

interface RegisterState {
  isRegistering: boolean;
  isAuthenticated: boolean;
  isNewAuthenticated: boolean;
  isNewStationFavorite: boolean;
  currentAudioUrl: string | null;
  currentAudioIsPlaying: boolean;
  currentAudioId: string | null;
  loggedUser: User | null;
  noListStationRadio: boolean,
  isLoading: boolean,
  mediaQuery: MediaQueryState
}

const initialState: RegisterState = {
  isRegistering: false,
  isAuthenticated: false,
  isNewAuthenticated: false,
  isNewStationFavorite: false,
  currentAudioIsPlaying: false,
  currentAudioId: '',
  currentAudioUrl: '',
  loggedUser: null,
  noListStationRadio: false,
  isLoading: false,
  mediaQuery: {
    isMobile: false,
    isTablet: false,
    isDesktop: false,
    isSmallScreen: false,
    isDesktopDrawer: false
  }
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
    setAudioState(state, action: PayloadAction<{ changeuuid: string; url: string; isPlaying?: boolean }>) {
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
    setIsNewUrlAudio(state, action: PayloadAction<string>) {
      state.currentAudioUrl = action.payload;
    },
    setLoggedUser(state, action: PayloadAction<User | null>) {
      state.loggedUser = action.payload;
    },
    setNoListStationRadio(state, action: PayloadAction<boolean>) {
      state.noListStationRadio = action.payload;
    },
    setIsLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    setMediaQuery(state, action: PayloadAction<MediaQueryState>) {
      state.mediaQuery = action.payload;
    }
  },
});

export const { 
  setRegistering,
  setAuthenticatedUser, 
  setNewAuthenticatedUser, 
  setIsNewStationFavorite, 
  setAudioState, 
  setCurrentAudioId, 
  setIsPlaying, 
  setIsNewUrlAudio, 
  setLoggedUser, 
  setNoListStationRadio, 
  setIsLoading, 
  setMediaQuery
 } = registerSlice.actions;

export default registerSlice.reducer;