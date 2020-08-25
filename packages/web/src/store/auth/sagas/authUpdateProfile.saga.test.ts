import { expectSaga } from 'redux-saga-test-plan';
import { http } from 'services';
import { AUTH_UPDATE_PROFILE, AUTH_UPDATE_PROFILE_SUCCESS, AUTH_UPDATE_PROFILE_ERROR } from '../actions';
import { authUpdateProfileSaga } from './authUpdateProfile.saga';

jest.mock('services', () => ({
  http: {
    post: jest.fn(),
  },
}));

const profile = { firstName: 'John', lastName: 'Doe' };

describe('authUpdateProfileSaga', () => {
  it('should call api', () => {
    jest.spyOn(http, 'post').mockImplementationOnce(() =>
      Promise.resolve({}));

    return expectSaga(authUpdateProfileSaga)
      .call(http.post, '/management/user-update', profile)
      .put({
        type: AUTH_UPDATE_PROFILE_SUCCESS,
        payload: {
          info: 'Profile updated',
          ...profile,
        },
      })
      .dispatch({
        type: AUTH_UPDATE_PROFILE,
        payload: { ...profile },
      })
      .silentRun();
  });

  it('should handle error', () => {
    jest.spyOn(http, 'post').mockImplementationOnce(() =>
      Promise.reject({
        response: {
          data: {
            message: 'Error',
          },
        },
      }));

    return expectSaga(authUpdateProfileSaga)
      .put({
        type: AUTH_UPDATE_PROFILE_ERROR,
        payload: { error: 'Error' },
      })
      .dispatch({
        type: AUTH_UPDATE_PROFILE,
        payload: profile,
      })
      .silentRun();
  });
});
