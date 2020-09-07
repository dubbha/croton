import React from 'react';
import { View, Text } from 'react-native';

import styles from './styles';

export const ShelfFormHeader = ({ closeFunc }: any) => {
  return (
    <View style={styles.flowerForm__header__content}>
      <Text
        style={styles.flowerForm__header__text}
        onPress={() => {
          closeFunc();
        }}>
        Close
      </Text>
    </View>
  );
};
