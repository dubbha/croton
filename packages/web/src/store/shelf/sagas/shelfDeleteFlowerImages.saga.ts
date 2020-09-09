import { call, put, takeLatest } from 'redux-saga/effects';
import { http } from 'services';
import {
  SHELF_DELETE_FLOWER_IMAGES,
  SHELF_DELETE_FLOWER_IMAGES_SUCCESS,
  SHELF_DELETE_FLOWER_IMAGES_ERROR,
  SHELF_GET_FLOWER,
  ShelfDeleteFlowerImages,
} from '../actions';

function* handle(action: ShelfDeleteFlowerImages) {
  const { flowerId, imageIds } = action.payload;

  try {
    yield call(
      http.post,
      '/shelf/flower-delete-images',
      { flowerId, imageIds },
    );
    yield put({
      type: SHELF_DELETE_FLOWER_IMAGES_SUCCESS,
      payload: { info: 'Deleted successfully' },
    });
    yield put({
      type: SHELF_GET_FLOWER,
      payload: { id: flowerId },
    });
  } catch (e) {
    yield put({
      type: SHELF_DELETE_FLOWER_IMAGES_ERROR,
      payload: { error: e.response.data.message || e.message },
    });
  }
}

export function* shelfDeleteFlowerImagesSaga() {
  yield takeLatest(SHELF_DELETE_FLOWER_IMAGES, handle);
}
