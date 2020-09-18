import { StyleSheet } from 'react-native';
import { COLORS, COMPONENTS_STYLE } from '../../../styles/Theme';

export default StyleSheet.create({
  shelf: {
    flex: 1,
    flexDirection: 'column',
    paddingHorizontal: COMPONENTS_STYLE.paddingHorizontal,
  },

  shelf__body: {
    flex: 0.8,
    paddingTop: COMPONENTS_STYLE.paddingFromTop,
  },

  shelf__footer: {
    flex: 0.2,
    paddingTop: 10,
    paddingBottom: COMPONENTS_STYLE.paddingFromBottom,
  },

  shelf__footer__content: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },

  shelf__modal: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: COLORS.lightMain,
  },

  shelf__info__item: {
    minHeight: 60,
    marginBottom: 15,
    borderRadius: COMPONENTS_STYLE.borderRadiusMedium,
    backgroundColor: COLORS.lightMain,
  },

  shelf__buttons: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  shelf__button: {
    flex: 0.3,
  },

  shelf__flowerWrap: {
    flex: 1,
    paddingVertical: 10,
    backgroundColor: 'lightgreen',
  },

  shelf__item: {
    flex: 0.3,
    marginTop: 10,
    minHeight: 50,
  },

  shelf__item__first: {
    marginTop: 0,
  },
});
