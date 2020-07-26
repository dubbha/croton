import { StyleSheet, Platform } from 'react-native';

import { COLORS } from '../../styles/Theme';

export default StyleSheet.create({
  input: {
    position: 'relative',
    flex: 1,
    height: 50,
    borderRadius: 5,
    borderColor: COLORS.lightGrey,
    borderWidth: 2,
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
    paddingHorizontal: 10,
    paddingVertical: 15,
  },

  input__message: {
    position: 'absolute',
    bottom: -40,
    left: -25,
    minWidth: '35%',
    paddingVertical: Platform.OS === 'android' ? 5 : 10,
    paddingHorizontal: Platform.OS === 'android' ? 2.5 : 5,
    backgroundColor: COLORS.darkMain,
    borderRadius: 5,
    marginTop: 14,
  },

  input__message__body: {
    position: 'relative',
  },

  input__message__triangle: {
    position: 'absolute',
    top: -15,
    left: 10,
    width: 0,
    height: 0,
    borderLeftWidth: 10,
    borderRightWidth: 10,
    borderBottomWidth: 10,
    borderStyle: 'solid',
    backgroundColor: 'transparent',
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: COLORS.darkMain,
  },

  input__message__text: {
    color: COLORS.lightMain,
    textAlign: 'center',
  },
});
