import {
  INFORMATION_NOTIFY,
  INFORMATION_HIDE,
  INFORMATION_LOADER,
  INFORMATION_LOADER_HIDE,
  InformationActionTypes,
} from './actions';
import { InformationState } from './interfaces';
import { getMessageOptions, getStatus } from './helpers';

const initialState: InformationState = {
  isLoading: false,
  type: null,
  message: null,
  status: null,
};

export function informationReducer(
  state: InformationState,
  action: InformationActionTypes,
) {
  switch (action.type) {
    case INFORMATION_NOTIFY: {
      const messageOptions = getMessageOptions(action.payload);
      const status = getStatus(action.payload);

      return {
        ...state,
        isLoading: false,
        status,
        ...messageOptions,
      };
    }

    case INFORMATION_HIDE: {
      return {
        ...initialState,
      };
    }

    case INFORMATION_LOADER: {
      return {
        ...state,
        isLoading: true,
      };
    }

    case INFORMATION_LOADER_HIDE: {
      return {
        ...state,
        isLoading: false,
      };
    }

    default: {
      return initialState;
    }
  }
}
