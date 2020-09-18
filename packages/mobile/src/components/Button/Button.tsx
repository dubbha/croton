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

// TODO: we shoud restructured this
export type ButtonVariant = 'default' | 'primary' | 'primary__solid';

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
  const isPrimary = variant === 'primary';
  const isSolid = variant === 'primary__solid';

  return (
    <View style={styles.button}>
      <TouchableHighlight underlayColor={'rgba(0, 0, 0, 0)'} {...buttonProps}>
        <View
          style={[
            styles.button__body,
            isPrimary && styles.button__body__outline,
            isSolid && styles.button__body__solid,
          ]}>
          {icon && <Image style={styles.button__icon} source={icon} />}
          <Text
            style={[
              styles.button__text,
              isPrimary && styles.button__text__outline,
              isSolid && styles.button__text__solid,
            ]}>
            {title}
          </Text>
        </View>
      </TouchableHighlight>
    </View>
  );
};

AppRegistry.registerComponent('CustomButton', () => CustomButton);
