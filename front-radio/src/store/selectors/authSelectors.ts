import { RootState } from '../index';

export const selectAuthMode = (state: RootState) => state.auth.mode;
