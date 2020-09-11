import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
import { CustomButton } from '../../../components/Button';
import { AUTH_CONFIRM } from '../../../store/auth/actions';
import { NotifyMessage } from '../../../components/NotifyMessage';
import { TextInput } from 'react-native-gesture-handler';

export const VerificationEmailWithCode = () => {
  const dispatch = useDispatch();
  const [codeLetterFirst, setCodeLetterFirst] = useState('');
  const [codeLetterSecond, setCodeLetterSecond] = useState('');
  const [codeLetterThird, setCodeLetterThird] = useState('');
  const [codeLetterFourth, setCodeLetterFourth] = useState('');
  const { pushNotification } = useSelector(state => state.information);
  let message;
  if (pushNotification) {
    message = pushNotification.message;
  } else {
    message = '';
  }
  const statelessStr = 'Your activation code is: ';
  const messageCode = message.replace(statelessStr, '');

  const setCodeLetter = (code: string) => {
    setCodeLetterFirst(code[0]);
    setCodeLetterSecond(code[1]);
    setCodeLetterThird(code[2]);
    setCodeLetterFourth(code[3]);
  };

  const getFullCode = () => {
    return (
      codeLetterFirst + codeLetterSecond + codeLetterThird + codeLetterFourth
    );
  };

  useEffect(() => {
    if (messageCode) {
      setCodeLetter(messageCode);
    }
  }, [messageCode]);

  const submitForm = () => {
    const code = getFullCode();
    dispatch({
      type: AUTH_CONFIRM,
      payload: { code },
    });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.code}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView style={styles.code__container}>
          <View style={styles.code__header}>
            <NotifyMessage />
          </View>
          <View style={styles.code__body}>
            <Text style={styles.code__text}>
              Pls enter code from notification
            </Text>
            {/* TODO: Should add transition when set letter */}
            <View style={styles.code__fields}>
              <TextInput
                style={styles.code__field}
                autoCapitalize="none"
                maxLength={1}
                onChangeText={letter => setCodeLetterFirst(letter)}
                value={codeLetterFirst}
              />
              <TextInput
                style={styles.code__field}
                autoCapitalize="none"
                maxLength={1}
                onChangeText={letter => setCodeLetterSecond(letter)}
                value={codeLetterSecond}
              />
              <TextInput
                style={styles.code__field}
                autoCapitalize="none"
                maxLength={1}
                onChangeText={letter => setCodeLetterThird(letter)}
                value={codeLetterThird}
              />
              <TextInput
                style={styles.code__field}
                autoCapitalize="none"
                maxLength={1}
                onChangeText={letter => setCodeLetterFourth(letter)}
                value={codeLetterFourth}
              />
            </View>
            <View style={styles.code__button}>
              <CustomButton
                variant={'primary'}
                title={'Submit'}
                onPress={() => submitForm()}
              />
            </View>
          </View>
          <View style={styles.code__footer}>
            <Text
              style={styles.code__footer__text}
              onPress={() => console.log('Resend verification code')}>
              Didn't get code? Resend.
            </Text>
          </View>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};
