import { StyleSheet } from 'react-native';
import { COMPONENTS_STYLE, COLORS } from '../../../styles';

export default StyleSheet.create({
  shelves: {
    flex: 1,
    flexDirection: 'column',
    paddingHorizontal: COMPONENTS_STYLE.mainPaddingHorizontal,
  },

  shelves__header: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },

  shelves__body: {
    flex: 1,
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

  shelves__message: {
    minHeight: 30,
    marginVertical: 10,
  },
});
