import 'dotenv/config';
import * as typeorm from 'typeorm';

import passport from 'passport';

import * as tokenizedUserApi from '../utils/create-tokenized-user';

import ProvidersAuthService from './providers-auth.service';

const mockPassportUse = jest.fn();
const mockGetRepository = jest.fn();

const mockCreateTokenizedUser = jest.fn();
const mockPassportAuthenticate = jest.fn();

const accessToken = 'mockToken123456789098';
const refreshToken = 'mockRefreshToken123456789098';

const firstName = 'John';
const familyName = 'Doe';
const displayName = 'test_user';
const email1 = 'email1@test.com';
const email2 = 'email2@test.com';
const mockFbProfile = {
  displayName,
  name: {
    firstName,
    familyName
  },
  emails: [email1, email2]
};
const mockDone = jest.fn();

// eslint-disable-next-line @typescript-eslint/no-explicit-any
(typeorm as any).getRepository = mockGetRepository;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
(passport as any).use = mockPassportUse;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
jest
  .spyOn(passport, 'authenticate')
  .mockImplementation(() => () => mockPassportAuthenticate);
// eslint-disable-next-line @typescript-eslint/no-explicit-any
(tokenizedUserApi as any).createTokenizedUser = mockCreateTokenizedUser;

jest.mock(
  'passport-facebook-token',
  () =>
    function(config: any, callback: any) {
      callback(accessToken, refreshToken, mockFbProfile, mockDone);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return config;
    }
);

jest.mock('passport-google-token', () => ({
  Strategy: function(config: any, callback: any) {
    callback(accessToken, refreshToken, mockFbProfile, mockDone);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return config;
  }
}));

describe('ProvidersAuthService', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it.only('should create', () => {
    const providersAuthService = new ProvidersAuthService();
    expect(providersAuthService).toBeTruthy();
  });

  it('should assign verify facebook login method from passport', () => {
    const providersAuthService = new ProvidersAuthService();
    expect(providersAuthService.verifyFacebookLogin).toEqual(
      mockPassportAuthenticate
    );
  });
});
