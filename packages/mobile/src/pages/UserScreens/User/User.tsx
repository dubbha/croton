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

import { AUTH_PROFILE_UPDATE } from '../../../store/auth/actions';
import styles from './styles';
import { CustomButton } from '../../../components/Button';
import { CustomInput } from '../../../components/Input';
import { NotifyMessage } from '../../../components/NotifyMessage';

export const User = () => {
  const dispatch = useDispatch();
  // TODO: type any for state?
  const auth = useSelector((state: any) => state.auth, shallowEqual);
  const { id, token, info, error } = auth;
  const [firstName, setFirstName] = useState(auth.firstName);
  const [lastName, setLastName] = useState(auth.lastName);
  const [email, setEmail] = useState(auth.email);
  // TODO: Get image from user profile
  const image = { uri: 'https://reactjs.org/logo-og.png' };

  const getMessageOptions = (info: string | null, error: string | null) => {
    let result: NotifyMessage = {
      type: null,
      message: null,
    };
    if (error) {
      result.type = 'error';
      result.message = error;
      return result;
    }
    if (info) {
      result.type = 'info';
      result.message = info;
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
      style={styles.user}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView style={styles.user__area}>
          <View style={styles.user__body}>
            <View style={styles.user__picture}>
              <View style={styles.user__picture__img}>
                <ImageBackground source={image} style={styles.user__photo} />
              </View>
            </View>
            <View
              style={[
                styles.user__notifyMessage,
                messageOptions && styles.user__notifyMessage__isShow,
              ]}>
              <NotifyMessage
                type={messageOptions.type}
                message={messageOptions.message}
              />
            </View>
            <View style={[styles.user__field, styles.user__field__first]}>
              <Text style={styles.user__label}>First name</Text>
              <View style={styles.user__input}>
                <CustomInput
                  inputType="firstName"
                  value={firstName}
                  onChangeText={(value: string) => setFirstName(value)}
                />
              </View>
            </View>
            <View style={styles.user__field}>
              <Text style={styles.user__label}>Last name</Text>
              <View style={styles.user__input}>
                <CustomInput
                  inputType="lastName"
                  value={lastName}
                  onChangeText={(value: string) => setLastName(value)}
                />
              </View>
            </View>
            <View style={styles.user__field}>
              <Text style={styles.user__label}>Email</Text>
              <View style={styles.user__input}>
                <CustomInput
                  inputType="email"
                  value={email}
                  editable={false}
                  onChangeText={(value: string) => setEmail(value)}
                />
              </View>
            </View>
            <View style={styles.user__field}>
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
