import {Movie} from '../../types';

enum ActionType {
  FAVORITES_LOAD = 'FAVORITES_LOAD',
  FAVORITES_LOAD_SUCCESS = 'FAVORITES_LOAD_SUCCESS',
  FAVORITES_LOAD_ERROR = 'FAVORITES_LOAD_ERROR',
  FAVORITES_CHANGE = 'FAVORITES_CHANGE',
  FAVORITES_CHANGE_SUCCESS = 'FAVORITES_CHANGE_SUCCESS',
  FAVORITES_CHANGE_ERROR = 'FAVORITES_CHANGE_ERROR',
}

const ActionCreator = {
  loadFavorites: () => ({
    type: ActionType.FAVORITES_LOAD
  }),

  loadFavoritesSuccess: (data: Movie[]) => ({
    type: ActionType.FAVORITES_LOAD_SUCCESS,
    payload: data
  }),

  loadFavoritesError: (error: string) => ({
    type: ActionType.FAVORITES_LOAD_ERROR,
    payload: error
  }),

  changeFavorites: (movie: Movie) => ({
    type: ActionType.FAVORITES_CHANGE,
    payload: movie
  }),

  changeFavoritesSuccess: (movie: Movie) => ({
    type: ActionType.FAVORITES_CHANGE_SUCCESS,
    payload: movie
  }),

  changeFavoritesError: (movie: Movie, error: string) => ({
    type: ActionType.FAVORITES_CHANGE_ERROR,
    payload: {movie, error}
  }),
};

export {ActionType, ActionCreator};
