import 'dotenv/config';
import * as typeorm from 'typeorm';

import AuthenticationService from './authentication.service';
import UserWithToken from '../interfaces/user-with-token';
import User from '../interfaces/user.interface';

(typeorm as any).getRepository = jest.fn();

describe('AuthenticationController', () => {
    let authenticationService;
    let user: User;
    let userWithToken: UserWithToken;

    beforeEach(() => {
        user = {password: 'password', email: 'email', id: 'id', name: 'name'};
        userWithToken = {email: 'email', id: 'id', name: 'name', token: expect.any(String)};

        authenticationService = new AuthenticationService();
    });

    it('should create', () => {
        expect(authenticationService).toBeTruthy();
    });
});
