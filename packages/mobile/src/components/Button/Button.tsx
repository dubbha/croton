import React from 'react';
import {
  AppRegistry,
  View,
  TouchableHighlight,
  Image,
  Text,
  StyleSheet,
  ButtonProps,
} from 'react-native';

import { COLORS, COMPONENTS_STYLE } from '../../styles';
import { ICONS } from '../../assets/icons';

interface CustomButtonProps extends ButtonProps {
  title: string;
  variant?: 'default' | 'primary';
  icon?: string;
}

export const CustomButton = ({
  variant,
  title,
  icon,
  ...buttonProps
}: CustomButtonProps) => {
  const isPrimary = variant === 'primary' ? true : false;
  const iconSource = icon && ICONS[icon];

  return (
    <View style={styles.button}>
      <TouchableHighlight underlayColor={COLORS.lightGreen} {...buttonProps}>
        <View
          style={[
            styles.button__body,
            isPrimary && styles.button__body__outline,
          ]}>
          {iconSource && (
            <Image style={styles.button__icon} source={iconSource} />
          )}
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

const styles = StyleSheet.create({
  button: {
    flex: 1,
    maxHeight: COMPONENTS_STYLE.buttonHeight,
  },

  button__body: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: COMPONENTS_STYLE.buttonHeight,
    borderRadius: 5,
    backgroundColor: COLORS.lightMain,
    color: COLORS.green,
  },

  button__body__outline: {
    borderColor: COLORS.green,
    borderWidth: 2,
    backgroundColor: COLORS.lightMain,
  },

  button__text: {
    textTransform: 'uppercase',
    textAlign: 'center',
    color: COLORS.green,
    fontSize: 12,
    fontWeight: '500',
  },

  button__text__outline: {
    color: COLORS.green,
  },

  button__icon: {
    width: 17.5,
    height: 17.5,
    marginRight: 10,
  },
});

AppRegistry.registerComponent('CustomButton', () => CustomButton);
