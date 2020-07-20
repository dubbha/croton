import axios from 'axios';
import { api } from 'config';

export const http = axios.create({
  baseURL: api,
})

http.interceptors.request.use(
  config => {
    const token = localStorage.getItem('authToken');
    console.log('token', token);
    if (token) {
      config.headers.authorization = token; // eslint-disable-line no-param-reassign
    }
    return config;
  },
  error => Promise.reject(error),
);
