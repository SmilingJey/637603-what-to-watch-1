import {call, put, takeLatest, takeEvery} from 'redux-saga/effects';

import {ActionCreator, ActionType} from '../../reducers/favorites/actions';
import {ActionCreator as MoviesActionCreator} from '../../reducers/movies/actions';
import {loadFavorites, changeFavorites} from '../../services/favorites';

export function* workerLoadMovies() {
  try {
    const data = yield call(loadFavorites);
    yield put(ActionCreator.loadFavoritesSuccess(data));
  } catch (error) {
    yield put(ActionCreator.loadFavoritesError(error.message));
  }
}

export function* watchLoadFavorites() {
  yield takeLatest(ActionType.FAVORITES_LOAD, workerLoadMovies);
}

export function* workerChangeFavorite(action) {
  try {
    const movie = yield call(changeFavorites, action.payload);
    yield put(ActionCreator.changeFavoritesSuccess(action.payload));
    yield put(MoviesActionCreator.updateMovie(movie));
  } catch (error) {
    yield put(ActionCreator.changeFavoritesError(action.payload, error.message));
  }
}

export function* watchChangeFavorites() {
  yield takeEvery(ActionType.FAVORITES_CHANGE, workerChangeFavorite);
}
