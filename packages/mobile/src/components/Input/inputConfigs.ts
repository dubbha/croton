import {
  validatorEmail,
  validatorPassword,
  validatorRepeatPassword,
  validatorName,
  validatorCode,
  validatorLength,
} from './validators';

export const InputConfigs: { [index: string]: any } = {
  email: {
    placeholder: 'Email',
    message: 'Pls enter an email adress.',
    validator: validatorEmail,
  },

  password: {
    placeholder: 'Password',
    message: 'Pls enter password',
    validator: validatorPassword,
  },

  repeatPassword: {
    placeholder: 'Repeat password',
    message: 'Pls repeat password',
    validator: validatorRepeatPassword,
  },

  firstName: {
    placeholder: 'First name',
    message: 'Pls enter first name',
    validator: validatorName,
  },

  lastName: {
    placeholder: 'Last name',
    message: 'Pls enter last name',
    validator: validatorName,
  },

  verificationEmailWithCode: {
    placeholder: 'Verification code',
    message: 'Pls enter verification code',
    validator: validatorCode,
  },

  shelfName: {
    placeholder: 'Enter shelf name',
    message: 'Pls enter your shelf name',
    validator: validatorLength,
  },

  shelfLocation: {
    placeholder: 'Enter shelf location',
    message: 'Pls enter your shelf location',
    validator: validatorLength,
  },

  shelfDescription: {
    placeholder: 'Enter shelf description',
    message: 'Pls enter your shelf description',
    validator: validatorLength,
  },

  flowerName: {
    placeholder: 'Enter flower name',
    message: 'Pls enter your flower name',
    validator: validatorLength,
  },

  flowerDescription: {
    placeholder: 'Enter flower description',
    message: 'Pls enter your flower description',
    validator: validatorLength,
  },
};
