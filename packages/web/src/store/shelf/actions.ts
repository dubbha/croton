import { Actions } from 'constants/actions';
import { Shelf, Flower } from './interfaces';

export const SHELF_INVITE = 'SHELF_INVITE';
export const SHELF_INVITE_SUCCESS = 'SHELF_INVITE_SUCCESS';
export const SHELF_INVITE_ERROR = 'SHELF_INVITE_ERROR';
export const SHELF_INVITE_RESET = 'SHELF_INVITE_RESET';

export const SHELF_INVITE_ACCEPT = 'SHELF_INVITE_ACCEPT';
export const SHELF_INVITE_ACCEPT_SUCCESS = 'SHELF_INVITE_ACCEPT_SUCCESS';
export const SHELF_INVITE_ACCEPT_ERROR = 'SHELF_INVITE_ACCEPT_ERROR';

export const SHELF_DELETE_USER = 'SHELF_DELETE_USER';
export const SHELF_DELETE_USER_SUCCESS = 'SHELF_DELETE_USER_SUCCESS';
export const SHELF_DELETE_USER_ERROR = 'SHELF_DELETE_USER_ERROR';

export const SHELF_ADD_SHELF = 'SHELF_ADD_SHELF';
export const SHELF_ADD_SHELF_SUCCESS = 'SHELF_ADD_SHELF_SUCCESS';
export const SHELF_ADD_SHELF_ERROR = 'SHELF_ADD_SHELF_ERROR';

export const SHELF_EDIT_SHELF = 'SHELF_EDIT_SHELF';
export const SHELF_EDIT_SHELF_SUCCESS = 'SHELF_EDIT_SHELF_SUCCESS';
export const SHELF_EDIT_SHELF_ERROR = 'SHELF_EDIT_SHELF_ERROR';

export const SHELF_DELETE_SHELF = 'SHELF_DELETE_SHELF';
export const SHELF_DELETE_SHELF_SUCCESS = 'SHELF_DELETE_SHELF_SUCCESS';
export const SHELF_DELETE_SHELF_ERROR = 'SHELF_DELETE_SHELF_ERROR';

export const SHELF_GET_SHELVES = 'SHELF_GET_SHELVES';
export const SHELF_GET_SHELVES_SUCCESS = 'SHELF_GET_SHELVES_SUCCESS';
export const SHELF_GET_SHELVES_ERROR = 'SHELF_GET_SHELVES_ERROR';

export const SHELF_ADD_FLOWER = 'SHELF_ADD_FLOWER';
export const SHELF_ADD_FLOWER_SUCCESS = 'SHELF_ADD_FLOWER_SUCCESS';
export const SHELF_ADD_FLOWER_ERROR = 'SHELF_ADD_FLOWER_ERROR';

export const SHELF_EDIT_FLOWER = 'SHELF_EDIT_FLOWER';
export const SHELF_EDIT_FLOWER_SUCCESS = 'SHELF_EDIT_FLOWER_SUCCESS';
export const SHELF_EDIT_FLOWER_ERROR = 'SHELF_EDIT_FLOWER_ERROR';

export const SHELF_DELETE_FLOWER = 'SHELF_DELETE_FLOWER';
export const SHELF_DELETE_FLOWER_SUCCESS = 'SHELF_DELETE_FLOWER_SUCCESS';
export const SHELF_DELETE_FLOWER_ERROR = 'SHELF_DELETE_FLOWER_ERROR';

export const SHELF_GET_FLOWERS = 'SHELF_GET_FLOWERS';
export const SHELF_GET_FLOWERS_SUCCESS = 'SHELF_GET_FLOWERS_SUCCESS';
export const SHELF_GET_FLOWERS_ERROR = 'SHELF_GET_FLOWERS_ERROR';

export const SHELF_GET_FLOWER = 'SHELF_GET_FLOWER';
export const SHELF_GET_FLOWER_SUCCESS = 'SHELF_GET_FLOWER_SUCCESS';
export const SHELF_GET_FLOWER_ERROR = 'SHELF_GET_FLOWER_ERROR';

export const SHELF_ACTION = 'SHELF_ACTION';
export const SHELF_ACTION_SUCCESS = 'SHELF_ACTION_SUCCESS';
export const SHELF_ACTION_ERROR = 'SHELF_ACTION_ERROR';

