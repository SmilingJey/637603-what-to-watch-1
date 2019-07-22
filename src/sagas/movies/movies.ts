import {call, put, takeLatest} from 'redux-saga/effects';

import {ActionCreator, ActionType} from '../../reducers/movies/actions';
import {loadMovies, loadPromo} from '../../services/movies';

export function* workerLoadMovies() {
  try {
    const data = yield call(loadMovies);
    yield put(ActionCreator.moviesLoaded(data));
  } catch (error) {
    yield put(ActionCreator.moviesLoadingError(error.message));
  }
}

export function* watchLoadMovies() {
  yield takeLatest(ActionType.MOVIES_LOAD, workerLoadMovies);
}

export function* workerLoadPromo() {
  try {
    const data = yield call(loadPromo);
    yield put(ActionCreator.promoLoaded(data));
  } catch (error) {
    yield put(ActionCreator.promoLoadingError(error.message));
  }
}

export function* watchLoadPromo() {
  yield takeLatest(ActionType.PROMO_LOAD, workerLoadPromo);
}
