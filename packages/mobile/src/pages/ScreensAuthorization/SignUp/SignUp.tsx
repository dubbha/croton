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

import { InterfaceStore } from './../../../store';
import {
  AUTH_REGISTER,
  PayloadAuthRegister,
} from '../../../store/auth/actions';
import { SignUpState, AuthorizationProps } from '../interfaces';
import { validateInput, hideMessage } from './../helpers';
import { SCREEN_SIGN_UP, SCREEN_EMAIL_VERIFICATION } from '../../screens';
import styles from './styles';
import { CustomButton } from './../../../components/Button';
import { CustomInput } from './../../../components/Input';
import { Divider } from '../../../components/Divider';
import { SocialLogin } from '../../../components/SocialLogin';
import { NotifyMessage } from './../../../components/NotifyMessage';

export class SignUpComponent extends React.Component<
  AuthorizationProps,
  SignUpState
> {
  constructor(props: AuthorizationProps) {
    super(props);
    this.state = {
      validationStatusEmail: { status: null, isShowMessage: false },
      validationStatusPassword: { status: null, isShowMessage: false },
      validationStatusRepeatPassword: { status: null, isShowMessage: false },
      validationStatusFirstName: { status: null, isShowMessage: false },
      validationStatusLastName: { status: null, isShowMessage: false },
      email: '',
      password: '',
      repeatPassword: '',
      firstName: '',
      lastName: '',
    };
  }

  getMessageOptions() {
    let result: NotifyMessage = {
      type: null,
      message: null,
    };
    if (this.props.error) {
      result.type = 'error';
      result.message = this.props.error;
    }
    if (this.props.info) {
      result.type = 'info';
      result.message = this.props.info;
    }
    return result;
  }

  resetForm() {
    this.setState({
      email: '',
      password: '',
      repeatPassword: '',
      firstName: '',
      lastName: '',
    });
  }

  validateFields() {
    const { status: isValidEmail } = validateInput(
      this,
      'email',
      'validationStatusEmail',
      true,
    );
    const { status: isValidPassword } = validateInput(
      this,
      'password',
      'validationStatusPassword',
      true,
    );
    const { status: isValidRepeatPassword } = validateInput(
      this,
      'repeatPassword',
      'validationStatusRepeatPassword',
      true,
    );
    const { status: isValidFirstName } = validateInput(
      this,
      'firstName',
      'validationStatusFirstName',
      true,
    );
    const { status: isValidLastName } = validateInput(
      this,
      'lastName',
      'validationStatusLastName',
      true,
    );
    const isValidFields =
      isValidEmail &&
      isValidPassword &&
      isValidRepeatPassword &&
      isValidFirstName &&
      isValidLastName;

    return isValidFields;
  }

  navigateToEmailVerification() {
    this.props.navigation.navigate(SCREEN_EMAIL_VERIFICATION);
  }

  submitForm() {
    const isValidFields = true;

    if (isValidFields) {
      this.props.submitForm({
        email: this.state.email,
        password: this.state.password,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
      });
    } else {
      setTimeout(() => {
        hideMessage(this, [
          'validationStatusEmail',
          'validationStatusPassword',
          'validationStatusRepeatPassword',
          'validationStatusFirstName',
          'validationStatusLastName',
        ]);
      }, 2000);
    }
  }

  render() {
    if (this.props.isEmailVerification) {
      this.navigateToEmailVerification();
    }
    const messageOptions = this.getMessageOptions();
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
                  <NotifyMessage
                    message={messageOptions.message}
                    type={messageOptions.type}
                  />
                </View>
                <View
                  style={[
                    styles.container__inputWrap,
                    styles.container__inputWrap__1,
                  ]}>
                  <CustomInput
                    inputType="firstName"
                    validationStatus={this.state.validationStatusFirstName}
                    onChangeText={(data: string) => {
                      this.setState({ firstName: data });
                    }}
                    onBlur={() => {
                      validateInput(
                        this,
                        'firstName',
                        'validationStatusFirstName',
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
                    inputType="lastName"
                    validationStatus={this.state.validationStatusLastName}
                    onChangeText={(data: string) => {
                      this.setState({ lastName: data });
                    }}
                    onBlur={() => {
                      validateInput(
                        this,
                        'lastName',
                        'validationStatusLastName',
                      );
                    }}
                  />
                </View>
                <View
                  style={[
                    styles.container__inputWrap,
                    styles.container__inputWrap__3,
                  ]}>
                  <CustomInput
                    inputType="email"
                    validationStatus={this.state.validationStatusEmail}
                    onChangeText={(data: string) => {
                      this.setState({ email: data });
                    }}
                    onBlur={() => {
                      validateInput(this, 'email', 'validationStatusEmail');
                    }}
                  />
                </View>
                <View
                  style={[
                    styles.container__inputWrap,
                    styles.container__inputWrap__4,
                  ]}>
                  <CustomInput
                    inputType="password"
                    secureTextEntry={true}
                    validationStatus={this.state.validationStatusPassword}
                    onChangeText={(data: string) => {
                      this.setState({ password: data });
                    }}
                    onBlur={() => {
                      validateInput(
                        this,
                        'password',
                        'validationStatusPassword',
                      );
                    }}
                  />
                </View>
                <View
                  style={[
                    styles.container__inputWrap,
                    styles.container__inputWrap__5,
                  ]}>
                  <CustomInput
                    inputType="repeatPassword"
                    secureTextEntry={true}
                    validationStatus={this.state.validationStatusRepeatPassword}
                    onChangeText={(data: string) => {
                      this.setState({ repeatPassword: data });
                    }}
                    onBlur={() => {
                      validateInput(
                        this,
                        'repeatPassword',
                        'validationStatusRepeatPassword',
                      );
                    }}
                  />
                </View>
                <View style={styles.container__inputWrap}>
                  <CustomButton
                    title={SCREEN_SIGN_UP}
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
  const { error, info, isEmailVerification } = auth;
  return { error, info, isEmailVerification };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    submitForm: ({
      email,
      password,
      firstName,
      lastName,
    }: PayloadAuthRegister) =>
      dispatch({
        type: AUTH_REGISTER,
        payload: {
          email,
          password,
          firstName,
          lastName,
        },
      }),
  };
};

export const SignUp = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SignUpComponent);
