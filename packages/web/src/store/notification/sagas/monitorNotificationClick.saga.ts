import { call, put } from 'redux-saga/effects';
import { waitForNotificationClicked } from 'services';
import { NOTIFICATION_CLICKED } from '../actions';

export function* monitorNotificationClick() {
  const payload = yield call(waitForNotificationClicked);
  yield put({
    type: NOTIFICATION_CLICKED,
    payload,
  });
}
