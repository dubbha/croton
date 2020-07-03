import { SystemState, SystemActionTypes, SYSTEM_UPDATE, SYSTEM_REGISTER } from './actions';

export const initialState: SystemState = {
  loggedIn: false,
  session: '',
  userName: '',
};

export function systemReducer(
  state = initialState,
  action: SystemActionTypes,
): SystemState {
  switch (action.type) {
    case SYSTEM_UPDATE:
      return {
        ...state,
        ...action.payload,
      };
    case SYSTEM_REGISTER: 
      return {
        ...state,
        ...action.payload
      }
    default:
      return state;
  }
}
