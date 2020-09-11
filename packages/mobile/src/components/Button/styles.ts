import { StyleSheet } from 'react-native';

import { COLORS, COMPONENTS_STYLE } from '../../styles';

export default StyleSheet.create({
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
  },

  button__body__solid: {
    backgroundColor: COLORS.green,
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
