export const NOTIFICATION_REGISTER = 'NOTIFICATION_REGISTER';
export const NOTIFICATION_REGISTER_SUCCESS = 'NOTIFICATION_REGISTER_SUCCESS';
export const NOTIFICATION_REGISTER_ERROR = 'NOTIFICATION_REGISTER_ERROR';

export const NOTIFICATION_CLICKED = 'NOTIFICATION_CLICKED';

export interface NotificationRegister {
  type: typeof NOTIFICATION_REGISTER;
}

export interface NotificationRegisterSuccess {
  type: typeof NOTIFICATION_REGISTER_SUCCESS;
}

export interface NotificationRegisterError {
  type: typeof NOTIFICATION_REGISTER_ERROR;
  payload: { error: string };
}

export interface NotificationClicked {
  type: typeof NOTIFICATION_CLICKED;
  payload: any;
}

export type NotificationActionTypes =
  | NotificationRegister
  | NotificationRegisterSuccess
  | NotificationRegisterError
  | NotificationClicked;
