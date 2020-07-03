export interface SystemState {
  loggedIn: boolean
  session: string
  userName: string
}

export const SYSTEM_UPDATE = 'SYSTEM_UPDATE';
export const SYSTEM_AUTH = 'SYSTEM_AUTH';
export const SYSTEM_REGISTER = 'SYSTEM_REGISTER'

export interface SystemUpdateAction {
  type: typeof SYSTEM_UPDATE
  payload: SystemState
}

export interface SystemAuthAction {
  type: typeof SYSTEM_AUTH,
  payload: {email: string, password: string},
}

export interface SystemRegisterAction {
  type: typeof SYSTEM_REGISTER,
  payload: {
    email: string,
    password: string,
    firstName: string,
    lastName: string
  },
}

export type SystemActionTypes =
  | SystemUpdateAction
  | SystemAuthAction
  | SystemRegisterAction;
