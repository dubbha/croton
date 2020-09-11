import { StyleSheet } from 'react-native';
import { COLORS } from '../../styles';

export default StyleSheet.create({
  accordion: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderWidth: 1,
    borderColor: COLORS.lightGrey,
    borderRadius: 5,
  },

  accordion__header: {
    width: '100%',
    paddingHorizontal: 5,
    paddingVertical: 5,
    borderBottomWidth: 0,
    borderColor: COLORS.lightGrey,
  },

  accordion__header__expand: {
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
