import {createSelector} from 'reselect';
import NameSpace from '../name-spaces';
import {getMovies, getGenres} from '../movies/selectors';
import {Movie} from '../../types';

const getSelectedGenre = (state): string => state[NameSpace.SELECTED_GENRE].selectedGenre;

const getMoviesForSelectedGenre = createSelector(
  getMovies,
  getSelectedGenre,
  (movies, selectedGenre): Movie[] => {
    if (!selectedGenre) {
      return movies;
    }
    return movies.filter((it) => it.genre === selectedGenre);
  }
);

export {
  getSelectedGenre,
  getMoviesForSelectedGenre
};

