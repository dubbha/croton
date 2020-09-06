import * as typeorm from 'typeorm';

import MockProvidersAuthService from '../providers-auth/providers-auth.service';

import AuthenticationController from './authentication.controller';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mockGetRepository = jest.fn();

(typeorm as any).getRepository = mockGetRepository;

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
  jest.spyOn(typeorm, 'getConnection').mockImplementation((() => {}) as any);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  jest.spyOn(typeorm, 'EntityManager').mockImplementation(function() {
    return { getRepository: mockGetRepository };
  } as any);
});

describe('AuthenticationController', () => {
  let authenticationController: AuthenticationController;

  it('should create', () => {
    authenticationController = new AuthenticationController();
    expect(authenticationController).toBeTruthy();
  });
});
