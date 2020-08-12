import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  KeyboardAvoidingView,
  View,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  SafeAreaView,
  Text,
} from 'react-native';

import styles from './styles';
import { SCREEN_AUTHORIZATION } from '../../screens';
import { InputConfigs } from '../../../components/Input/inputConfigs';
import { CustomButton } from '../../../components/Button';
import { CustomInput } from '../../../components/Input';

export const VerificationEmailWithCode = () => {
  const navigation = useNavigation();
  const [code, setCode] = useState('');
  const [validationStatus, setValidationStatus] = useState({
    status: null,
    isShowMessage: false,
  });

  const validateInput = (isForced?: boolean) => {
    const result = {
      status: null,
      isShowMessage: false,
    };
    if (!code.length) {
      console.log(code);
      setValidationStatus(result);
      return;
    }

    const validator = InputConfigs.VerificationEmailWithCode.validator;
    const status = validator(code);

    result.status = status;
    if (!status) {
      result.isShowMessage = true;
      setTimeout(function() {
        const defaultResult = {
          status: result.status,
          isShowMessage: false,
        };
        setValidationStatus(defaultResult);
      }, 2000);
    } else {
      result.isShowMessage = false;
    }

    setValidationStatus(result);

    if (isForced) {
      return status;
    }
  };

  const submitForm = () => {
    const status = validateInput();
    // TODO: navigate to SCREEN_USER_PROFILE or show message
    if (status) {
      console.log('Navigate to SCREEN_USER_PROFILE');
      navigation.navigate(SCREEN_AUTHORIZATION);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.code}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView style={styles.code__container}>
          <Text style={styles.code__text}>Pls write code from your email</Text>
          <View style={styles.code__field}>
            <CustomInput
              inputType="VerificationEmailWithCode"
              validationStatus={validationStatus}
              onChangeText={(value: string) => setCode(value)}
              onBlur={() => validateInput()}
            />
          </View>
          <View style={styles.code__button}>
            <CustomButton
              variant={'primary'}
              title={'Submit'}
              onPress={() => submitForm()}
            />
          </View>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};
