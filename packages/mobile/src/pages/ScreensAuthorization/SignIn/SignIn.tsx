import React from 'react';
import {
  KeyboardAvoidingView,
  ScrollView,
  View,
  Image,
  TouchableWithoutFeedback,
  Platform,
  Keyboard,
} from 'react-native';
import { connect } from 'react-redux';

import styles from './styles';
import { InterfaceStore } from './../../../store';
import { AUTH_LOGIN, PayloadAuthLogin } from './../../../store/auth/actions';
import { SignInState, AuthorizationProps } from './../interfaces';
import {
  inputValidatorClassComponent,
  hideMessageClassComponent,
} from '../../../components/Input/helpers';
import { CustomButton } from './../../../components/Button';
import { CustomInput } from './../../../components/Input';
import { Divider } from './../../../components/Divider';
import { SocialLogin } from './../../../components/SocialLogin';
import { NotifyMessage } from './../../../components/NotifyMessage';

class SignInComponent extends React.Component<AuthorizationProps, SignInState> {
  constructor(props: AuthorizationProps) {
    super(props);
    this.state = {
      email: '',
      password: '',
      validationStatusEmail: { status: null, isShowMessage: false },
      validationStatusPassword: { status: null, isShowMessage: false },
    };
  }

  submitForm() {
    const { status: isValidEmail } = inputValidatorClassComponent(
      this,
      'email',
      'validationStatusEmail',
      true,
    );
    const { status: isValidPassword } = inputValidatorClassComponent(
      this,
      'password',
      'validationStatusPassword',
      true,
    );
    const isValidAllFields = isValidEmail && isValidPassword;

    if (isValidAllFields) {
      const email = this.state.email;
      const password = this.state.password;
      this.props.submitForm({ email, password });
    } else {
      setTimeout(() => {
        hideMessageClassComponent(this, [
          'validationStatusEmail',
          'validationStatusPassword',
        ]);
      }, 2000);
    }
  }

  render() {
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            scrollEnabled={Platform.OS === 'android' ? false : true}
            contentContainerStyle={styles.container__scroll}>
            <View style={styles.container__body}>
              <View style={styles.container__topPart}>
                <SocialLogin />
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
                  <NotifyMessage />
                </View>
                <View
                  style={[
                    styles.container__inputWrap,
                    styles.container__inputWrap__1,
                  ]}>
                  <CustomInput
                    inputType="email"
                    validationStatus={this.state.validationStatusEmail}
                    onChangeText={(data: string) => {
                      this.setState({ email: data });
                    }}
                    onBlur={() => {
                      inputValidatorClassComponent(
                        this,
                        'email',
                        'validationStatusEmail',
                      );
                    }}
                  />
                </View>
                <View
                  style={[
                    styles.container__inputWrap,
                    styles.container__inputWrap__2,
                  ]}>
                  <CustomInput
                    inputType="password"
                    secureTextEntry={true}
                    validationStatus={this.state.validationStatusPassword}
                    onChangeText={(data: string) =>
                      this.setState({ password: data })
                    }
                    onBlur={() => {
                      inputValidatorClassComponent(
                        this,
                        'password',
                        'validationStatusPassword',
                      );
                    }}
                  />
                </View>
                <View style={styles.container__inputWrap}>
                  <CustomButton
                    title="Sign In"
                    onPress={() => this.submitForm()}
                  />
                </View>
                <Image
                  style={styles.container__img}
                  source={require('./../../../assets/img/bg-signIn.png')}
                />
              </View>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    );
  }
}

const mapStateToProps = ({ auth }: InterfaceStore) => {
  const { error } = auth;
  return { error };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    submitForm: ({ email, password }: PayloadAuthLogin) =>
      dispatch({
        type: AUTH_LOGIN,
        payload: { email, password },
      }),
  };
};

export const SignIn = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SignInComponent);
