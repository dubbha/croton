import React from 'react';
import { View, StyleSheet } from 'react-native';

import { CustomButton, ButtonVariant } from '../Button';

const iconSrcGoogle = './../../assets/icons/google.png';
const iconSrcFb = './../../assets/icons/fb.png';

export const SocialLogin = (props: any) => {
  const variant: ButtonVariant = props || 'primary';

  return (
    <View style={styles.social}>
      <View style={styles.social__button}>
        <CustomButton
          title="Facebook"
          icon={require(iconSrcFb)}
          variant={variant}
          onPress={() => console.log('Login facebook')}
        />
      </View>
      <View style={styles.social__button}>
        <CustomButton
          icon={require(iconSrcGoogle)}
          variant={variant}
          title="Google"
          onPress={() => console.log('Login google')}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  social: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  social__button: {
    flex: 0.475,
  },
});
