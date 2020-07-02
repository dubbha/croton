export interface SystemState {
  loggedIn: boolean
  session: string
  userName: string
}

export const SYSTEM_UPDATE = 'SYSTEM_UPDATE';
export const SYSTEM_AUTH = 'SYSTEM_AUTH';

export interface SystemUpdateAction {
  type: typeof SYSTEM_UPDATE
  payload: SystemState
}

export interface SystemAuthAction {
  type: typeof SYSTEM_AUTH,
  payload: { email: string, password: string },
}

export type SystemActionTypes =
  | SystemUpdateAction
  | SystemAuthAction;
