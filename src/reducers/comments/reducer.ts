import {ActionType} from './actions';

const initialState = {};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.COMMENTS_LOAD:
      return {
        ...state,
        [action.payload.movieId]: {
          loading: true,
          loaded: state[action.payload.movieId] && state[action.payload.movieId].loaded,
          loadingError: null,
          comments: state[action.payload.movieId] && state[action.payload.movieId].comments,
        }
      };

    case ActionType.COMMENTS_LOAD_SUCCESS:
      return {
        ...state,
        [action.payload.movieId]: {
          loading: false,
          loaded: true,
          loadingError: null,
          comments: action.payload.comments,
        }
      };

    case ActionType.COMMENTS_LOAD_ERROR:
      return {
        ...state,
        [action.payload.movieId]: {
          loading: false,
          loaded: state[action.payload.movieId] && state[action.payload.movieId].loaded,
          loadingError: action.payload.error,
          comments: state[action.payload.movieId] && state[action.payload.movieId].comments,
        }
      };
  }

  return state;
};

export {reducer};
