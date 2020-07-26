import { StyleSheet } from 'react-native';

import { COMPONENTS_STYLE } from '../../../styles';

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

  user__field: {
    minHeight: 50,
    marginTop: 20,
  },

  user__field__first: {
    marginTop: 0,
  },

  user__label: {
    fontSize: 16,
  },

  user__input: {
    height: 50,
    marginTop: 5,
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

  user__notifyMessage: {
    display: 'none',
    height: 50,
    marginVertical: 30,
  },

  user__notifyMessage__isShow: {
    display: 'flex',
  },
});
