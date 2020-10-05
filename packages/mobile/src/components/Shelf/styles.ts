import { StyleSheet } from 'react-native';
import { COLORS, COMPONENTS_STYLE } from '../../styles';

export default StyleSheet.create({
  shelf: {
    flex: 1,
  },

  shelf__body: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: COMPONENTS_STYLE.paddingMedium,
    paddingHorizontal: COMPONENTS_STYLE.paddingMedium,
    backgroundColor: COLORS.lightMain,
    borderColor: COLORS.green,
    borderWidth: COMPONENTS_STYLE.borderWidth,
    borderRadius: COMPONENTS_STYLE.borderRadiusMedium,
  },

  shelf__leftPart: {
    flex: 0.2,
  },

  shelf__rightPart: {
    flex: 0.75,
  },

  shelf__picture: {
    flex: 1,
    maxHeight: 70,
    borderRadius: COMPONENTS_STYLE.borderRadiusMedium,
    overflow: 'hidden',
  },

  shelf__img: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },

  shelf__title: {
    color: COLORS.green,
    fontSize: COMPONENTS_STYLE.fontSizeMedium,
  },

  shelf__location: {
    color: COLORS.lightGrey,
    fontSize: COMPONENTS_STYLE.fontSizeAddition,
  },

  shelf__description: {
    color: COLORS.darkMain,
    fontSize: COMPONENTS_STYLE.fontSizeSmall,
  },
});
