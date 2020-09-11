import { call, put, takeLatest } from 'redux-saga/effects';
import { http } from 'services';
import {
  SHELF_ADD_FLOWER_IMAGES,
  SHELF_ADD_FLOWER_IMAGES_SUCCESS,
  SHELF_ADD_FLOWER_IMAGES_ERROR,
  ShelfAddFlowerImages,
} from '../actions';

function* handle(action: ShelfAddFlowerImages) {
  const { flowerId, images } = action.payload;

  try {
    yield call(
      http.post,
      '/shelf/flower-add-images',
      { flowerId, images },
    );
    yield put({
      type: SHELF_ADD_FLOWER_IMAGES_SUCCESS,
      payload: { info: 'Added successfully' },
    });
  } catch (e) {
    yield put({
      type: SHELF_ADD_FLOWER_IMAGES_ERROR,
      payload: { error: e.response.data.message || e.message },
    });
  }
}

export function* shelfAddFlowerImagesSaga() {
  yield takeLatest(SHELF_ADD_FLOWER_IMAGES, handle);
}
