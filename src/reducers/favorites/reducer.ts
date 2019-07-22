import {ActionType} from './actions';
import {Movie} from '../../types';

interface IFavoritesState {
  favorites: Movie[],
  loaded: boolean,
  loading: boolean,
  loadingError: string,
  statusChange: any
}

const initialState: IFavoritesState  = {
  favorites: [],
  loaded: true,
  loading: false,
  loadingError: null,
  statusChange: {},
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.FAVORITES_LOAD:
      return {
        ...state,
        loading: true,
        loadingError: null
      };

    case ActionType.FAVORITES_LOAD_SUCCESS:
      return {
        ...state,
        favorites: action.payload,
        loaded: true,
        loading: false,
        loadingError: null
      };

    case ActionType.FAVORITES_LOAD_ERROR:
      return {
        ...state,
        loading: false,
        loadingError: action.payload
      };

    case ActionType.FAVORITES_CHANGE:
      return {
        ...state,
        statusChange: {
          ...state.statusChange,
          [action.payload.id]: {
            sending: true,
            send: false,
            sendingError: null,
          }
        }
      };

    case ActionType.FAVORITES_CHANGE_SUCCESS:
      const movieWasRemovedFromFavorites = !action.payload.isFavorite;
      return {
        ...state,
        favorites: movieWasRemovedFromFavorites ? state.favorites :
          state.favorites.filter((movie) => movie.id !== action.payload.id),
        statusChange: {
          ...state.statusChange,
          [action.payload.id]: {
            sending: false,
            send: true,
            sendingError: null,
          }
        }
      };

    case ActionType.FAVORITES_CHANGE_ERROR:
      return {
        ...state,
        statusChange: {
          ...state.statusChange,
          [action.payload.movie.id]: {
            sending: false,
            send: false,
            sendingError: action.payload.error,
          }
        }
      };
  }

  return state;
};

export {reducer};
