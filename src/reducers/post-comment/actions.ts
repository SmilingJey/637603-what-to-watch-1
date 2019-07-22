import {UserComment} from '../../types';

enum ActionType {
  POST_COMMENT = 'POST_COMMENT',
  POST_COMMENT_SUCCESS = 'POST_COMMENT_SUCCESS',
  POST_COMMENT_ERROR = 'POST_COMMENT_ERROR',
}

const ActionCreator = {
  postComment: (movieId, data) => ({
    type: ActionType.POST_COMMENT,
    payload: {movieId, data}
  }),

  postCommentSuccess: (movieId) => ({
    type: ActionType.POST_COMMENT_SUCCESS,
    payload: {movieId}
  }),

  postCommentError: (movieId, error) => ({
    type: ActionType.POST_COMMENT_ERROR,
    payload: {movieId, error}
  }),
};

export {ActionType, ActionCreator};
