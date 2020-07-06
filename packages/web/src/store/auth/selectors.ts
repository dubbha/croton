import { AppState } from '../index';
import { AuthState } from './actions';

export const getAuth = (state: AppState): AuthState => state.auth;
