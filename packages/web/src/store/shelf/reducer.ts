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
  SHELF_ADD_SHELF,
  SHELF_ADD_SHELF_SUCCESS,
  SHELF_ADD_SHELF_ERROR,
  SHELF_EDIT_SHELF,
  SHELF_EDIT_SHELF_SUCCESS,
  SHELF_EDIT_SHELF_ERROR,
  SHELF_DELETE_SHELF,
  SHELF_DELETE_SHELF_SUCCESS,
  SHELF_DELETE_SHELF_ERROR,
  SHELF_GET_SHELVES,
  SHELF_GET_SHELVES_SUCCESS,
  SHELF_GET_SHELVES_ERROR,
  SHELF_ADD_FLOWER,
  SHELF_ADD_FLOWER_SUCCESS,
  SHELF_ADD_FLOWER_ERROR,
  SHELF_EDIT_FLOWER,
  SHELF_EDIT_FLOWER_SUCCESS,
  SHELF_EDIT_FLOWER_ERROR,
  SHELF_DELETE_FLOWER,
  SHELF_DELETE_FLOWER_SUCCESS,
  SHELF_DELETE_FLOWER_ERROR,
  SHELF_GET_FLOWERS,
  SHELF_GET_FLOWERS_SUCCESS,
  SHELF_GET_FLOWERS_ERROR,
  SHELF_GET_FLOWER,
  SHELF_GET_FLOWER_SUCCESS,
  SHELF_GET_FLOWER_ERROR,
  SHELF_ACTION,
  SHELF_ACTION_SUCCESS,
  SHELF_ACTION_ERROR,
  SHELF_GET_LAST_ACTIONS,
  SHELF_GET_LAST_ACTIONS_SUCCESS,
  SHELF_GET_LAST_ACTIONS_ERROR,
  SHELF_RESET,
  ShelfActionTypes,
} from './actions';
import { ShelfState, Flower } from './interfaces';

export const initialState: ShelfState = {
  isLoading: false,
  error: null,
  info: null,
  shelves: [],
  flowers: [],
  flower: null,
};

export function shelfReducer(
  state = initialState,
  action: ShelfActionTypes | LocationChangeAction,
): ShelfState {
  switch (action.type) {
    case SHELF_INVITE:
    case SHELF_INVITE_ACCEPT:
    case SHELF_DELETE_USER:
    case SHELF_ADD_SHELF:
    case SHELF_EDIT_SHELF:
    case SHELF_DELETE_SHELF:
    case SHELF_GET_SHELVES:
    case SHELF_ADD_FLOWER:
    case SHELF_EDIT_FLOWER:
    case SHELF_DELETE_FLOWER:
    case SHELF_GET_FLOWERS:
    case SHELF_GET_FLOWER:
    case SHELF_ACTION:
    case SHELF_GET_LAST_ACTIONS:
      return {
        ...state,
        isLoading: true,
        error: null,
        info: null,
      };
    case SHELF_INVITE_SUCCESS:
    case SHELF_INVITE_ACCEPT_SUCCESS:
    case SHELF_DELETE_USER_SUCCESS:
    case SHELF_ADD_SHELF_SUCCESS:
    case SHELF_EDIT_SHELF_SUCCESS:
    case SHELF_DELETE_SHELF_SUCCESS:
    case SHELF_ADD_FLOWER_SUCCESS:
    case SHELF_EDIT_FLOWER_SUCCESS:
    case SHELF_DELETE_FLOWER_SUCCESS:
    case SHELF_ACTION_SUCCESS:
      return {
        ...state,
        isLoading: false,
        info: action.payload.info,
      };
    case SHELF_GET_SHELVES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        shelves: action.payload.shelves,
      };
    case SHELF_GET_FLOWERS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        flowers: action.payload.flowers,
      };
    case SHELF_GET_FLOWER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        flower: action.payload.flower,
      };
    case SHELF_GET_LAST_ACTIONS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        flower: {
          ...state.flower as Flower,
          lastActions: action.payload,
        },
      };
    case SHELF_INVITE_ERROR:
    case SHELF_INVITE_ACCEPT_ERROR:
    case SHELF_DELETE_USER_ERROR:
    case SHELF_ADD_SHELF_ERROR:
    case SHELF_EDIT_SHELF_ERROR:
    case SHELF_DELETE_SHELF_ERROR:
    case SHELF_GET_SHELVES_ERROR:
    case SHELF_ADD_FLOWER_ERROR:
    case SHELF_EDIT_FLOWER_ERROR:
    case SHELF_DELETE_FLOWER_ERROR:
    case SHELF_GET_FLOWERS_ERROR:
    case SHELF_GET_FLOWER_ERROR:
    case SHELF_ACTION_ERROR:
    case SHELF_GET_LAST_ACTIONS_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload.error,
        info: null,
      };
    case SHELF_RESET:
    case LOCATION_CHANGE:
      return {
        ...state,
        isLoading: false,
        error: null,
        info: null,
        flower: null,
      };
    default:
      return state;
  }
}
