import {UserComment} from '../../types';

enum ActionType {
  COMMENTS_LOAD = 'COMMENTS_LOAD',
  COMMENTS_LOAD_SUCCESS = 'COMMENTS_LOAD_SUCCESS',
  COMMENTS_LOAD_ERROR = 'COMMENTS_LOAD_ERROR',
}

const ActionCreator = {
  loadComments: (movieId) => ({
    type: ActionType.COMMENTS_LOAD,
    payload: movieId
  }),

  loadCommentsSuccess: (movieId: number, comments: UserComment) => ({
    type: ActionType.COMMENTS_LOAD_SUCCESS,
    payload: {movieId, comments}
  }),

  loadCommentsError: (movieId: number, error: string) => ({
    type: ActionType.COMMENTS_LOAD_ERROR,
    payload: {movieId, error}
  }),
};

export {ActionType, ActionCreator};
