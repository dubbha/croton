import { LocationChangeAction } from 'connected-react-router';
import { NotificationsState } from './interfaces';
import {
  NOTIFICATION_REGISTER,
  NOTIFICATION_REGISTER_ERROR,
  NOTIFICATION_REGISTER_SUCCESS,
  NotificationActionTypes
} from './actions';

export const initialState: NotificationsState = {
  error: null
};

export function notificationReducer(
  state = initialState,
  action: NotificationActionTypes | LocationChangeAction
): NotificationsState {
  switch (action.type) {
    case NOTIFICATION_REGISTER:
    case NOTIFICATION_REGISTER_SUCCESS:
      return {
        ...state,
        error: null
      };
    case NOTIFICATION_REGISTER_ERROR:
      return {
        ...state,
        error: action.payload.error
      };
    default:
      return state;
  }
}
