import {createSelector} from 'reselect';

import NameSpace from '../name-spaces';
import {Movie} from '../../types';

export const getMovies = (state): Movie[] => state[NameSpace.MOVIES].movies || [];
export const getMoviesLoaded = (state): boolean => state[NameSpace.MOVIES].moviesLoaded;
export const getMoviesLoading = (state): boolean => state[NameSpace.MOVIES].moviesLoading;
export const getMoviesLoadingError = (state): string => state[NameSpace.MOVIES].moviesLoadingError;

export const getGenres = createSelector(
  [getMovies],
  (result) => {
      return [...new Set(result.map((it) => it.genre))];
  }
);

export const getMovieById = (state, movieId) => {
  return getMovies(state).find((movie) => movie.id === movieId);
};

export const getMoviesByGenre = (state, genre) => {
  return getMovies(state).filter((movie) => movie.genre === genre);
};

export const getPromo = (state): Movie => state[NameSpace.MOVIES].promo;
export const getPromoLoaded = (state): boolean => state[NameSpace.MOVIES].loaded;
export const getPromoLoading = (state): boolean => state[NameSpace.MOVIES].loading;
export const getPromoLoadingError = (state): string => state[NameSpace.MOVIES].loadingError;
