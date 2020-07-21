import { expectSaga } from 'redux-saga-test-plan';
import { push } from 'connected-react-router';
import { http } from 'services';
import { AUTH_EMAIL_CONFIRM, AUTH_EMAIL_CONFIRM_SUCCESS, AUTH_EMAIL_CONFIRM_ERROR } from '../actions';
import { authEmailConfirmSaga } from './authEmailConfirm.saga';

jest.mock('services', () => ({
  http: {
    post: jest.fn(),
  }
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
const emailVerificationPayload = { emailVerificationToken: 'TOKEN' };

describe('authEmailConfirmSaga', () => {
  it('should call api', () => {
    jest.spyOn(http, 'post').mockImplementationOnce(() =>
      Promise.resolve({ data })
    );

    const { token, ...userData } = data;

    return expectSaga(authEmailConfirmSaga)
      .call(http.post, '/auth/confirm', {
        ...emailVerificationPayload,
      })
      .call([localStorage, localStorage.setItem], 'authToken', token)
      .put({
        type: AUTH_EMAIL_CONFIRM_SUCCESS,
        payload: { ...userData },
      })
      .put(push('/profile'))
      .dispatch({
        type: AUTH_EMAIL_CONFIRM,
        payload: { ...emailVerificationPayload },
      })
      .silentRun();
  });

  it('should hanlde error', () => {
    jest.spyOn(http, 'post').mockImplementationOnce(() =>
      Promise.reject({
        response: {
          data: {
            message: 'Error',
          },
        },
      })
    );

    return expectSaga(authEmailConfirmSaga)
      .put({
        type: AUTH_EMAIL_CONFIRM_ERROR,
        payload: { error: 'Error' },
      })
      .dispatch({
        type: AUTH_EMAIL_CONFIRM,
        payload: { ...emailVerificationPayload },
      })
      .silentRun();
  });
});
