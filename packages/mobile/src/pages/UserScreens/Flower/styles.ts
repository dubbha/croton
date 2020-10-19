import { StyleSheet } from 'react-native';
import { COLORS, COMPONENTS_STYLE } from '../../../styles/Theme';

export default StyleSheet.create({
  flower: {
    flex: 1,
  },

  flower__content: {
    flex: 1,
    flexDirection: 'column',
    paddingHorizontal: COMPONENTS_STYLE.paddingHorizontal,
  },

  flower__body: {
    flex: 1,
  },

  flower__footer: {
    paddingTop: 20,
    paddingBottom: COMPONENTS_STYLE.paddingFromBottom,
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

  flower__info: {
    paddingTop: COMPONENTS_STYLE.paddingFromTop,
    paddingBottom: COMPONENTS_STYLE.paddingFromBottom,
    marginBottom: 20,
    backgroundColor: COLORS.lightMain,
    borderRadius: COMPONENTS_STYLE.borderRadiusMedium,
  },

  flower__info__item: {
    marginTop: 15,
  },

  flower__info__item__first: {
    marginTop: 0,
  },

  flower__description: {
    paddingHorizontal: COMPONENTS_STYLE.paddingHorizontal,
    fontSize: COMPONENTS_STYLE.fontSizeMedium,
    textAlign: 'center',
  },

  flower__pictureWrap: {
    flexDirection: 'row',
    justifyContent: 'center',
  },

  flower__picture: {
    flexDirection: 'column',
    alignItems: 'center',
  },

  flower__picture__img: {
    width: 100,
    height: 100,
    borderRadius: COMPONENTS_STYLE.borderRadiusSmall,
    overflow: 'hidden',
  },

  flower__photo: {
    flex: 1,
    resizeMode: 'cover',
  },

  flower__buttons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },

  flower__button: {
    flex: 0.45,
  },

  flower__action: {
    width: '100%',
    marginTop: 20,
    paddingVertical: COMPONENTS_STYLE.paddingFromTop,
    paddingHorizontal: COMPONENTS_STYLE.paddingHorizontal,
    borderWidth: COMPONENTS_STYLE.borderWidth,
    borderColor: COLORS.lightGrey,
    borderRadius: COMPONENTS_STYLE.borderRadiusMedium,
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
    width: 25,
    height: 25,
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
    fontSize: COMPONENTS_STYLE.fontSizeMedium,
    marginLeft: 10,
  },

  flower__action__description: {
    fontSize: COMPONENTS_STYLE.fontSizeSmall,
    color: COLORS.lightGrey,
  },

  flower__action__button: {
    flex: 0.7,
  },
});
