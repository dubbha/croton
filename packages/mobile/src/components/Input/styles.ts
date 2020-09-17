import { StyleSheet, Platform } from 'react-native';

import { COLORS, COMPONENTS_STYLE } from '../../styles/Theme';

export default StyleSheet.create({
  input: {
    position: 'relative',
    flex: 1,
    height: COMPONENTS_STYLE.mainHeight,
    borderRadius: COMPONENTS_STYLE.borderRadiusMedium,
    borderColor: COLORS.lightGrey,
    borderWidth: COMPONENTS_STYLE.borderWidth,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -3,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },

  input__valid: {
    borderColor: COLORS.lightGreen,
  },

  input__invalid: {
    borderColor: COLORS.lightRed,
  },

  input__field: {
    flex: 1,
    paddingVertical: COMPONENTS_STYLE.paddingLarge,
    paddingHorizontal: COMPONENTS_STYLE.paddingMedium,
  },

  input__message: {
    position: 'absolute',
    bottom: -33,
    left: -15,
    minWidth: '35%',
    paddingVertical: Platform.OS === 'android' ? 5 : 10,
    paddingHorizontal: Platform.OS === 'android' ? 5 : 5,
    backgroundColor: COLORS.darkMain,
    borderRadius: COMPONENTS_STYLE.borderRadiusMedium,
  },

  input__message__body: {
    position: 'relative',
  },

  input__message__triangle: {
    position: 'absolute',
    top: -12,
    left: 10,
    width: 0,
    height: 0,
    borderLeftWidth: 8,
    borderRightWidth: 8,
    borderBottomWidth: 8,
    borderStyle: 'solid',
    backgroundColor: 'transparent',
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: COLORS.darkMain,
  },

  input__message__text: {
    color: COLORS.lightMain,
    fontSize: COMPONENTS_STYLE.fontSizeSmall,
    textAlign: 'center',
  },
});
