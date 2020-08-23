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
  AUTH_UPDATE_PASSWORD_ERROR,
  AUTH_EMAIL_CONFIRM,
  AUTH_EMAIL_CONFIRM_SUCCESS,
  AUTH_FACEBOOK_SUCCESS,
  AUTH_FACEBOOK,
  AUTH_EMAIL_CONFIRM_ERROR,
  AUTH_FACEBOOK_ERROR,
  AUTH_GOOGLE,
  AUTH_GOOGLE_ERROR,
  AUTH_GOOGLE_SUCCESS,
  AUTH_UPDATE_EMAIL_SUCCESS,
} from './actions';

describe('store/auth/reducer', () => {
  const authResult = {
    id: 123,
    firstName: 'FIRST_NAME',
    lastName: 'LAST_NAME',
    email: 'EMAIL',
    token: 'TOKEN',
  };

  const socialProfile = {
    facebookId: 'someFacebookId',
    pictureUrl: 'https://some-picture-url.com',
  };

  const authError = 'AUTH WENT WRONG!!!';

  const info = 'Some succesful auth event probably has happened, but details are not important';

  describe('loading start', () => {
    const actions = [
      AUTH_UPDATE_PASSWORD,
      AUTH_RESET_PASSWORD,
      AUTH_FACEBOOK,
      AUTH_REGISTER,
      AUTH_LOGIN,
      AUTH_GOOGLE,
    ];

    actions.forEach(action => {
      describe(action, () => {
        it('should start loading', () => {
          expect(
            authReducer(initialState, {
              type: action as any,
            }),
          ).toEqual({
            ...initialState,
            isLoading: true,
            error: null,
            info: null,
          });
        });
      });
    });
  });

  describe('authantication result', () => {
    const actions = [
      AUTH_EMAIL_CONFIRM_SUCCESS,
      AUTH_UPDATE_EMAIL_SUCCESS,
      AUTH_LOGIN_SUCCESS,
    ];

    actions.forEach(action => {
      describe(action, () => {
        it('should handle succesfull authantication', () => {
          const { token, ...userData } = authResult; // eslint-disable-line @typescript-eslint/no-unused-vars
          expect(
            authReducer(
              { ...initialState, isLoading: true },
              {
                type: action as any,
                payload: { ...authResult },
              },
            ),
          ).toEqual({
            ...initialState,
            ...userData,
            isAuthenticated: true,
          });
        });
      });
    });
  });

  describe('authantication with socials result', () => {
    const actions = [AUTH_FACEBOOK_SUCCESS, AUTH_GOOGLE_SUCCESS];

    actions.forEach(action => {
      describe(action, () => {
        it('should handle succesfull authantication', () => {
          const { token, ...userData } = authResult; // eslint-disable-line @typescript-eslint/no-unused-vars
          expect(
            authReducer(
              { ...initialState, isLoading: true },
              {
                type: action as any,
                payload: { ...authResult, socialProfile },
              }
            )
          ).toEqual({
            ...initialState,
            ...userData,
            socialProfile,
            isSignedInWithSocial: true,
            isAuthenticated: true,
          });
        });
      });
    });
  });

  describe('errors', () => {
    const actions = [
      AUTH_EMAIL_CONFIRM_ERROR,
      AUTH_REGISTER_ERROR,
      AUTH_LOGIN_ERROR,
      AUTH_FACEBOOK_ERROR,
      AUTH_GOOGLE_ERROR,
    ];
    actions.forEach(action => {
      describe(action, () => {
        it('should handle errors during authantication', () => {
          expect(
            authReducer(
              { ...initialState, isLoading: true },
              {
                type: action as any,
                payload: { error: authError },
              },
            ),
          ).toEqual({
            ...initialState,
            error: authError,
          });
        });
      });
    });
  });

  describe('info', () => {
    const actions = [
      AUTH_UPDATE_PASSWORD_SUCCESS,
      AUTH_RESET_PASSWORD_SUCCESS,
      AUTH_REGISTER_SUCCESS,
    ];
    actions.forEach(action => {
      describe(action, () => {
        it('should save the info about result', () => {
          expect(
            authReducer(
              { ...initialState, isLoading: true },
              {
                type: action as any,
                payload: { info },
              },
            ),
          ).toEqual({
            ...initialState,
            info,
          });
        });
      });
    });
  });

  describe('info + error', () => {
    const actions = [AUTH_UPDATE_PASSWORD_ERROR, AUTH_RESET_PASSWORD_ERROR];
    actions.forEach(action => {
      describe(action, () => {
        it('should handle error and clean up info', () => {
          expect(
            authReducer(
              { ...initialState, isLoading: true, info },
              {
                type: action as any,
                payload: { error: authError },
              },
            ),
          ).toEqual({
            ...initialState,
            error: authError,
          });
        });
      });
    });
  });

  it('should handle confirm auth email', () => {
    expect(
      authReducer({ ...initialState, isLoading: false, error: authError }, {
        type: AUTH_EMAIL_CONFIRM,
      } as any),
    ).toEqual({
      ...initialState,
      isLoading: true,
    });
  });

  it('should handle logout', () => {
    const state = {
      ...initialState,
      id: 123,
      firstName: 'FIRST_NAME',
      lastName: 'LAST_NAME',
      email: 'EMAIL',
      token: 'TOKEN',
    };
    expect(authReducer(state, { type: AUTH_LOGOUT })).toEqual({
      ...initialState,
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
            hash: 'HASH',
          },
          action: 'PUSH',
        },
      }),
    ).toEqual({
      ...initialState,
      isLoading: false,
      info: null,
    });
  });
});
