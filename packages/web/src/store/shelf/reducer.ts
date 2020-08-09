import { LOCATION_CHANGE, LocationChangeAction } from 'connected-react-router';
import {
  SHELF_INVITE,
  SHELF_INVITE_SUCCESS,
  SHELF_INVITE_ERROR,
  SHELF_INVITE_ACCEPT,
  SHELF_INVITE_ACCEPT_SUCCESS,
  SHELF_INVITE_ACCEPT_ERROR,
  SHELF_DELETE_USER,
  SHELF_DELETE_USER_SUCCESS,
  SHELF_DELETE_USER_ERROR,
  ShelfActionTypes,
} from './actions';

export interface ShelfState {
  isLoading: boolean;
  error: string | null;
  info: string | null;
}

export const initialState: ShelfState = {
  isLoading: false,
  error: null,
  info: null
};

export function shelfReducer(
  state = initialState,
  action: ShelfActionTypes | LocationChangeAction
): ShelfState {
  switch (action.type) {
    case SHELF_INVITE:
    case SHELF_INVITE_ACCEPT:
    case SHELF_DELETE_USER:
      return {
        ...state,
        isLoading: true,
        error: null,
        info: null
      };
    case SHELF_INVITE_SUCCESS:
    case SHELF_INVITE_ACCEPT_SUCCESS:
    case SHELF_DELETE_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        info: action.payload.info
      };
    case SHELF_INVITE_ERROR:
    case SHELF_INVITE_ACCEPT_ERROR:
    case SHELF_DELETE_USER_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload.error,
        info: null
      };
    case LOCATION_CHANGE:
      return {
        ...state,
        isLoading: false,
        error: null,
        info: null
      };
    default:
      return state;
  }
}
