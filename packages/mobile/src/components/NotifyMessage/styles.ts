import { StyleSheet } from 'react-native';

import { COLORS } from '../../styles/Theme';

export default StyleSheet.create({
  message: {
    flex: 1,
    display: 'none',
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 7.5,
    borderRadius: 20,
    backgroundColor: COLORS.lightGrey,
  },

  message__error: {
    display: 'flex',
    backgroundColor: COLORS.lightRed,
  },

  message__info: {
    display: 'flex',
    backgroundColor: COLORS.lightGreen,
  },

  message__loading: {
    display: 'flex',
    backgroundColor: COLORS.lightGrey,
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
