import {hash, compare} from 'bcrypt';
import {getRepository} from 'typeorm';

import UserEntity from '../models/user.entity';
import RegistrationDto from './registration.dto';
import UserWithThatEmailAlreadyExists from '../exceptions/user-with-that-email-already-exists.exception';
import {createToken} from '../utils/create-token';
import UserWithToken from '../interfaces/user-with-token';
import LoginDto from './login.dto';
import WrongCredentials from '../exceptions/wrong-creditionals.exception';
import User from '../interfaces/user.interface';

export default class AuthenticationService {
  private userRepository = getRepository(UserEntity);

  public async register(
    registrationData: RegistrationDto
  ): Promise<UserWithToken> {
    if (await this.userRepository.findOne({email: registrationData.email})) {
      throw new UserWithThatEmailAlreadyExists(registrationData.email);
    } else {
      const hashedPassword = await hash(registrationData.password, 10);
      const user = await this.userRepository.save({
        ...registrationData,
        password: hashedPassword,
      });

      return this.loginUser(user as User);
    }
  }

  public async login(loginData: LoginDto): Promise<UserWithToken> {
    const user = await this.userRepository.findOne({email: loginData.email});

    if (user) {
      const isPasswordMatching = await compare(
        loginData.password,
        user.password
      );
      if (isPasswordMatching) {
        return this.loginUser(user as User);
      } else {
        throw new WrongCredentials();
      }
    } else {
      throw new WrongCredentials();
    }
  }

  private loginUser(user: User): UserWithToken {
    const tokenData = createToken(user);

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      token: tokenData.token,
    };
  }
}
