import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { COLORS } from '../../styles/Theme';

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

const styles = StyleSheet.create({
  divider: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  divider__text: {
    color: COLORS.lightMain,
    fontSize: 12,
    fontWeight: '500',
    textTransform: 'uppercase',
    letterSpacing: 3,
  },
  divider__text__dark: {
    color: COLORS.grey,
  },
  divider__line: {
    flex: 0.5,
    height: 1,
    backgroundColor: COLORS.lightMain,
    marginHorizontal: 10,
  },
  divider__line__dark: {
    backgroundColor: COLORS.lightGrey,
  },
});
