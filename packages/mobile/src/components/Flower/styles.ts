import { StyleSheet } from 'react-native';
import { COLORS } from '../../styles';

export default StyleSheet.create({
  flower: {
    flex: 1,
  },

  flower__body: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 5,
    borderColor: COLORS.lightGrey,
    borderWidth: 1,
    borderRadius: 5,
  },

  flower__leftPart: {
    flex: 0.2,
  },

  flower__rightPart: {
    flex: 0.75,
  },

  flower__picture: {
    flex: 1,
    borderRadius: 20,
    overflow: 'hidden',
  },

  flower__img: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },

  flower__title: {
    fontSize: 18,
    color: COLORS.green,
  },

  flower__location: {
    fontSize: 14,
    color: COLORS.lightGrey,
  },

  flower__description: {
    fontSize: 14,
    color: COLORS.green,
  },
});
