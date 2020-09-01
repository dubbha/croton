import { StyleSheet } from 'react-native';
import { COLORS, COMPONENTS_STYLE } from '../../../styles/Theme';

export default StyleSheet.create({
  shelf: {
    flex: 1,
    paddingHorizontal: COMPONENTS_STYLE.mainPaddingHorizontal,
  },

  shelf__header: {
    justifyContent: 'center',
    minHeight: 50,
    marginBottom: 20,
  },

  shelf__body: {
    flex: 1,
  },

  shelves__modal: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: COLORS.lightMain,
  },

  shelf__message: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 25,
    marginVertical: 5,
  },

  shelf__buttons: {
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
    minHeight: 50,
  },

  shelf__button: {
    flex: 0.3,
  },

  shelf__flowerWrap: {
    flex: 1,
    paddingVertical: 10,
  },

  shelf__list: {
    flex: 1,
  },

  shelf__item: {
    flex: 0.3,
    marginTop: 10,
    minHeight: 50,
  },
});
