import { AppState } from '../interfaces';
import { NotificationsState } from './interfaces';

export const getNotifications = (state: AppState): NotificationsState =>
  state.notifications;
