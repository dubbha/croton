import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import passport, { Profile } from 'passport';
import { Strategy as FacebookStrategy } from 'passport-facebook';

import { api } from '../api'

import UserEntity from '../models/user.entity';

import RegistrationDto from '../models/registration.dto';
import WrongCredentials from '../exceptions/wrong-creditionals.exception';

import { ProvidersIdDBFieldName, ProvidersServiceName } from './providers-auth.interfaces'

export default class ProvidersAuthService {
  private loginUser;
  private registerUser;
  private userRepository = getRepository(UserEntity);

  constructor(loginUser, registerUser) {
    this.loginUser = loginUser;
    this.registerUser = registerUser;
    this.initFacebookProviderLogin()
    return this
  }

  private async findUserByProviderId(id: string, providerIdKeyName: ProvidersIdDBFieldName): Promise<UserEntity> {
    return await this.userRepository.findOne({ [providerIdKeyName]: id });
  }

  private formatProviderProfileToRegistrationDto(profile: Profile, accessToken: string, passportIdKeyName: ProvidersIdDBFieldName): RegistrationDto {
    return {
      firstName: profile.name?.givenName || profile.displayName,
      lastName: profile.name?.familyName || profile.displayName,
      email: profile.emails[0].value,
      password: accessToken,
      [passportIdKeyName]: profile.id
    }
  }

  private async registerOrLoginUserByProviderProfile(
    accessToken: string,
    profile: Profile,
    passportIdKeyName: ProvidersIdDBFieldName
) {
      const existingUser = await this.findUserByProviderId(profile.id, passportIdKeyName)
      if(!existingUser) {
        const registrationDto = this.formatProviderProfileToRegistrationDto(profile, accessToken, passportIdKeyName)
        return await this.registerUser(registrationDto)
      }
      const { email, password } = existingUser
      return await this.loginUser({ email, password })
    }

  private async handleFacebookProviderLogin(
    accessToken: string,
    _: string,
    profile: Profile,
    done: any
  ):Promise<void> {
    try {
      const loggedInOrRegisteredUser = this.registerOrLoginUserByProviderProfile(
        accessToken,
        profile,
        ProvidersIdDBFieldName.FACEBOOK
        )
        return done(null, loggedInOrRegisteredUser)
      } catch (err) {
        done(err)
      }
  }

  private initFacebookProviderLogin () {
    const { FACEBOOK_APP_ID, FACEBOOK_APP_SECRET } = process.env
    const { getFacebookCallbackURL } = api
    const { APP_HOST, HTTPS_PORT } = process.env

    passport.use(new FacebookStrategy({
      clientID: FACEBOOK_APP_ID,
      clientSecret: FACEBOOK_APP_SECRET,
      callbackURL: getFacebookCallbackURL(APP_HOST, HTTPS_PORT)
    },
    this.handleFacebookProviderLogin.bind(this)
  ));
  }

  public getAuthenticateFacebookProvider () {
    return passport.authenticate(ProvidersServiceName.FACEBOOK as string)
  }

  public getHandleFacebookProviderCallback () {
   const { getFacebookSuccessRedirect, getFacebookFailureRedirect, } = api
   const { APP_HOST, PORT } = process.env

    return passport.authenticate(ProvidersServiceName.FACEBOOK as string,
    {
      successRedirect: getFacebookSuccessRedirect(APP_HOST, PORT),
      failureRedirect: getFacebookFailureRedirect(APP_HOST, PORT),
      session: false
    }
    );
  }

  public handleFacebookLoginSuccess(_: Request, res: Response) {
    res.send('Succesfully logged in via Facebook!')
  }

  public handleFacebookLoginFailure() {
    console.log('*** Failed logging in via Facebook! ***')
    throw new WrongCredentials();
  }

}
