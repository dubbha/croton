import { call, put } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import { http } from 'services';

interface HandleAuthViaSocialsPayload {
  accessToken: string;
  apiEndpoint: string;
  successActionType: string;
  errorActionType: string;
  email?: string;
}

export function* handleAuthViaSocials({
  accessToken,
  apiEndpoint,
  successActionType,
  errorActionType,
  email,
}: HandleAuthViaSocialsPayload) {
  try {
    const result = yield call(http.post, apiEndpoint, {
      access_token: accessToken,
      email,
    });
    yield put({
      type: successActionType,
      payload: result.data,
    });
    yield put(push('/profile'));
  } catch (e) {
    yield put({
      type: errorActionType,
      payload: { error: e.response.data.message },
    });
  }
}
