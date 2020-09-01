import axios from 'axios';

jest.mock('config', () => ({ api: 'BASE' }));

describe('http.service', () => {
  afterEach(() => {
    global.localStorage.clear();
  });

  it('should set baseUrl', () => {
    jest.spyOn(axios, 'create');
    const { http } = require('./http.service');

    expect(axios.create).toBeCalledWith({ baseURL: 'BASE' });
    expect(http.defaults.baseURL).toBe('BASE');
  });

  it('should set request authorization header if token found', () => {
    global.localStorage.setItem('authToken', 'TOKEN');
    const { http } = require('./http.service');

    expect(http.interceptors.request.handlers[0].fulfilled({ headers: {} }))
      .toEqual({
        headers: {
          authorization: 'TOKEN',
        },
      });
  });

  it('should not set request authorization header if token not found', () => {
    global.localStorage.removeItem('authToken');
    const { http } = require('./http.service');

    expect(http.interceptors.request.handlers[0].fulfilled({ headers: {} }))
      .toEqual({ headers: {} });
  });

  it('should pass request error through', () => {
    const { http } = require('./http.service');
    const err = new Error('ERROR');
    http.interceptors.request.handlers[0].rejected(err)
      .catch(e => expect(e).toBe(err));
  });

  it('should clear local storage and redirect on 401 Unauthorized response error', () => {
    delete global.location;
    global.location = { pathname: '/profile' } as Location;

    const { http } = require('./http.service');

    global.localStorage.setItem('authToken', 'TOKEN');
    global.localStorage.setItem('persist:auth', 'PERSISTED_AUTH_STATE');

    expect(global.localStorage.length).toBe(2);

    const error = { response: { status: 401 } };
    http.interceptors.response.handlers[0].rejected(error)
      .catch(e => expect(e).toBe(error));

    expect(global.localStorage.length).toBe(0);
    expect(global.localStorage.getItem('authToken')).toBe(null);
    expect(global.location.pathname).toBe('/signin');
  });

  it('should not clear local storage or redirect on 401 Unauthorized response error when trying to sing in', () => {
    delete global.location;
    global.location = { pathname: '/signin' } as Location;

    const { http } = require('./http.service');

    global.localStorage.setItem('answer', '42');

    expect(global.localStorage.length).toBe(1);

    const error = { response: { status: 401 } };
    http.interceptors.response.handlers[0].rejected(error)
      .catch(e => expect(e).toBe(error));

    expect(global.localStorage.length).toBe(1);
    expect(global.localStorage.getItem('answer')).toBe('42');
    expect(global.location.pathname).toBe('/signin');
  });

  it('should pass other response errors through', () => {
    delete global.location;
    global.location = { href: '/profile' } as Location;

    const { http } = require('./http.service');

    global.localStorage.setItem('authToken', 'TOKEN');
    global.localStorage.setItem('persist:auth', 'PERSISTED_AUTH_STATE');

    expect(global.localStorage.length).toBe(2);

    const error = { response: { status: 404 } };
    http.interceptors.response.handlers[0].rejected(error)
      .catch(e => expect(e).toBe(error));

    expect(global.localStorage.length).toBe(2);
    expect(global.localStorage.getItem('authToken')).toBe('TOKEN');
    expect(global.location.href).toBe('/profile');
  });

  it('should pass successful response through', () => {
    const { http } = require('./http.service');
    const success = { response: { status: 200 } };
    expect(http.interceptors.response.handlers[0].fulfilled(success))
      .toEqual(success);
  });
});
