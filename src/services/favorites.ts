import api from './api';
import {parseMovie} from './movies';
import {Movie} from '../types';

export const loadFavorites = () => {
  return api.get(`/favorite`)
    .then((response) => {
      return response.data.map(parseMovie);
    })
    .catch((error) => {
      if (error.response && error.response.data && error.response.data.error) {
        throw new Error(error.response.data.error);
      } else if (typeof error === `string`) {
        throw new Error(error);
      } else {
        throw new Error(`Loading error`);
      }
    });
};

export const changeFavorites = (movie: Movie) => {
  const status = movie.isFavorite ? `0` : `1`;
  return api.post(`/favorite/${movie.id}/${status}`)
    .then((response) => {
      return parseMovie(response.data);
    })
    .catch((error) => {
      if (error.response && error.response.data && error.response.data.error) {
        throw new Error(error.response.data.error);
      } else if (typeof error === `string`) {
        throw new Error(error);
      } else {
        throw new Error(`Change favorites error`);
      }
    });
};
