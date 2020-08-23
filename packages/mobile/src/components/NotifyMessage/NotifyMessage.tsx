import React, { FC } from 'react';
import { View, Text } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import styles from './styles';
import { INFORMATION_HIDE } from '../../store/information/actions';
import { MessageOptions, NotifyMessageProps } from './interfaces';

const renderLoader = () => {
  return (
    <View style={[styles.message, styles.message__loading]}>
      <View style={styles.message__body}>
        <Text style={styles.message__text}>Loading...</Text>
      </View>
    </View>
  );
};

const renderMessage = (data: MessageOptions) => {
  const { type = null, message } = data;
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

export const NotifyMessage: FC<NotifyMessageProps> = ({ timer }) => {
  const dispatch = useDispatch();
  const information = useSelector(state => state.information);
  const dispatchDelay = 1500;
  const { type, message, isLoading } = information;

  if (message) {
    setTimeout(() => {
      dispatch({ type: INFORMATION_HIDE });
    }, timer || dispatchDelay);
  }

  return isLoading ? renderLoader() : renderMessage({ type, message });
};
