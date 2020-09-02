import React from 'react';
import { ImageBackground, View, Text } from 'react-native';

import styles from './styles';
import { SCREEN_SIGN_IN, SCREEN_SIGN_UP } from '../../screens';
import { CustomButton } from '../../../components/Button';
import { Divider } from '../../../components/Divider';
import { SocialLogin } from './../../../components/SocialLogin';

const autorizationBgImg = require('./../../../assets/img/bg-home.jpg');

export const Authorization = ({ navigation }: any) => {
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
                  title="Sing In"
                  onPress={() => navigation.navigate(SCREEN_SIGN_IN)}
                />
              </View>
              <View style={styles.button}>
                <CustomButton
                  title={SCREEN_SIGN_UP}
                  onPress={() => navigation.navigate(SCREEN_SIGN_UP)}
                />
              </View>
            </View>
            <Divider />
            <View style={styles.buttonsWrap}>
              <SocialLogin variant="primary" />
            </View>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};
