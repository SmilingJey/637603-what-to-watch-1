import {ActionType} from './actions';

const initialState = {
  moviesLoading: false,
  moviesLoadingError: null,
  moviesLoaded: false,
  movies: [],
  promoLoading: false,
  promoLoadingError: null,
  promoLoaded: false,
  promo: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.MOVIES_LOAD:
      return {
        ...state,
        moviesLoading: true,
        moviesLoadingError: null,
      };

    case ActionType.MOVIES_LOADED:
      return {
        ...state,
        moviesLoading: false,
        moviesLoadingError: null,
        moviesLoaded: true,
        movies: action.payload
      };

    case ActionType.MOVIES_LOADING_ERROR:
      return {
        ...state,
        moviesLoading: false,
        moviesLoadingError: action.payload,
      };

    case ActionType.MOVIES_UPDATE_MOVIE:
      return {
        ...state,
        promo: (state.promo && state.promo.id === action.payload.id) ?
          action.payload : state.promo,
        movies: state.movies.map((movie) => {
          if (movie.id === action.payload.id) {
            return action.payload;
          }
          return movie;
        })
      };

    case ActionType.PROMO_LOAD:
      return {
        ...state,
        promoLoading: true,
        promoLoadingError: null,
      };

    case ActionType.PROMO_LOADED:
      return {
        ...state,
        promoLoading: false,
        promoLoadingError: null,
        loaded: true,
        promo: action.payload
      };

    case ActionType.PROMO_LOADING_ERROR:
      return {
        ...state,
        promoLoading: false,
        promoLoadingError: action.payload,
      };
  }

  return state;
};

export {reducer};
