import { StyleSheet, Platform } from 'react-native';
import { COMPONENTS_STYLE, COLORS } from '../../styles';

export default StyleSheet.create({
  shelfForm: {
    flex: 1,
    flexDirection: 'column',
  },

  shelfForm__modal: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: COLORS.lightMain,
  },

  shelfForm__header: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    height: 55,
    paddingRight: 20,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGrey,
    paddingHorizontal: COMPONENTS_STYLE.paddingHorizontal,
  },

  shelfForm__header__text: {
    fontWeight: '800',
  },

  shelfForm__body: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: COMPONENTS_STYLE.paddingHorizontal,
  },

  shelfForm__message: {
    marginTop: 10,
    minHeight: 30,
  },

  shelfForm__inputWrap: {
    minHeight: 50,
    marginTop: 20,
  },

  shelfForm__inputWrap__1: {
    elevation: Platform.OS === 'android' ? 15 : undefined,
    zIndex: 15,
  },

  shelfForm__inputWrap__2: {
    elevation: Platform.OS === 'android' ? 10 : undefined,
    zIndex: 10,
  },

  shelfForm__inputWrap__3: {
    elevation: Platform.OS === 'android' ? 5 : undefined,
    zIndex: 5,
  },

  shelfForm__buttonWrap: {
    height: 70,
    marginTop: 20,
    justifyContent: 'space-between',
  },

  shelfForm__button: {
    height: 50,
    width: '100%',
  },

  shelfForm__close: {
    color: COLORS.lightBlue,
    fontSize: 18,
    fontWeight: '500',
  },
});
