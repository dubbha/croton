import React from 'react';
import { Text, TextInput, View } from 'react-native';

import { InputProps } from './interfaces';
import { InputConfigs } from './inputConfigs';
import styles from './styles';

const defaultValidationStatus = {
  status: null,
  isShowMessage: false,
};

export const CustomInput = ({
  validationStatus = defaultValidationStatus,
  inputType,
  ...props
}: InputProps) => {
  const configs = InputConfigs[inputType];
  const message = configs.message;
  const isShowMessage = validationStatus.isShowMessage;
  const status = validationStatus.status;

  return (
    <View
      style={[
        styles.input,
        status === false ? styles.input__invalid : null,
        status === true ? styles.input__valid : null,
      ]}>
      <TextInput
        style={styles.input__field}
        autoCapitalize="none"
        placeholder={props.placeholder || configs.placeholder}
        {...props}
      />
      {isShowMessage && (
        <View style={styles.input__message}>
          <View style={styles.input__message__body}>
            <View style={styles.input__message__triangle} />
            <Text style={styles.input__message__text}>{message}</Text>
          </View>
        </View>
      )}
    </View>
  );
};
