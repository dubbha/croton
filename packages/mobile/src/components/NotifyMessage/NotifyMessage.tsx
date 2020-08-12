import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { COLORS } from '../../styles/Theme';

type MessageType = 'info' | 'error';
export interface NotifyMessage {
  message: string | null;
  type?: null | MessageType;
}

export const NotifyMessage = ({ type, message }: NotifyMessage) => {
  return (
    <View
      style={[
        styles.message,
        type === 'info' ? styles.message__info : null,
        type === 'error' ? styles.message__error : null,
      ]}>
      <View style={styles.message__body}>
        <Text style={styles.message__text}>{message}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  message: {
    flex: 1,
    display: 'none',
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 7.5,
    borderRadius: 20,
  },

  message__error: {
    display: 'flex',
    backgroundColor: COLORS.lightRed,
  },

  message__info: {
    display: 'flex',
    backgroundColor: COLORS.lightGreen,
  },

  message__body: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  message__text: {
    color: '#fff',
  },
});
