import {call, put, takeLatest} from 'redux-saga/effects';

import {ActionCreator, ActionType} from '../../reducers/comments/actions';
import {loadComments} from '../../services/commnets';

export function* workerLoadComments(action) {
  try {
    const data = yield call(loadComments, action.payload);
    yield put(ActionCreator.loadCommentsSuccess(action.payload, data));
  } catch (error) {
    yield put(ActionCreator.loadCommentsError(action.payload, error.message));
  }
}

export function* watchLoadComments() {
  yield takeLatest(ActionType.COMMENTS_LOAD, workerLoadComments);
}
