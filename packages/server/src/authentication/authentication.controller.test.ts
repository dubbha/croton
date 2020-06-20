import * as typeorm from 'typeorm';
import AuthenticationController from './authentication.controller';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
(typeorm as any).getRepository = jest.fn();

describe('AuthenticationController', () => {
  let authenticationController;

  beforeEach(() => {
    authenticationController = new AuthenticationController();
  });

  it('should create', () => {
    expect(authenticationController).toBeTruthy();
  });
});
