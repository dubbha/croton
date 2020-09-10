import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  KeyboardAvoidingView,
  Platform,
  ImageBackground,
  TouchableWithoutFeedback,
  Keyboard,
  SafeAreaView,
  View,
  Text,
} from 'react-native';

import styles from './styles';
import { SCREEN_USER_SETTINGS, SCREEN_USER_SHELVES } from '../../screens';
import { httpSender } from '../../../services/http/http.service';

export const User = ({ navigation }: any) => {
  // TODO: Get image from user profile
  const image = { uri: 'https://reactjs.org/logo-og.png' };
  const { mobileToken: registrationToken } = useSelector(state => state.auth);

  useEffect(() => {
    httpSender.send({
      router: '/api/notification/register',
      body: {
        registrationToken,
      },
    });
  });

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
            <View style={styles.user__nav}>
              <View>
                <View
                  style={[
                    styles.user__nav__item,
                    styles.user__nav__item__first,
                  ]}>
                  <Text
                    onPress={() => navigation.navigate(SCREEN_USER_SHELVES)}>
                    {SCREEN_USER_SHELVES}
                  </Text>
                </View>
                {/* <View style={styles.user__nav__item}>
                  <Text
                    onPress={() => navigation.navigate(SCREEN_USER_FLOWERS)}>
                    {SCREEN_USER_FLOWERS}
                  </Text>
                </View> */}
                <View style={styles.user__nav__item}>
                  <Text
                    onPress={() => navigation.navigate(SCREEN_USER_SETTINGS)}>
                    {SCREEN_USER_SETTINGS}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};
