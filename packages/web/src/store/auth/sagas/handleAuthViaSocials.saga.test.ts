import { expectSaga } from 'redux-saga-test-plan';
import { push } from 'connected-react-router';
import { http } from 'services';

import { handleAuthViaSocials } from './handleAuthViaSocials.saga';

jest.mock('services', () => ({
  http: { post: jest.fn() }
}));

jest.mock('connected-react-router', () => ({
  push: (path: string) => ({ type: 'callHistoryMethod', payload: { path } })
}));

describe('system/handleAuthViaSocial', () => {
  const accessToken = 'someMock235678765t';
  const data = {
    id: 'ID',
    fistName: 'FIRST_NAME',
    lastName: 'LAST_NAME',
    email: 'EMAIL',
    token: 'TOKEN'
  };
  const apiEndpoint = 'https://some-mock-api.endpoint.com';
  const successActionType = 'SOME_MOCK_SUCCESS_ACTION';
  const errorActionType = 'SOME_MOCK_ERROR_ACTION';

  it('should call provided endpoint', () => {
    jest
      .spyOn(http, 'post')
      .mockImplementationOnce(() => Promise.resolve({ data }));

    return expectSaga(handleAuthViaSocials, {
      accessToken,
      apiEndpoint,
      successActionType,
      errorActionType
    })
      .call(http.post, apiEndpoint, { access_token: accessToken })
      .put({
        type: successActionType,
        payload: data
      })
      .put(push('/profile'))
      .silentRun();
  });

  it('should hanlde error', () => {
    jest.spyOn(http, 'post').mockImplementationOnce(() =>
      Promise.reject({
        response: {
          data: {
            message: 'Error'
          }
        }
      })
    );

    return expectSaga(handleAuthViaSocials, {
      accessToken,
      apiEndpoint,
      successActionType,
      errorActionType
    })
      .put({
        type: errorActionType,
        payload: { error: 'Error' }
      })
      .silentRun();
  });
});