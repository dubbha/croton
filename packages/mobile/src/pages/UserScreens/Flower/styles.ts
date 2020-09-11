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
    marginBottom: 10,
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
    justifyContent: 'center',
    alignItems: 'center',
    height: 30,
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

  flower__action: {
    width: '100%',
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderWidth: 1,
    borderColor: COLORS.lightGrey,
    borderRadius: 5,
    backgroundColor: COLORS.lightMain,
  },

  flower__action__first: {
    marginTop: 0,
  },

  flower__action__header: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
  },

  flower__action__body: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10,
  },

  flower__action__footer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },

  flower__action__icon: {
    width: 30,
    height: 30,
    borderRadius: 50,
    backgroundColor: COLORS.lightGrey,
  },

  flower__action__icon__success: {
    backgroundColor: COLORS.green,
  },

  flower__action__icon__failed: {
    backgroundColor: COLORS.lightRed,
  },

  flower__action__name: {
    fontSize: 18,
    marginLeft: 10,
  },

  flower__action__button: {
    flex: 0.7,
  },
});
