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
    paddingHorizontal: COMPONENTS_STYLE.mainPaddingHorizontal,
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
    borderRadius: 50,
    overflow: 'hidden',
  },

  user__picture__text: {
    marginTop: 10,
    fontSize: 24,
    fontWeight: '700',
  },

  user__photo: {
    flex: 1,
    resizeMode: 'cover',
  },

  user__nav: {
    marginTop: 30,
  },

  user__nav__item: {
    paddingVertical: 15,
    paddingHorizontal: 5,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGrey,
  },

  user__nav__item__first: {
    borderTopWidth: 1,
    borderTopColor: COLORS.lightGrey,
  },
});
