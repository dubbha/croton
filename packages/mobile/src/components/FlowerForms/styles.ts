import { StyleSheet, Platform } from 'react-native';
import { COMPONENTS_STYLE, COLORS } from '../../styles';

export default StyleSheet.create({
  flowerForm: {
    flex: 1,
    flexDirection: 'column',
  },

  flowerForm__modal: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: COLORS.lightMain,
  },

  flowerForm__header: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    height: 55,
    paddingRight: 20,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGrey,
    paddingHorizontal: COMPONENTS_STYLE.mainPaddingHorizontal,
  },

  flowerForm__header__text: {
    fontWeight: '800',
  },

  flowerForm__body: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: COMPONENTS_STYLE.mainPaddingHorizontal,
  },

  flowerForm__message: {
    marginTop: 10,
    minHeight: 30,
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

  flowerForm__buttonWrap: {
    height: 70,
    marginTop: 20,
    justifyContent: 'space-between',
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
