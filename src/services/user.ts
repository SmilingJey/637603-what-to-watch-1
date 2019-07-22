import api from './api';

const prepareAuthorisationData = (data) => ({
  email: data['user-email'],
  password: data['user-password'],
});

const parseUserData = (data) => ({
  id: data.id,
  email: data.email,
  name: data.name,
  avatarUrl: `https://es31-server.appspot.com` + data.avatar_url,
});

export const submitAuthorisation = (authorisationData) => {
  const data = prepareAuthorisationData(authorisationData);
  return api.post(`/login`, data)
    .then((response) => {
      try {
        return parseUserData(response.data);
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
        throw new Error(`Login error`);
      }
    });
};

export const requestAuthorisation = () => {
  return api.get(`/login`)
    .then((response) => {
      try {
        return parseUserData(response.data);
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
        throw new Error(`Get authorisation data error`);
      }
    });
};

export const authorisationLogout = () => {
  return api.get(`/logout`);
};
