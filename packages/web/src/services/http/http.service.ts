import axios, { AxiosRequestConfig } from 'axios';
import { api } from 'config';

export interface Config extends AxiosRequestConfig {
  preventUnauthorizedInterceptor?: boolean;
}

const config: Config = {
  baseURL: api,
};

export const http = axios.create(config);

http.interceptors.request.use(
  request => {
    const token = localStorage.getItem('authToken');
    if (token) {
      request.headers.authorization = token; // eslint-disable-line no-param-reassign
    }
    return request;
  },
  error => Promise.reject(error),
);

http.interceptors.response.use(
  response => response,
  error => {
    if (error.response.status === 401 && !error.config.preventUnauthorizedInterceptor) {
      localStorage.clear();
      window.location.pathname = '/signin';
    }
    return Promise.reject(error);
  },
);
