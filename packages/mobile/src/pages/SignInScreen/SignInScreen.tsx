import React from 'react';
import { KeyboardAvoidingView, ScrollView, View, Image, TouchableWithoutFeedback, StyleSheet, Platform, Keyboard } from 'react-native';

import { COMPONENTS_STYLE } from '../../styles';
import { CustomButton } from '../../components/Button';
import { CustomInput } from '../../components/Input';
import { Divider } from '../../components/Divider';

export const SignInScreen = () => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          scrollEnabled={Platform.OS === 'android' ? false : true}
          contentContainerStyle={styles.container__scroll}
        >
          <View
            style={{
              flex: 1,
            }} 
          >
            <View style={styles.container__topPart}>
              <View style={styles.container__socials}>
                <View style={styles.container__social}>
                  <CustomButton icon='iconFb' isOutline={true} title='Facebook' />
                </View>
                <View style={styles.container__social}>
                  <CustomButton icon='iconGoogle' isOutline={true}  title='Google' />
                </View>
              </View>
            </View>
            <View style={styles.container__divider}>
              <Divider isDark={true} />
            </View>
            <View style={styles.container__bottomPart}>
              <View style={[styles.container__inputWrap, styles.container__inputWrap__first]}>
                <CustomInput />
              </View>
              <View style={styles.container__inputWrap}>
                <CustomInput />
              </View>
              <View style={styles.container__inputWrap}>
                <CustomButton title='Sign In' />
              </View>
              <Image style={styles.container__img} source={require('./../../assets/img/bg-signIn.png')} />
            </View>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  container__scroll: {
    flexGrow: 1,
    justifyContent: 'space-between',
    flexDirection: 'column',
    paddingHorizontal: 30,
    paddingTop: 50,
  },

  container__topPart: {
    flex: 0,
    height: COMPONENTS_STYLE.buttonHeight,
  },

  container__bottomPart: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },

  container__divider: {
    flex: 0,
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: COMPONENTS_STYLE.buttonHeight,
  },

  container__inputWrap: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 20,
  },

  container__inputWrap__first: {
    marginTop: 0,
  },

  container__socials: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  container__social: {
    flex: 0.475,
  },

  container__img: {
    resizeMode: 'contain',
    position: 'relative',
    bottom: Platform.OS === 'ios' ? -26 : 0,
  }
});
