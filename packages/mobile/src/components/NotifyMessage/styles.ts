import { StyleSheet } from 'react-native';

import { COLORS, COMPONENTS_STYLE } from '../../styles/Theme';

export default StyleSheet.create({
  message: {
    flex: 1,
    display: 'none',
    width: '100%',
    paddingHorizontal: COMPONENTS_STYLE.paddingHorizontal,
    paddingVertical: 7.5,
    borderRadius: COMPONENTS_STYLE.borderRadiusMedium,
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
    fontSize: COMPONENTS_STYLE.fontSizeSmall,
  },
});