export const SHELF_GET_LAST_ACTIONS = 'SHELF_GET_LAST_ACTIONS';
export const SHELF_GET_LAST_ACTIONS_SUCCESS = 'SHELF_GET_LAST_ACTIONS_SUCCESS';
export const SHELF_GET_LAST_ACTIONS_ERROR = 'SHELF_GET_LAST_ACTIONS_ERROR';

export const SHELF_RESET = 'SHELF_RESET';

export interface ShelfInvite {
  type: typeof SHELF_INVITE;
  payload: { userEmail: string; shelfId: number };
}

export interface ShelfInviteSuccess {
  type: typeof SHELF_INVITE_SUCCESS;
  payload: { info: string };
}

export interface ShelfInviteError {
  type: typeof SHELF_INVITE_ERROR;
  payload: { error: string };
}

export interface ShelfInviteAccept {
  type: typeof SHELF_INVITE_ACCEPT;
  payload: { shelfInvitationToken: string };
}

export interface ShelfInviteAcceptSuccess {
  type: typeof SHELF_INVITE_ACCEPT_SUCCESS;
  payload: { info: string };
}

export interface ShelfInviteAcceptError {
  type: typeof SHELF_INVITE_ACCEPT_ERROR;
  payload: { error: string };
}

export interface ShelfDeleteUser {
  type: typeof SHELF_DELETE_USER;
  payload: { shelfId: number, userId: number };
}

export interface ShelfDeleteUserSuccess {
  type: typeof SHELF_DELETE_USER_SUCCESS;
  payload: { info: string };
}

export interface ShelfDeleteUserError {
  type: typeof SHELF_DELETE_USER_ERROR;
  payload: { error: string };
}

export interface ShelfAddShelf {
  type: typeof SHELF_ADD_SHELF;
  payload: { name: string, description: string, location: string };
}

export interface ShelfAddShelfSuccess {
  type: typeof SHELF_ADD_SHELF_SUCCESS;
  payload: { info: string };
}

export interface ShelfAddShelfError {
  type: typeof SHELF_ADD_SHELF_ERROR;
  payload: { error: string };
}

export interface ShelfEditShelf {
  type: typeof SHELF_EDIT_SHELF;
  payload: { id: number, name: string, description: string, location: string };
}

export interface ShelfEditShelfSuccess {
  type: typeof SHELF_EDIT_SHELF_SUCCESS;
  payload: { info: string };
}

export interface ShelfEditShelfError {
  type: typeof SHELF_EDIT_SHELF_ERROR;
  payload: { error: string };
}

export interface ShelfDeleteShelf {
  type: typeof SHELF_DELETE_SHELF;
  payload: { id: number };
}

export interface ShelfDeleteShelfSuccess {
  type: typeof SHELF_DELETE_SHELF_SUCCESS;
  payload: { info: string };
}

export interface ShelfDeleteShelfError {
  type: typeof SHELF_DELETE_SHELF_ERROR;
  payload: { error: string };
}

export interface ShelfGetShelves {
  type: typeof SHELF_GET_SHELVES;
}

export interface ShelfGetShelvesSuccess {
  type: typeof SHELF_GET_SHELVES_SUCCESS;
  payload: { shelves: Shelf[] };
}

export interface ShelfGetShelvesError {
  type: typeof SHELF_GET_SHELVES_ERROR;
  payload: { error: string };
}

export interface ShelfAddFlower {
  type: typeof SHELF_ADD_FLOWER;
  payload: {
    shelfId: number,
    name: string,
    description: string,
    rrules: { [key in Actions]?: string }
  };
}

export interface ShelfAddFlowerSuccess {
  type: typeof SHELF_ADD_FLOWER_SUCCESS;
  payload: { info: string };
}

export interface ShelfAddFlowerError {
  type: typeof SHELF_ADD_FLOWER_ERROR;
  payload: { error: string };
}

export interface ShelfEditFlower {
  type: typeof SHELF_EDIT_FLOWER;
  payload: {
    id: number,
    shelfId: number,
    name: string,
    description: string,
    rrules: { [key in Actions]?: string },
  };
}

