import { authReducer, initialState } from './reducer';
import { AUTH_LOGIN } from './actions';

describe('store/auth/reducer', () => {
  it('should return state unchanged by default', () => {
    expect(
      authReducer(initialState, {
        type: AUTH_LOGIN,
        payload: { email: '', password: '' }
      })
    ).toEqual({
      ...initialState,
      isLoading: true
    });
  });
});
