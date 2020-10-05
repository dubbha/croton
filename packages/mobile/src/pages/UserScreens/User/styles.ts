import { StyleSheet } from 'react-native';

import { COLORS, COMPONENTS_STYLE } from '../../../styles';

export default StyleSheet.create({
  user: {
    flex: 1,
  },

  user__area: {
    flex: 1,
  },

  user__body: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    paddingHorizontal: COMPONENTS_STYLE.paddingHorizontal,
  },

  user__pictureWrap: {
    flexDirection: 'row',
    justifyContent: 'center',
  },

  user__picture: {
    flexDirection: 'column',
    alignItems: 'center',
  },

  user__picture__img: {
    width: 100,
    height: 100,
    borderRadius: COMPONENTS_STYLE.borderRadiusMedium,
    overflow: 'hidden',
  },

  user__photo: {
    flex: 1,
    resizeMode: 'cover',
  },

  user__nav: {
    marginTop: 30,
  },

  user__nav__item: {
    paddingVertical: COMPONENTS_STYLE.paddingLarge,
    paddingHorizontal: COMPONENTS_STYLE.paddingSmall,
    borderBottomWidth: COMPONENTS_STYLE.borderWidth,
    borderBottomColor: COLORS.lightGrey,
  },

  user__nav__item__first: {
    borderTopWidth: COMPONENTS_STYLE.borderWidth,
    borderTopColor: COLORS.lightGrey,
  },
});