export interface ShelfEditFlowerSuccess {
  type: typeof SHELF_EDIT_FLOWER_SUCCESS;
  payload: { info: string };
}

export interface ShelfEditFlowerError {
  type: typeof SHELF_EDIT_FLOWER_ERROR;
  payload: { error: string };
}

export interface ShelfDeleteFlower {
  type: typeof SHELF_DELETE_FLOWER;
  payload: { id: number, shelfId: number };
}

export interface ShelfDeleteFlowerSuccess {
  type: typeof SHELF_DELETE_FLOWER_SUCCESS;
  payload: { info: string };
}

export interface ShelfDeleteFlowerError {
  type: typeof SHELF_DELETE_FLOWER_ERROR;
  payload: { error: string };
}

export interface ShelfGetFlowers {
  type: typeof SHELF_GET_FLOWERS;
  payload: { shelfId: number };
}

export interface ShelfGetFlowersSuccess {
  type: typeof SHELF_GET_FLOWERS_SUCCESS;
  payload: { flowers: Flower[] };
}

export interface ShelfGetFlowersError {
  type: typeof SHELF_GET_FLOWERS_ERROR;
  payload: { error: string };
}

export interface ShelfGetFlower {
  type: typeof SHELF_GET_FLOWER;
  payload: { id: number };
}

export interface ShelfGetFlowerSuccess {
  type: typeof SHELF_GET_FLOWER_SUCCESS;
  payload: { flower: Flower };
}

export interface ShelfGetFlowerError {
  type: typeof SHELF_GET_FLOWER_ERROR;
  payload: { error: string };
}

export interface ShelfAction {
  type: typeof SHELF_ACTION;
  payload: { action: Actions, flowerId: number, shelfId: number };
}

export interface ShelfActionSuccess {
  type: typeof SHELF_ACTION_SUCCESS;
  payload: { info: string };
}

export interface ShelfActionError {
  type: typeof SHELF_ACTION_ERROR;
  payload: { error: string };
}

export interface ShelfGetLastActions {
  type: typeof SHELF_GET_LAST_ACTIONS;
  payload: { flowerId: number, shelfId: number };
}

export interface ShelfGetLastActionsSuccess {
  type: typeof SHELF_GET_LAST_ACTIONS_SUCCESS;
  payload: {
    [key in Actions]: {
      timestamp: number;
      user: { id: number, firstName: string, lastName: string };
    }
  }
}

export interface ShelfGetLastActionsError {
  type: typeof SHELF_GET_LAST_ACTIONS_ERROR;
  payload: { error: string };
}

export interface ShelfReset {
  type: typeof SHELF_RESET;
}

export type ShelfActionTypes =
  | ShelfInvite
  | ShelfInviteSuccess
  | ShelfInviteError
  | ShelfInviteAccept
  | ShelfInviteAcceptSuccess
  | ShelfInviteAcceptError
  | ShelfDeleteUser
  | ShelfDeleteUserSuccess
  | ShelfDeleteUserError
  | ShelfAddShelf
  | ShelfAddShelfSuccess
  | ShelfAddShelfError
  | ShelfEditShelf
  | ShelfEditShelfSuccess
  | ShelfEditShelfError
  | ShelfDeleteShelf
  | ShelfDeleteShelfSuccess
  | ShelfDeleteShelfError
  | ShelfGetShelves
  | ShelfGetShelvesSuccess
  | ShelfGetShelvesError
  | ShelfAddFlower
  | ShelfAddFlowerSuccess
  | ShelfAddFlowerError
  | ShelfEditFlower
  | ShelfEditFlowerSuccess
  | ShelfEditFlowerError
  | ShelfDeleteFlower
  | ShelfDeleteFlowerSuccess
  | ShelfDeleteFlowerError
  | ShelfGetFlowers
  | ShelfGetFlowersSuccess
  | ShelfGetFlowersError
  | ShelfGetFlower
  | ShelfGetFlowerSuccess
  | ShelfGetFlowerError
  | ShelfAction
  | ShelfActionSuccess
  | ShelfActionError
  | ShelfGetLastActions
  | ShelfGetLastActionsSuccess
  | ShelfGetLastActionsError
  | ShelfReset;
