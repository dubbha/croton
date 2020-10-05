import { StyleSheet } from 'react-native';

import { COLORS, COMPONENTS_STYLE } from '../../styles';

export default StyleSheet.create({
  button: {
    maxHeight: COMPONENTS_STYLE.mainHeight,
  },

  button__body: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: COMPONENTS_STYLE.mainHeight,
    borderRadius: COMPONENTS_STYLE.borderRadiusMedium,
    borderWidth: COMPONENTS_STYLE.borderWidth,
    backgroundColor: COLORS.lightMain,
    borderColor: COLORS.green,
  },

  button__body__solid: {
    backgroundColor: COLORS.green,
  },

  button__body__outline: {
    borderColor: COLORS.green,
    borderWidth: COMPONENTS_STYLE.borderWidth,
    backgroundColor: COLORS.lightMain,
  },

  button__text: {
    textTransform: 'uppercase',
    textAlign: 'center',
    color: COLORS.green,
    fontSize: COMPONENTS_STYLE.fontSizeSmall,
    fontWeight: '500',
  },

  button__text__solid: {
    color: COLORS.lightMain,
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
