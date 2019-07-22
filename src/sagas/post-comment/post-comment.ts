import {call, put, takeLatest} from 'redux-saga/effects';

import {ActionCreator, ActionType} from '../../reducers/post-comment/actions';
import {postComment} from '../../services/commnets';

export function* workerPostComment(action) {
  try {
    yield call(postComment, action.payload.movieId, action.payload.data);
    yield put(ActionCreator.postCommentSuccess(action.payload.movieId));
  } catch (error) {
    yield put(ActionCreator.postCommentError(action.payload.movieId, error.message));
  }
}

export function* watchPostComment() {
  yield takeLatest(ActionType.POST_COMMENT, workerPostComment);
}
