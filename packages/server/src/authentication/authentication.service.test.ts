import 'dotenv/config';
import * as typeorm from 'typeorm';

import AuthenticationService from './authentication.service';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
(typeorm as any).getRepository = jest.fn();

describe('AuthenticationController', () => {
  let authenticationService;

  beforeEach(() => {
    authenticationService = new AuthenticationService();
  });

  it('should create', () => {
    expect(authenticationService).toBeTruthy();
  });
});
