import React from 'react';
import { View, Text } from 'react-native';

import styles from './styles';

export const Divider = ({ isDark }: { isDark?: boolean }) => {
  return (
    <View style={styles.divider}>
      <View
        style={[styles.divider__line, isDark && styles.divider__line__dark]}
      />
      <Text
        style={[styles.divider__text, isDark && styles.divider__text__dark]}>
        or
      </Text>
      <View
        style={[styles.divider__line, isDark && styles.divider__line__dark]}
      />
    </View>
  );
};
