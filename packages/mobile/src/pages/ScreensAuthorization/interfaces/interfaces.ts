import { ValidationStatus } from '../../../components/Input/interfaces';

export interface AuthorizationProps {
  error: string;
  info: string;
  navigation: object;
  submitForm: (data: object) => void;
}

export type SignInState = {
  email: string;
  password: string;
  validationStatusEmail: ValidationStatus;
  validationStatusPassword: ValidationStatus;
};

export interface SignUpState extends SignInState {
  repeatPassword: string;
  firstName: string;
  lastName: string;
  validationStatusRepeatPassword: ValidationStatus;
  validationStatusFirstName: ValidationStatus;
  validationStatusLastName: ValidationStatus;
}
