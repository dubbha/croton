import 'dotenv/config';

import AuthenticationService from "./authentication.service";
import RegistrationDto from "./registration.dto";
import UserWithThatEmailAlreadyExists from "../exceptions/user-with-that-email-already-exists.exception";
import UserWithToken from "../interfaces/user-with-token";
import User from "../interfaces/user.interface";

describe('AuthenticationController', () => {
    const authenticationService = new AuthenticationService();
    let user: User;
    let userWithToken: UserWithToken;

    beforeEach(() => {
        user = {password: "password", email: "email", _id: "id", name: "name"};
        userWithToken = {email: "email", id: "id", name: "name", token: expect.any(String)};
    });

    it('should create', () => {
        expect(authenticationService).toBeTruthy();
    });

    describe('#register', () => {
        let registrationData: RegistrationDto;

        beforeEach(() => {
            registrationData = {
                email: 'email',
                name: 'name',
                password: 'password'
            }
        });

        it('should register and login user', async () => {
            authenticationService.user = {
                findOne: jest.fn().mockResolvedValue(undefined),
                create: jest.fn().mockResolvedValue(user)
            };

            await expect(authenticationService.register(registrationData))
                .resolves.toEqual(userWithToken);
        });

        it('should throw error if user with email already exists', async () => {
            authenticationService.user = {
                findOne: jest.fn().mockResolvedValue({})
            };

            await expect(authenticationService.register(registrationData))
                .rejects.toEqual(new UserWithThatEmailAlreadyExists(registrationData.email));
        });
    });
});
