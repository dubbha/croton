import { TextInputProps } from 'react-native';
export interface ValidationResult {
  status: boolean | null;
  isShowMessage: boolean;
}

export type InputTypes =
  | 'email'
  | 'password'
  | 'repeatPassword'
  | 'firstName'
  | 'lastName'
  | 'verificationEmailWithCode'
  | 'shelfName'
  | 'shelfLocation'
  | 'shelfDescription'
  | 'flowerName'
  | 'flowerDescription'
  | 'flowerLocation';

export interface InputProps extends TextInputProps {
  inputType: InputTypes;
  validationMessage?: string | null;
  validationStatus?: ValidationResult;
}
