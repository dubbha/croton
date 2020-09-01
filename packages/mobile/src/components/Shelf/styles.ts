import { StyleSheet } from 'react-native';
import { COLORS } from '../../styles';

export default StyleSheet.create({
  shelf: {
    flex: 1,
  },

  shelf__body: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 5,
    borderColor: COLORS.lightGrey,
    borderWidth: 1,
    borderRadius: 5,
  },

  shelf__leftPart: {
    flex: 0.2,
  },

  shelf__rightPart: {
    flex: 0.75,
  },

  shelf__picture: {
    flex: 1,
    borderRadius: 20,
    overflow: 'hidden',
  },

  shelf__img: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },

  shelf__title: {
    fontSize: 18,
    color: COLORS.green,
  },

  shelf__location: {
    fontSize: 14,
    color: COLORS.lightGrey,
  },

  shelf__description: {
    fontSize: 14,
    color: COLORS.green,
  },
});
