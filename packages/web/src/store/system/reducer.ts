import { SystemState, SystemActionTypes, SYSTEM_UPDATE } from './actions';

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
    default:
      return state;
  }
}
