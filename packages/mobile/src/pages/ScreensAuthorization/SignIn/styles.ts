import { StyleSheet, Platform } from 'react-native';

import { COMPONENTS_STYLE } from '../../../styles';

export default StyleSheet.create({
  container: {
    flex: 1,
  },

  container__scroll: {
    flexGrow: 1,
    justifyContent: 'space-between',
    flexDirection: 'column',
    paddingHorizontal: COMPONENTS_STYLE.paddingHorizontal,
    paddingTop: 50,
  },

  container__body: {
    flex: 1,
  },

  container__topPart: {
    flex: 0,
    height: COMPONENTS_STYLE.mainHeight,
  },

  container__bottomPart: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'stretch',
  },

  container__divider: {
    flex: 0,
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: COMPONENTS_STYLE.mainHeight,
  },

  container__inputWrap: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 20,
  },

  container__inputWrap__first: {
    marginTop: 0,
  },

  container__inputWrap__button: {
    flexDirection: 'column',
  },

  // TODO:
  // It make sense make one component with inputs array
  // and there use key as elevation and z-index value
  container__inputWrap__1: {
    elevation: Platform.OS === 'android' ? 10 : undefined,
    zIndex: 10,
  },

  container__inputWrap__2: {
    elevation: Platform.OS === 'android' ? 5 : undefined,
    zIndex: 5,
  },

  container__img: {
    alignSelf: 'center',
    resizeMode: 'contain',
    position: 'relative',
    overflow: 'hidden',
  },
});
