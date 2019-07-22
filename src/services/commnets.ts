import api from './api';

export const loadComments = (movieId) => {
  return api.get(`/comments/${movieId}`)
    .then((response) => {
      return response.data;
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

const prepareData = (formData) => ({
  rating: Number(formData.rating),
  comment: formData['review-text']
});

export const postComment = (movieId, formData) => {
  const data = prepareData(formData);
  return api.post(`/comments/${movieId}`, data)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      if (error.response && error.response.data && error.response.data.error) {
        throw new Error(error.response.data.error);
      } else if (typeof error === `string`) {
        throw new Error(error);
      } else {
        throw new Error(`Submitting error. `);
      }
    });
};
