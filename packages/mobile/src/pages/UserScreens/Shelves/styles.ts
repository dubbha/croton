import { StyleSheet } from 'react-native';
import { COMPONENTS_STYLE, COLORS } from '../../../styles';

export default StyleSheet.create({
  shelves: {
    flex: 1,
  },

  shelves__content: {
    flex: 1,
    flexDirection: 'column',
    paddingHorizontal: COMPONENTS_STYLE.paddingHorizontal,
  },

  shelves__body: {
    flex: 1,
    paddingTop: COMPONENTS_STYLE.paddingFromTop,
  },

  shelves__footer: {
    paddingTop: 10,
    paddingBottom: COMPONENTS_STYLE.paddingFromBottom,
  },

  shelves__modal: {
    flex: 1,
  },

  shelves__modal__body: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: COLORS.lightMain,
  },

  shelves__listWrap: {
    flex: 1,
    paddingVertical: 10,
  },

  shelves__list: {
    flex: 1,
  },

  shelves__item: {
    flex: 0.3,
    marginTop: 10,
    minHeight: 50,
  },

  shelves__item__first: {
    marginTop: 0,
  },

  shelves__message: {
    minHeight: 30,
    marginVertical: 10,
  },
});
