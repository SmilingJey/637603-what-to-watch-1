import {ActionType} from './actions';

const initialState = {};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.POST_COMMENT:
      return {
        ...state,
        [action.payload.movieId]: {
          sending: true,
          success: false,
          error: null,
        }
      };

    case ActionType.POST_COMMENT_SUCCESS:
      return {
        ...state,
        [action.payload.movieId]: {
          sending: false,
          success: true,
          error: null,
        }
      };

    case ActionType.POST_COMMENT_ERROR:
      return {
        ...state,
        [action.payload.movieId]: {
          sending: false,
          success: false,
          error: action.payload.error,
        }
      };
  }

  return state;
};

export {reducer};
