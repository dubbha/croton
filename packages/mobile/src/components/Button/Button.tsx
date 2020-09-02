import React from 'react';
import {
  AppRegistry,
  View,
  TouchableHighlight,
  Image,
  Text,
  ButtonProps,
} from 'react-native';

import styles from './styles';
import { COLORS } from '../../styles';

export type ButtonVariant = 'default' | 'primary';

interface CustomButtonProps extends ButtonProps {
  title: string;
  variant?: ButtonVariant;
  icon?: string;
}

export const CustomButton = ({
  variant,
  title,
  icon,
  ...buttonProps
}: CustomButtonProps) => {
  const isPrimary = variant === 'primary' ? true : false;

  return (
    <View style={styles.button}>
      <TouchableHighlight underlayColor={COLORS.lightGreen} {...buttonProps}>
        <View
          style={[
            styles.button__body,
            isPrimary && styles.button__body__outline,
          ]}>
          {icon && <Image style={styles.button__icon} source={icon} />}
          <Text
            style={[
              styles.button__text,
              isPrimary && styles.button__text__outline,
            ]}>
            {title}
          </Text>
        </View>
      </TouchableHighlight>
    </View>
  );
};

AppRegistry.registerComponent('CustomButton', () => CustomButton);
