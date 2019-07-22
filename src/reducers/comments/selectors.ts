import {createSelector} from 'reselect';

import NameSpace from '../name-spaces';
import {MovieComments} from '../../types';

const getMovieComments = (state, movieId): MovieComments => {
  return state[NameSpace.COMMENTS][movieId] || {
    loading: false,
    loaded: false,
    loadingError: false,
    comments: [],
  };
};

export const makeGetMovieComments = () => {
  return createSelector(
    [getMovieComments],
    (commentsData) => {
      const {
        loading = false,
        loaded = false,
        loadingError = false,
        comments = [],
      } = commentsData;

      comments.sort((comment1, comment2) => {
        return new Date(comment2.date).getTime() - new Date(comment1.date).getTime();
      });

      return {
        loading,
        loaded,
        loadingError,
        comments,
      };
    }
  );
};
