import { StyleSheet } from 'react-native';

import { COMPONENTS_STYLE } from '../../../styles';

export default StyleSheet.create({
  settings: {
    flex: 1,
  },

  settings__area: {
    flex: 1,
  },

  settings__body: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    paddingHorizontal: COMPONENTS_STYLE.mainPaddingHorizontal,
  },

  settings__pictureWrap: {
    flexDirection: 'row',
    justifyContent: 'center',
  },

  settings__field: {
    minHeight: 50,
    marginTop: 20,
  },

  settings__field__first: {
    marginTop: 0,
  },

  settings__label: {
    fontSize: 16,
  },

  settings__input: {
    height: 50,
    marginTop: 5,
  },

  settings__picture: {
    flexDirection: 'column',
    alignItems: 'center',
  },

  settings__picture__img: {
    width: 100,
    height: 100,
    borderRadius: 50,
    overflow: 'hidden',
  },

  settings__picture__text: {
    marginTop: 10,
    fontSize: 24,
    fontWeight: '700',
  },

  settings__photo: {
    flex: 1,
    resizeMode: 'cover',
  },

  settings__notifyMessage: {
    display: 'none',
    height: 30,
    marginTop: 30,
    marginBottom: 15,
  },

  settings__notifyMessage__isShow: {
    display: 'flex',
  },
});
