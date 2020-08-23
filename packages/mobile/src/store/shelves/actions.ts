import { ShelfInterface } from '../../components/Shelf/interface';
import { FlowerInterface } from '../../components/Flower/interface';

export const SHELVES_GET = 'SHELVES_GET';
export const SHELVES_GET_SUCCESS = 'SHELVES_GET_SUCCESS';

export const SHELVES_SHELF_ADD = 'SHELVES_SHELF_ADD';
export const SHELVES_SHELF_EDIT = 'SHELVES_SHELF_EDIT';
export const SHELVES_SHELF_DELETE = 'SHELVES_SHELF_DELETE';

// TODO: Should rename this action to SHELF_USER_INVITE
export const SHELVES_SHELF_INVITE = 'SHELVES_SHELF_INVITE';

export const SHELF_FLOWER_GET = 'SHELF_FLOWER_GET';
export const SHELF_FLOWER_GET_SUCCESS = 'SHELF_FLOWER_GET_SUCCESS';
export const SHELF_FLOWER_ADD = 'SHELF_FLOWER_ADD';
export const SHELF_FLOWER_EDIT = 'SHELF_FLOWER_EDIT';
export const SHELF_FLOWER_DELETE = 'SHELF_FLOWER_DELETE';

export interface ShelvesGet {
  type: typeof SHELVES_GET;
}

export interface ShelvesGetSuccess {
  type: typeof SHELVES_GET_SUCCESS;
  payload: {
    shelves: ShelfInterface[];
  };
}

export interface ShelvesShelfAdd {
  type: typeof SHELVES_SHELF_ADD;
  payload: {
    name: string;
    description: string;
    location: string;
  };
}

export interface ShelvesShelfEdit {
  type: typeof SHELVES_SHELF_EDIT;
  payload: {
    id: string;
    name: string;
    description: string;
    location: string;
  };
}

export interface ShelvesShelfDelete {
  type: typeof SHELVES_SHELF_DELETE;
}

export interface ShelvesShelfInvite {
  type: typeof SHELVES_SHELF_INVITE;
}

export interface ShelfFlowerGet {
  type: typeof SHELF_FLOWER_GET;
  payload: { shelfId: number };
}

export interface ShelfFlowerGetSuccess {
  type: typeof SHELF_FLOWER_GET_SUCCESS;
  payload: {
    shelves: FlowerInterface[];
  };
}

export interface ShelfFlowerAdd {
  type: typeof SHELF_FLOWER_ADD;
  payload: {
    name: string;
    description: string;
  };
}

export interface ShelfFlowerEdit {
  type: typeof SHELF_FLOWER_EDIT;
  payload: {
    id: string;
    name: string;
    description: string;
    shelfId: string;
    order: number;
  };
}

export interface ShelfFlowerDelete {
  type: typeof SHELF_FLOWER_DELETE;
}

export type ShelvesActionTypes =
  | ShelvesGet
  | ShelvesGetSuccess
  | ShelvesShelfAdd
  | ShelvesShelfEdit
  | ShelvesShelfDelete
  | ShelvesShelfInvite
  | ShelfFlowerGet
  | ShelfFlowerGetSuccess
  | ShelfFlowerAdd
  | ShelfFlowerEdit
  | ShelfFlowerDelete;
