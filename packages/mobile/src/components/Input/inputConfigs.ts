import {
  validatorEmail,
  validatorPassword,
  validatorRepeatPassword,
  validatorName,
  validatorCode,
} from './../../helpers/validators';

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
  VerificationEmailWithCode: {
    placeholder: 'Verification code',
    message: 'Pls enter verification code',
    validator: validatorCode,
  },
};
