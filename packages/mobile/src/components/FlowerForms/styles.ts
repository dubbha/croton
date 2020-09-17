import { StyleSheet, Platform } from 'react-native';
import { COMPONENTS_STYLE, COLORS } from '../../styles';

export default StyleSheet.create({
  flowerForm: {
    flex: 1,
  },

  flowerForm__content: {
    flex: 1,
  },

  flowerForm__keyboard: {
    flexGrow: 1,
  },

  flowerForm__header: {
    height: 55,
    paddingRight: 20,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGrey,
    paddingHorizontal: COMPONENTS_STYLE.paddingHorizontal,
  },

  flowerForm__body: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: COMPONENTS_STYLE.paddingHorizontal,
  },

  flowerForm__footer: {
    width: '100%',
    justifyContent: 'space-between',
    paddingHorizontal: COMPONENTS_STYLE.paddingHorizontal,
    paddingVertical: 20,
  },

  flowerForm__header__content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },

  flowerForm__header__text: {
    fontWeight: '800',
  },

  flowerForm__message: {
    height: 30,
  },

  flowerForm__accordionsWrap: {
    maxHeight: 300,
    paddingVertical: 10,
    marginTop: 10,
  },

  flowerForm__inputWrap: {
    minHeight: 50,
    marginTop: 20,
  },

  flowerForm__inputWrap__1: {
    elevation: Platform.OS === 'android' ? 15 : undefined,
    zIndex: 15,
  },

  flowerForm__inputWrap__2: {
    elevation: Platform.OS === 'android' ? 10 : undefined,
    zIndex: 10,
  },

  flowerForm__inputWrap__3: {
    elevation: Platform.OS === 'android' ? 5 : undefined,
    zIndex: 5,
  },

  flowerForm__accordion: {
    minHeight: 50,
    marginTop: 20,
  },

  flowerForm__accordion__first: {
    marginTop: 0,
  },

  flowerForm__button: {
    height: 50,
    width: '100%',
  },

  flowerForm__close: {
    color: COLORS.lightBlue,
    fontSize: 18,
    fontWeight: '500',
  },
});
