import { StyleSheet } from 'react-native';
import { COLORS, COMPONENTS_STYLE } from '../../../styles/Theme';

export default StyleSheet.create({
  flower: {
    flex: 1,
    paddingHorizontal: COMPONENTS_STYLE.mainPaddingHorizontal,
  },

  flower__header: {
    justifyContent: 'center',
    minHeight: 50,
    marginBottom: 20,
  },

  flower__body: {
    flex: 1,
  },

  flower__modal: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: COLORS.lightMain,
  },

  flower__message: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 25,
    marginVertical: 5,
  },

  flower__buttons: {
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 15,
    minHeight: 50,
  },

  flower__button: {
    flex: 0.45,
  },

  flower__flowerWrap: {
    flex: 1,
    paddingVertical: 10,
  },

  flower__list: {
    flex: 1,
  },

  flower__item: {
    flex: 0.3,
    marginTop: 10,
    minHeight: 50,
  },
});
