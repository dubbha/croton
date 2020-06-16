import 'dotenv/config';
import * as typeorm from 'typeorm';

import AuthenticationService from './authentication.service';
import RegistrationDto from './registration.dto';
import UserWithThatEmailAlreadyExists from '../exceptions/user-with-that-email-already-exists.exception';
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

    xdescribe('#register', () => {
        let registrationData: RegistrationDto;

        beforeEach(() => {
            registrationData = {
                email: 'email',
                name: 'name',
                password: 'password'
            }
        });

        it('should register and login user', async () => {
            spyOn(typeorm, 'getRepository').and.returnValue({
                findOne: () => Promise.resolve(),
                save: () => Promise.resolve(user)
            });

            await expect(authenticationService.register(registrationData))
                .resolves.toEqual(userWithToken);
        });

        it('should throw error if user with email already exists', async () => {
            spyOn(typeorm, 'getRepository').and.returnValue({
                findOne: () => Promise.resolve({})
            });

            await expect(authenticationService.register(registrationData))
                .rejects.toEqual(new UserWithThatEmailAlreadyExists(registrationData.email));
        });
    });
});
