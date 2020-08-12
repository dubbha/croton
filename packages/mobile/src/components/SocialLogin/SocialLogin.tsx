import React from 'react';
import { View, StyleSheet } from 'react-native';

import { CustomButton } from '../Button';

export const SocialLogin = () => {
  return (
    <View style={styles.social}>
      <View style={styles.social__button}>
        <CustomButton title="Facebook" icon="iconFb" variant="primary" />
      </View>
      <View style={styles.social__button}>
        <CustomButton icon="iconGoogle" variant="primary" title="Google" />
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
