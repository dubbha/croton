import { LOCATION_CHANGE } from 'connected-react-router';
import { authReducer, initialState } from './reducer';
import {
  AUTH_LOGIN,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGIN_ERROR,
  AUTH_REGISTER,
  AUTH_REGISTER_SUCCESS,
  AUTH_REGISTER_ERROR,
  AUTH_LOGOUT,
  AUTH_RESET_PASSWORD,
  AUTH_RESET_PASSWORD_SUCCESS,
  AUTH_RESET_PASSWORD_ERROR,
  AUTH_UPDATE_PASSWORD,
  AUTH_UPDATE_PASSWORD_SUCCESS,
  AUTH_UPDATE_PASSWORD_ERROR
} from './actions';

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
    const payload = { id: 123, name: 'NAME', email: 'EMAIL', token: 'TOKEN' };
    expect(
      authReducer(initialState, {
        type: AUTH_LOGIN_SUCCESS,
        payload
      })
    ).toEqual({
      ...initialState,
      ...payload
    });
  });

  it('should handle login error', () => {
    const state = { ...initialState, isLoading: true };
    const payload = { error: 'ERROR' };
    expect(
      authReducer(state, {
        type: AUTH_LOGIN_ERROR,
        payload
      })
    ).toEqual({
      ...initialState,
      ...payload
    });
  });

  it('should  handle register', () => {
    expect(
      authReducer(initialState, {
        type: AUTH_REGISTER,
        payload: { email: 'EMAIL', password: 'PASSWORD', name: 'NAME' }
      })
    ).toEqual({
      ...initialState,
      isLoading: true,
      error: null,
      info: null
    });
  });

  it('should  handle register success', () => {
    const state = { ...initialState, isLoading: true };
    expect(
      authReducer(state, {
        type: AUTH_REGISTER_SUCCESS
      })
    ).toEqual({
      ...state,
      isLoading: false
    });
  });

  it('should  handle register error', () => {
    const state = { ...initialState, isLoading: true };
    const payload = { error: 'ERROR' };
    expect(
      authReducer(state, {
        type: AUTH_REGISTER_ERROR,
        payload
      })
    ).toEqual({
      ...initialState,
      ...payload
    });
  });

  it('should handle logout', () => {
    const state = {
      ...initialState,
      id: 123,
      name: 'NAME',
      email: 'EMAIL',
      token: 'TOKEN'
    };
    expect(authReducer(state, { type: AUTH_LOGOUT })).toEqual({
      ...initialState
    });
  });

  it('should  handle reset password', () => {
    const state = { ...initialState, error: 'ERROR', info: 'INFO' };
    expect(
      authReducer(state, {
        type: AUTH_RESET_PASSWORD,
        payload: { email: 'EMAIL' }
      })
    ).toEqual({
      ...initialState,
      isLoading: true,
      error: null,
      info: null
    });
  });

  it('should  handle reset password success', () => {
    const state = { ...initialState, isLoading: true };
    const payload = { info: 'INFO' };
    expect(
      authReducer(state, {
        type: AUTH_RESET_PASSWORD_SUCCESS,
        payload
      })
    ).toEqual({
      ...state,
      ...payload,
      isLoading: false
    });
  });

  it('should  handle reset password error', () => {
    const state = { ...initialState, isLoading: true, info: 'INFO' };
    const payload = { error: 'ERROR' };
    expect(
      authReducer(state, {
        type: AUTH_RESET_PASSWORD_ERROR,
        payload
      })
    ).toEqual({
      ...initialState,
      ...payload,
      isLoading: false,
      info: null
    });
  });

  it('should handle update password', () => {
    const state = { ...initialState, error: 'ERROR', info: 'INFO' };
    expect(
      authReducer(state, {
        type: AUTH_UPDATE_PASSWORD,
        payload: { token: 'TOKEN', password: 'PASS' }
      })
    ).toEqual({
      ...initialState,
      isLoading: true,
      error: null,
      info: null
    });
  });

  it('should handle update password success', () => {
    const state = { ...initialState, isLoading: true };
    const payload = { info: 'INFO' };
    expect(
      authReducer(state, {
        type: AUTH_UPDATE_PASSWORD_SUCCESS,
        payload
      })
    ).toEqual({
      ...state,
      ...payload,
      isLoading: false
    });
  });

  it('should handle update password error', () => {
    const state = { ...initialState, isLoading: true, info: 'INFO' };
    const payload = { error: 'ERROR' };
    expect(
      authReducer(state, {
        type: AUTH_UPDATE_PASSWORD_ERROR,
        payload
      })
    ).toEqual({
      ...initialState,
      ...payload,
      isLoading: false,
      info: null
    });
  });

  it('should reset error and info on location change', () => {
    const state = { ...initialState, error: 'ERROR', info: 'INFO' };
    expect(
      authReducer(state, {
        type: LOCATION_CHANGE,
        payload: {
          isFirstRendering: true,
          location: {
            pathname: 'PATHNAME',
            search: 'SEARCH',
            state: 'STATE',
            hash: 'HASH'
          },
          action: 'PUSH'
        }
      })
    ).toEqual({
      ...initialState,
      isLoading: false,
      info: null
    });
  });
});
