import React from 'react';
import {
  ImageBackground,
  View,
  Text,
  StyleSheet,
  Platform,
} from 'react-native';

const autorizationBgImg = require('../../assets/img/bg-home.jpg');
import { THEME } from '../../styles';
import { CustomButton } from '../../components/Button';
import { Divider } from '../../components/Divider';

// TODO:
// - change View on ScrollView and make styles for that
// - make basic alignment of elements on iOS and Android
// - make basic alignment of inputs on SignIn and SignUp screens
export const AutorizationScreen = ({ navigation }: any) => {
  return (
    <View style={styles.container}>
      <ImageBackground source={autorizationBgImg} style={styles.container__bg}>
        <View style={styles.container__body}>
          <View style={styles.topPart}>
            <Text style={styles.mainText}>Your Plants Are Safe Now</Text>
            <Text style={styles.additionText}>Don’t forget your flowers</Text>
          </View>
          <View style={styles.bottomPart}>
            <View style={styles.buttonsWrap}>
              <View style={styles.button}>
                <CustomButton
                  style={styles.androidButton}
                  title="Sing In"
                  action={() => navigation.navigate('Sign In')}
                />
              </View>
              <View style={styles.button}>
                <CustomButton
                  title="Sign Up"
                  action={() => navigation.navigate('Sign Up')}
                />
              </View>
            </View>
            <Divider />
            <View style={styles.buttonsWrap}>
              <View style={styles.button}>
                <CustomButton isOutline={true} icon="iconFb" title="Facebook" />
              </View>
              <View style={styles.button}>
                <CustomButton
                  isOutline={true}
                  icon="iconGoogle"
                  title="Google"
                />
              </View>
            </View>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  container__bg: {
    flex: 1,
    resizeMode: 'cover',
  },

  container__body: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },

  topPart: {
    flex: 0.4,
    flexDirection: 'column',
    justifyContent: 'center',
  },

  bottomPart: {
    flex: 0.5,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 30,
  },

  buttonsWrap: {
    flex: 0.4,
    justifyContent: 'space-between',
    width: '80%',
  },

  button: {
    flex: Platform.OS === 'android' ? 0.45 : 0.5,
  },

  mainText: {
    color: THEME.green,
    fontWeight: 'bold',
    fontSize: 24,
  },
  additionText: {
    marginTop: 20,
    color: THEME.green,
    fontSize: 18,
  },
  androidButton: {
    marginTop: 10,
  },
});
