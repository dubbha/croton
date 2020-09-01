import React from 'react';
import { View, Text } from 'react-native';

import styles from './styles';

export const ShelfFormHeader = ({ closeFunc }: any) => {
  return (
    <View style={styles.shelfForm__header}>
      <Text
        style={styles.shelfForm__header__text}
        onPress={() => {
          closeFunc();
        }}>
        Close
      </Text>
    </View>
  );
};
