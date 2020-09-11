import { ValidationResult } from '../../../components/Input/interfaces';

export interface AuthorizationProps {
  error: string;
  info: string;
  navigation: object;
  mobileToken: string;
  submitForm: (data: object) => void;
}

export type SignInState = {
  email: string;
  password: string;
  validationStatusEmail: ValidationResult;
  validationStatusPassword: ValidationResult;
};

export interface SignUpState extends SignInState {
  repeatPassword: string;
  firstName: string;
  lastName: string;
  validationStatusRepeatPassword: ValidationResult;
  validationStatusFirstName: ValidationResult;
  validationStatusLastName: ValidationResult;
}
