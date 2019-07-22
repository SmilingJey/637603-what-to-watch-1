import {Movie} from '../../types';

enum ActionType {
  MOVIES_LOAD = 'MOVIES_LOAD',
  MOVIES_LOADED = 'MOVIES_LOADED',
  MOVIES_LOADING_ERROR = 'MOVIES_LOADING_ERROR',
  MOVIES_UPDATE_MOVIE = 'MOVIES_UPDATE_MOVIE',
  PROMO_LOAD = 'PROMO_LOAD',
  PROMO_LOADED = 'PROMO_LOADED',
  PROMO_LOADING_ERROR = 'PROMO_LOADING_ERROR',
}

const ActionCreator = {
  moviesLoad: () => ({
    type: ActionType.MOVIES_LOAD,
  }),

  moviesLoaded: (movies: Movie[]) => ({
    type: ActionType.MOVIES_LOADED,
    payload: movies,
  }),

  moviesLoadingError: (error: string) => ({
    type: ActionType.MOVIES_LOADING_ERROR,
    payload: error,
  }),

  updateMovie: (movie: Movie) => ({
    type: ActionType.MOVIES_UPDATE_MOVIE,
    payload: movie,
  }),

  promoLoad: () => ({
    type: ActionType.PROMO_LOAD,
  }),

  promoLoaded: (movie: Movie) => ({
    type: ActionType.PROMO_LOADED,
    payload: movie,
  }),

  promoLoadingError: (error: string) => ({
    type: ActionType.PROMO_LOADING_ERROR,
    payload: error,
  }),
};

export {ActionType, ActionCreator};
