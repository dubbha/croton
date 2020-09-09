import 'dotenv/config';
import * as typeorm from 'typeorm';

import AuthenticationService from './authentication.service';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
(typeorm as any).getRepository = jest.fn();

jest.spyOn(typeorm, 'getConnection').mockImplementation((() => {}) as any);
// eslint-disable-next-line @typescript-eslint/no-explicit-any
jest.spyOn(typeorm, 'EntityManager').mockImplementation(function() {
  return { getRepository: jest.fn() };
} as any);

describe('AuthenticationController', () => {
  let authenticationService: AuthenticationService;

  it('should create', () => {
    authenticationService = new AuthenticationService();
    expect(authenticationService).toBeTruthy();
  });
});
