import { StyleSheet } from 'react-native';
import { COLORS, COMPONENTS_STYLE } from '../../styles';

export default StyleSheet.create({
  flower: {
    flex: 1,
  },

  flower__body: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    minHeight: 70,
    paddingVertical: COMPONENTS_STYLE.paddingMedium,
    paddingHorizontal: COMPONENTS_STYLE.paddingMedium,
    borderColor: COLORS.green,
    backgroundColor: COLORS.lightMain,
    borderWidth: COMPONENTS_STYLE.borderWidth,
    borderRadius: COMPONENTS_STYLE.borderRadiusMedium,
  },

  flower__leftPart: {
    flex: 0.2,
  },

  flower__rightPart: {
    flex: 0.75,
  },

  flower__picture: {
    flex: 1,
    maxHeight: 70,
    borderRadius: COMPONENTS_STYLE.borderRadiusMedium,
    overflow: 'hidden',
  },

  flower__img: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },

  flower__title: {
    color: COLORS.green,
    fontSize: COMPONENTS_STYLE.fontSizeMedium,
  },

  flower__description: {
    color: COLORS.darkMain,
    fontSize: COMPONENTS_STYLE.fontSizeSmall,
  },
});
