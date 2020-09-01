import axios from 'axios';
import { api } from 'config';

export const http = axios.create({
  baseURL: api,
});

http.interceptors.request.use(
  config => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.authorization = token; // eslint-disable-line no-param-reassign
    }
    return config;
  },
  error => Promise.reject(error),
);

http.interceptors.response.use(
  response => response,
  error => {
    if (error.response.status === 401) {
      localStorage.clear();
      window.location.href = '/signin';
    }
    return Promise.reject(error);
  },
);
