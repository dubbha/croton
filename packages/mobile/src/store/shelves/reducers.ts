import {
  SHELVES_GET,
  SHELVES_GET_SUCCESS,
  SHELVES_SHELF_ADD,
  SHELF_FLOWER_GET,
  SHELF_FLOWER_ADD,
  ShelvesActionTypes,
  SHELF_FLOWER_GET_SUCCESS,
} from './actions';

export const initialState = {
  shelves: [],
  flowers: [],
};

export function shelvesReducer(
  state = initialState,
  action: ShelvesActionTypes,
) {
  switch (action.type) {
    case SHELVES_GET: {
      return {
        ...state,
      };
    }

    case SHELVES_GET_SUCCESS: {
      return {
        ...state,
        shelves: action.payload.shelves,
      };
    }

    case SHELVES_SHELF_ADD: {
      return {
        ...state,
      };
    }

    case SHELF_FLOWER_GET: {
      return {
        ...state,
      };
    }

    case SHELF_FLOWER_GET_SUCCESS: {
      return {
        ...state,
        flowers: action.payload.flowers,
      };
    }

    case SHELF_FLOWER_ADD: {
      return {
        ...state,
      };
    }

    default: {
      return state;
    }
  }
}
