import { StyleSheet } from 'react-native';
import { COLORS, COMPONENTS_STYLE } from '../../styles';

export default StyleSheet.create({
  accordion: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderWidth: COMPONENTS_STYLE.borderWidth,
    borderColor: COLORS.lightGrey,
    borderRadius: COMPONENTS_STYLE.borderRadiusMedium,
    overflow: 'hidden',
  },

  accordion__header: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderBottomWidth: 0,
    borderColor: COLORS.lightGrey,
  },

  accordion__header__expand: {
    height: 'auto',
    borderBottomWidth: 1,
  },

  accordion__body: {
    width: '100%',
    paddingHorizontal: 5,
    paddingTop: 10,
    paddingBottom: 20,
  },

  accordion__title: {
    fontSize: 14,
  },
});
