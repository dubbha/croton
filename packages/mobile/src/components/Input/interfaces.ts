import { TextInputProps } from 'react-native';
export interface ValidationStatus {
  status: boolean | null;
  isShowMessage: boolean;
}

export interface InputProps extends TextInputProps {
  inputType: string;
  validationMessage?: string | null;
  validationStatus?: ValidationStatus;
}
