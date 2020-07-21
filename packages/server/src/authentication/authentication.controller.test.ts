import * as typeorm from 'typeorm';

import MockProvidersAuthService from '../providers-auth/providers-auth.service';

import AuthenticationController from './authentication.controller';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
(typeorm as any).getRepository = jest.fn();

const mockApi = {
  handleAuthResult: jest.fn(),
  verifyFacebookLogin: jest.fn(),
  verifyGoogleLogin: jest.fn(),
};

jest.mock('../providers-auth/providers-auth.service');

beforeEach(() => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (MockProvidersAuthService as any).mockImplementation(function() {
    Object.assign(this, mockApi);
    return this;
  });
});

describe('AuthenticationController', () => {
  let authenticationController: AuthenticationController;

  it('should create', () => {
    authenticationController = new AuthenticationController();
    expect(authenticationController).toBeTruthy();
  });
});
