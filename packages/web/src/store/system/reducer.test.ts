import { systemReducer, initialState } from './reducer';
import { SYSTEM_UPDATE, SYSTEM_AUTH } from './actions';

describe('store/system/reducer', () => {
  it('should handle SYSTEM_UPDATE', () => {
    expect(
      systemReducer(
        initialState,
        {
          type: SYSTEM_UPDATE,
          payload: {
            loggedIn: true,
            session: 'SESSION',
            userName: 'USERNAME',
          }
        }
      )
    ).toEqual({
      loggedIn: true,
      session: 'SESSION',
      userName: 'USERNAME',
    });
  })

  it('should return state unchanged by default', () => {
    expect(
      systemReducer(
        initialState,
        { type: SYSTEM_AUTH, payload: { email: '', password: '' } }
      )
    ).toEqual(initialState);
  })
})