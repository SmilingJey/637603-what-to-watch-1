import api from './api';

export const parseMovie = (data) => ({
  name: data.name,
  posterImage: data.poster_image,
  previewImage: data.preview_image,
  backgroundImage: data.background_image,
  description: data.description,
  rating: data.rating,
  scoresCount: data.scores_count,
  director: data.director,
  starring: data.starring,
  runTime: data.run_time,
  genre: data.genre,
  released: data.released,
  id: data.id,
  isFavorite: data.is_favorite,
  videoLink: data.video_link,
  previewVideoLink: data.preview_video_link,
});

export const loadMovies = () => {
  return api.get(`/films`)
        .then((response) => {
          try {
            return response.data.map(parseMovie);
          } catch (e) {
            throw new Error(`Invalid data format`);
          }
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

export const loadPromo = () => {
  return api.get(`/films/promo`)
    .then((response) => {
      try {
        return parseMovie(response.data);
      } catch (e) {
        throw new Error(`Invalid data format`);
      }
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
