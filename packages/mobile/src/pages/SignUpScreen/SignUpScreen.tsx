import React from 'react';
import {
  KeyboardAvoidingView,
  ScrollView,
  View,
  Text,
  TouchableWithoutFeedback,
  StyleSheet,
  Platform,
  Keyboard,
} from 'react-native';

import { COMPONENTS_STYLE } from '../../styles';
import { CustomButton } from '../../components/Button';
import { CustomInput } from '../../components/Input';
import { Divider } from '../../components/Divider';

export const SignUpScreen = () => {
  // TODO: Maybe should set link
  const termsConditions = 'By signing up, you agree to the Terms of Service.';
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView>
          <View style={styles.container__topPart}>
            <View style={styles.container__socials}>
              <View style={styles.container__social}>
                <CustomButton icon="iconFb" isOutline={true} title="Facebook" />
              </View>
              <View style={styles.container__social}>
                <CustomButton
                  icon="iconGoogle"
                  isOutline={true}
                  title="Google"
                />
              </View>
            </View>
          </View>
          <View style={styles.container__divider}>
            <Divider isDark={true} />
          </View>
          <View style={styles.container__bottomPart}>
            <View
              style={[
                styles.container__inputWrap,
                styles.container__inputWrap__first,
              ]}>
              <CustomInput />
            </View>
            <View style={styles.container__inputWrap}>
              <CustomInput />
            </View>
            <View style={styles.container__inputWrap}>
              <CustomInput />
            </View>
            <View style={styles.container__inputWrap}>
              <CustomInput />
            </View>
            <View style={styles.container__submit}>
              <Text>{termsConditions}</Text>
              <View style={styles.container__button}>
                <CustomButton title="Create an Account" />
              </View>
            </View>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    paddingHorizontal: 30,
    paddingTop: 50,
    paddingBottom: 30,
  },

  container__topPart: {
    flex: 0.1,
    height: COMPONENTS_STYLE.buttonHeight,
  },

  container__bottomPart: {
    flex: 0.8,
    flexDirection: 'column',
    alignItems: 'center',
  },

  container__divider: {
    flex: 0.1,
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: COMPONENTS_STYLE.buttonHeight,
  },

  container__inputWrap: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 20,
  },

  container__submit: {
    marginTop: 50,
    flexDirection: 'column',
  },

  container__button: {
    marginTop: 10,
  },

  container__inputWrap__first: {
    marginTop: 0,
  },

  container__inputWrap__submit: {
    marginTop: 80,
  },

  container__socials: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  container__social: {
    flex: 0.475,
  },
});
