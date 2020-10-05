import { StyleSheet } from 'react-native';

import { COLORS, COMPONENTS_STYLE } from '../../styles/Theme';

export default StyleSheet.create({
  divider: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  divider__text: {
    color: COLORS.lightMain,
    fontSize: COMPONENTS_STYLE.fontSizeSmall,
    fontWeight: '500',
    textTransform: 'uppercase',
    letterSpacing: 3,
  },
  divider__text__dark: {
    color: COLORS.grey,
  },
  divider__line: {
    flex: 0.5,
    height: COMPONENTS_STYLE.borderWidth,
    backgroundColor: COLORS.lightMain,
    marginHorizontal: 10,
  },
  divider__line__dark: {
    backgroundColor: COLORS.lightGrey,
  },
});
