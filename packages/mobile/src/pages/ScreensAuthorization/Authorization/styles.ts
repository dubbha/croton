import { StyleSheet, Platform } from 'react-native';

import { COLORS } from '../../../styles';

export default StyleSheet.create({
  container: {
    flex: 1,
  },

  container__bg: {
    flex: 1,
    resizeMode: 'cover',
  },

  container__body: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },

  topPart: {
    flex: 0.4,
    flexDirection: 'column',
    justifyContent: 'center',
  },

  bottomPart: {
    flex: 0.5,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 30,
  },

  buttonsWrap: {
    flex: 0.4,
    justifyContent: 'space-between',
    width: '80%',
  },

  button: {
    flex: Platform.OS === 'android' ? 0.45 : 0.5,
  },

  mainText: {
    color: COLORS.green,
    fontWeight: 'bold',
    fontSize: 24,
  },

  additionText: {
    marginTop: 20,
    color: COLORS.green,
    fontSize: 18,
  },

  androidButton: {
    marginTop: 10,
  },
});
