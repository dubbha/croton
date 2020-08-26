import { expectSaga } from 'redux-saga-test-plan';
import { push } from 'connected-react-router';
import { call } from 'redux-saga/effects';

import { http } from 'services';

import { handleAuthViaSocials } from './handleAuthViaSocials.saga';

jest.mock('connected-react-router', () => ({
  push: (path: string) => ({ type: 'callHistoryMethod', payload: { path } }),
}));

describe('system/handleAuthViaSocial', () => {
  const accessToken = 'someMock235678765t';
  const email = 'somemockemail@mock.com';
  const token = 'RETURNED_SECURITY_TOKEN_FROM_BACK';

  const data = {
    id: 'ID',
    fistName: 'FIRST_NAME',
    lastName: 'LAST_NAME',
    email,
  };
  const apiEndpoint = 'https://some-mock-api.endpoint.com';
  const successActionType = 'SOME_MOCK_SUCCESS_ACTION';
  const errorActionType = 'SOME_MOCK_ERROR_ACTION';

  it('should call provided endpoint', () => {
    jest
      .spyOn(http, 'post')
      .mockImplementationOnce(() =>
        Promise.resolve({ data: { ...data, token } }));

    return expectSaga(handleAuthViaSocials, {
      accessToken,
      apiEndpoint,
      successActionType,
      errorActionType,
      email,
    })
      .provide([
        [
          call([localStorage, localStorage.setItem], 'authToken', token),
          undefined,
        ],
      ])
      .call(http.post, apiEndpoint, { access_token: accessToken, email })
      .call([localStorage, localStorage.setItem], 'authToken', token)
      .put({
        type: successActionType,
        payload: data,
      })
      .put(push('/profile'))
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
      }));

    return expectSaga(handleAuthViaSocials, {
      accessToken,
      apiEndpoint,
      successActionType,
      errorActionType,
    })
      .put({
        type: errorActionType,
        payload: { error: 'Error' },
      })
      .silentRun();
  });
});
