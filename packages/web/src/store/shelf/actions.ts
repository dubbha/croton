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
  | ShelfReset;
