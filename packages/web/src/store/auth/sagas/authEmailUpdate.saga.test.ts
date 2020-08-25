import { expectSaga } from 'redux-saga-test-plan';
import { push } from 'connected-react-router';
import { http } from 'services';
import {
  AUTH_UPDATE_EMAIL,
  AUTH_UPDATE_EMAIL_SUCCESS,
  AUTH_UPDATE_EMAIL_ERROR,
} from '../actions';
import { authEmailUpdateSaga } from './authEmailUpdate.saga';

jest.mock('services', () => ({
  http: {
    post: jest.fn(),
  },
}));

jest.mock('connected-react-router', () => ({
  push: (path: string) => ({ type: 'callHistoryMethod', payload: { path } }),
}));

const data = {
  id: 'ID',
  fistName: 'FIRST_NAME',
  lastName: 'LAST_NAME',
  email: 'EMAIL',
  token: 'TOKEN',
};
const emailUpdatePayload = {
  email: 'admin@admin.com',
  emailResetToken: 'admin',
};
const errorMessage = 'Error';
const tokenParseErrorMessage = 'Token parse error';

describe('system/authEmailUpdateSaga', () => {
  it('should call api', () => {
    jest
      .spyOn(http, 'post')
      .mockImplementationOnce(() => Promise.resolve({ data }));

    const { token, ...userData } = data;

    return expectSaga(authEmailUpdateSaga)
      .call(http.post, '/management/email-update', {
        ...emailUpdatePayload,
      })
      .call([localStorage, localStorage.setItem], 'authToken', token)
      .put({
        type: AUTH_UPDATE_EMAIL_SUCCESS,
        payload: { ...userData },
      })
      .put(push('/profile'))
      .dispatch({
        type: AUTH_UPDATE_EMAIL,
        payload: { ...emailUpdatePayload },
      })
      .silentRun();
  });

  it('should handle error', () => {
    jest.spyOn(http, 'post').mockImplementationOnce(() =>
      Promise.reject({
        response: {
          data: {
            message: errorMessage,
          },
        },
      }));

    return expectSaga(authEmailUpdateSaga)
      .put({
        type: AUTH_UPDATE_EMAIL_ERROR,
        payload: { error: errorMessage },
      })
      .dispatch({
        type: AUTH_UPDATE_EMAIL,
        payload: { ...emailUpdatePayload },
      })
      .silentRun();
  });

  it('should handle token parse error', () => expectSaga(authEmailUpdateSaga)
    .put({
      type: AUTH_UPDATE_EMAIL_ERROR,
      payload: { error: tokenParseErrorMessage },
    })
    .dispatch({
      type: AUTH_UPDATE_EMAIL,
      payload: { emailResetToken: '' },
    })
    .silentRun());
});
