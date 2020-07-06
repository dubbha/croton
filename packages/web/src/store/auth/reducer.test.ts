import { authReducer, initialState } from './reducer';
import { AUTH_LOGIN, AUTH_LOGIN_SUCCESS, AUTH_LOGIN_ERROR, AUTH_LOGOUT } from './actions';

describe('store/auth/reducer', () => {
  it('should handle login', () => {
    expect(
      authReducer(initialState, {
        type: AUTH_LOGIN,
        payload: { email: 'EMAIL', password: 'PASSWORD' }
      })
    ).toEqual({
      ...initialState,
      isLoading: true
    });
  });

  it('should handle login success', () => {
    const payload = { id: 123, name: 'NAME', email: 'EMAIL', token: 'TOKEN' }
    expect(
      authReducer(initialState, {
        type: AUTH_LOGIN_SUCCESS,
        payload,
      })
    ).toEqual({
      ...initialState,
      ...payload,
    });
  });

  it('should handle login error', () => {
    const state = { ...initialState, isLoading: true };
    const payload = { error: 'ERROR' }
    expect(
      authReducer(state, {
        type: AUTH_LOGIN_ERROR,
        payload,
      })
    ).toEqual({
      ...initialState,
      ...payload,
    });
  });

  it('should handle logout', () => {
    const state = { ...initialState, id: 123, name: 'NAME', email: 'EMAIL', token: 'TOKEN' };
    expect(
      authReducer(state, { type: AUTH_LOGOUT })
    ).toEqual({
      ...initialState,
    });
  });
});
