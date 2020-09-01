import React, { useState } from 'react';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import {
  KeyboardAvoidingView,
  Text,
  View,
  Platform,
  ImageBackground,
  TouchableWithoutFeedback,
  Keyboard,
  SafeAreaView,
} from 'react-native';

import styles from './styles';
import { AUTH_PROFILE_UPDATE } from '../../../store/auth/actions';
import { CustomButton } from '../../../components/Button';
import { CustomInput } from '../../../components/Input';
import { NotifyMessage } from '../../../components/NotifyMessage';

export const Settings = () => {
  const dispatch = useDispatch();
  // TODO: type any for state?
  const auth = useSelector((state: any) => state.auth, shallowEqual);
  const { id, token, info, error } = auth;
  const [firstName, setFirstName] = useState(auth.firstName);
  const [lastName, setLastName] = useState(auth.lastName);
  const [email, setEmail] = useState(auth.email);
  // TODO: Get image from user profile
  const image = { uri: 'https://reactjs.org/logo-og.png' };

  const getMessageOptions = (
    messageInfo: string | null,
    messageError: string | null,
  ) => {
    let result: NotifyMessage = {
      type: null,
      message: null,
    };
    if (messageError) {
      result.type = 'error';
      result.message = messageError;
      return result;
    }
    if (messageInfo) {
      result.type = 'info';
      result.message = messageInfo;
      return result;
    }
    return result;
  };

  const submitForm = () => {
    // TODO: in feature should check what data were changed
    dispatch({
      type: AUTH_PROFILE_UPDATE,
      payload: {
        id,
        token,
        email,
        firstName,
        lastName,
      },
    });
  };

  const messageOptions = getMessageOptions(info, error);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.settings}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView style={styles.settings__area}>
          <View style={styles.settings__body}>
            <View style={styles.settings__picture}>
              <View style={styles.settings__picture__img}>
                <ImageBackground
                  source={image}
                  style={styles.settings__photo}
                />
              </View>
            </View>
            <View
              style={[
                styles.settings__notifyMessage,
                messageOptions && styles.settings__notifyMessage__isShow,
              ]}>
              <NotifyMessage
                type={messageOptions.type}
                message={messageOptions.message}
              />
            </View>
            <View
              style={[styles.settings__field, styles.settings__field__first]}>
              <Text style={styles.settings__label}>First name</Text>
              <View style={styles.settings__input}>
                <CustomInput
                  inputType="firstName"
                  value={firstName}
                  onChangeText={(value: string) => setFirstName(value)}
                />
              </View>
            </View>
            <View style={styles.settings__field}>
              <Text style={styles.settings__label}>Last name</Text>
              <View style={styles.settings__input}>
                <CustomInput
                  inputType="lastName"
                  value={lastName}
                  onChangeText={(value: string) => setLastName(value)}
                />
              </View>
            </View>
            <View style={styles.settings__field}>
              <Text style={styles.settings__label}>Email</Text>
              <View style={styles.settings__input}>
                <CustomInput
                  inputType="email"
                  value={email}
                  editable={false}
                  onChangeText={(value: string) => setEmail(value)}
                />
              </View>
            </View>
            <View style={styles.settings__field}>
              <CustomButton
                variant={'primary'}
                title={'Submit'}
                onPress={() => submitForm()}
              />
            </View>
          </View>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};
