import {call, put, takeLatest} from "redux-saga/effects";

import {ActionCreator, ActionType} from "../../reducers/user/actions";
import {ActionCreator as MovieActionCreator} from "../../reducers/movies/actions";
import {submitAuthorisation, requestAuthorisation, authorisationLogout} from '../../services/user';

export function* workerAuthorisationSubmit(action) {
  try {
    const data = yield call(submitAuthorisation, action.payload);
    yield put(ActionCreator.submitAuthorisationSuccess(data));
  } catch (error) {
    yield put(ActionCreator.submitAuthorisationError(error.message));
  }
}

export function* watchAuthorisationSubmit() {
  yield takeLatest(ActionType.AUTHORISATION_SUBMIT, workerAuthorisationSubmit);
}

export function* workerGetAuthorisationData() {
  try {
    const data = yield call(requestAuthorisation);
    yield put(ActionCreator.requestAuthorisationSuccess(data));
  } catch (error) {
    yield put(ActionCreator.requestAuthorisationError(error.message));
  }
}

export function* watchAuthorisationRequst() {
  yield takeLatest(ActionType.AUTHORISATION_REQUEST, workerGetAuthorisationData);
}

export function* workerGetAuthorisationLogout() {
  try {
    yield call(authorisationLogout);
    yield put(MovieActionCreator.moviesLoad());
    yield put(MovieActionCreator.promoLoad());
  } catch (error) {
    console.log(`logout error`);
  }
}

export function* watchAuthorisationLogout() {
  yield takeLatest(ActionType.AUTHORISATION_LOGOUT, workerGetAuthorisationLogout);
}
