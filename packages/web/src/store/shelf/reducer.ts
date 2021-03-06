import { LOCATION_CHANGE, LocationChangeAction } from 'connected-react-router';
import {
  SHELF_INVITE,
  SHELF_INVITE_SUCCESS,
  SHELF_INVITE_ERROR,
  SHELF_INVITE_ACCEPT,
  SHELF_INVITE_ACCEPT_SUCCESS,
  SHELF_INVITE_ACCEPT_ERROR,
  SHELF_INVITE_REVOKE,
  SHELF_INVITE_REVOKE_SUCCESS,
  SHELF_INVITE_REVOKE_ERROR,
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
  SHELF_MOVE_FLOWER,
  SHELF_MOVE_FLOWER_SUCCESS,
  SHELF_MOVE_FLOWER_ERROR,
  SHELF_ADD_FLOWER_IMAGES,
  SHELF_ADD_FLOWER_IMAGES_SUCCESS,
  SHELF_ADD_FLOWER_IMAGES_ERROR,
  SHELF_ACTION,
  SHELF_ACTION_SUCCESS,
  SHELF_ACTION_ERROR,
  SHELF_GET_LAST_ACTIONS,
  SHELF_GET_LAST_ACTIONS_SUCCESS,
  SHELF_GET_LAST_ACTIONS_ERROR,
  SHELF_GET_ACTIONS,
  SHELF_GET_ACTIONS_SUCCESS,
  SHELF_GET_ACTIONS_ERROR,
  SHELF_RESET,
  SHELF_GET_INVITES,
  SHELF_GET_INVITES_SUCCESS,
  SHELF_GET_INVITES_ERROR,
  SHELF_GET_USERS,
  SHELF_GET_USERS_SUCCESS,
  SHELF_GET_USERS_ERROR,
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
  invites: [],
  users: [],
};

export function shelfReducer(
  state = initialState,
  action: ShelfActionTypes | LocationChangeAction,
): ShelfState {
  switch (action.type) {
    case SHELF_INVITE:
    case SHELF_INVITE_ACCEPT:
    case SHELF_INVITE_REVOKE:
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
    case SHELF_ADD_FLOWER_IMAGES:
    case SHELF_ACTION:
    case SHELF_GET_LAST_ACTIONS:
    case SHELF_GET_INVITES:
    case SHELF_GET_ACTIONS:
    case SHELF_GET_USERS:
    case SHELF_MOVE_FLOWER:
      return {
        ...state,
        isLoading: true,
        error: null,
        info: null,
      };
    case SHELF_INVITE_SUCCESS:
    case SHELF_INVITE_ACCEPT_SUCCESS:
    case SHELF_INVITE_REVOKE_SUCCESS:
    case SHELF_DELETE_USER_SUCCESS:
    case SHELF_ADD_SHELF_SUCCESS:
    case SHELF_EDIT_SHELF_SUCCESS:
    case SHELF_DELETE_SHELF_SUCCESS:
    case SHELF_ADD_FLOWER_SUCCESS:
    case SHELF_EDIT_FLOWER_SUCCESS:
    case SHELF_DELETE_FLOWER_SUCCESS:
    case SHELF_ADD_FLOWER_IMAGES_SUCCESS:
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
    case SHELF_GET_INVITES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        invites: action.payload.invites,
      };
    case SHELF_GET_ACTIONS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        flower: {
          ...state.flower as Flower,
          actions: action.payload,
        },
      };
    case SHELF_GET_USERS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        users: action.payload.users,
      };

    case SHELF_MOVE_FLOWER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        flower: state.flower && action.payload.flower,
        flowers: state.flowers.map((savedFlower) =>
          savedFlower.id === action.payload.flower.id
            ? action.payload.flower
            : savedFlower),
        shelves: state.shelves.map((savedShelf) => {
          if (savedShelf.id === action.payload.shelf.id) {
            return action.payload.shelf;
          }
          if (savedShelf.id === action.payload.targetShelf.id) {
            return action.payload.targetShelf;
          }
          return savedShelf;
        }),
        info: `Your flower has been succesfully moved to the shelf ${
          action.payload.targetShelf.name
        }`,
      };
    case SHELF_INVITE_ERROR:
    case SHELF_INVITE_ACCEPT_ERROR:
    case SHELF_INVITE_REVOKE_ERROR:
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
    case SHELF_ADD_FLOWER_IMAGES_ERROR:
    case SHELF_ACTION_ERROR:
    case SHELF_GET_LAST_ACTIONS_ERROR:
    case SHELF_GET_ACTIONS_ERROR:
    case SHELF_GET_USERS_ERROR:
    case SHELF_MOVE_FLOWER_ERROR:
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
        invites: [],
      };
    case SHELF_GET_INVITES_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload.error,
        invites: [],
      };
    default:
      return state;
  }
}
