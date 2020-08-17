import { RouterState } from 'connected-react-router';
import { AuthState } from './auth';
import { ShelfState } from './shelf';

export interface AppState {
  router: RouterState;
  auth: AuthState;
  shelf: ShelfState;
}
