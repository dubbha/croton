import { AppState } from '../interfaces';
import { AuthState } from './interfaces';

export const getAuth = (state: AppState): AuthState => state.auth;
