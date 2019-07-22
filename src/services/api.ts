import axios from 'axios';
import {history} from '../helpers/history';
import {ActionCreator as UserActionCreator} from '../reducers/user/actions';
import store from '../reducers/store';

export const BASE_URL = `https://es31-server.appspot.com/wtw`;

const onLoginFail = (response) => {
  if (response && response.config.url !== `${BASE_URL}/login`) {
     store.dispatch(UserActionCreator.clearUserData());
     history.push(`/login`);
  }
};

const onFail = (error) => {
  if (error.response && error.response.status === 403) {
    onLoginFail(error.response);
  }
  return Promise.reject(error);
};

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 1000 * 5,
  withCredentials: true,
});

api.interceptors.response.use(undefined, onFail);

export default api;
