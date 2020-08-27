import { StyleSheet, Platform } from 'react-native';

import { COMPONENTS_STYLE } from '../../../styles';

export default StyleSheet.create({
  container: {
    flex: 1,
  },

  container__test: {
    flex: 1,
  },

  container__scroll: {
    flexGrow: 1,
    justifyContent: 'space-between',
    flexDirection: 'column',
    paddingHorizontal: 30,
    paddingTop: 50,
  },

  container__body: {
    flex: 1,
  },

  container__topPart: {
    flex: 0,
    height: COMPONENTS_STYLE.buttonHeight,
  },

  container__bottomPart: {
    flex: 0.5,
    flexDirection: 'column',
    alignItems: 'center',
  },

  container__divider: {
    flex: 0,
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: COMPONENTS_STYLE.buttonHeight,
  },

  container__inputWrap: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 20,
  },

  container__inputWrap__first: {
    marginTop: 0,
  },

  // TODO:
  // It make sense make one component with inputs array
  // and there use key as elevation and z-index value
  container__inputWrap__1: {
    elevation: Platform.OS === 'android' ? 25 : undefined,
    zIndex: 25,
  },

  container__inputWrap__2: {
    elevation: Platform.OS === 'android' ? 20 : undefined,
    zIndex: 20,
  },

  container__inputWrap__3: {
    elevation: Platform.OS === 'android' ? 15 : undefined,
    zIndex: 15,
  },

  container__inputWrap__4: {
    elevation: Platform.OS === 'android' ? 10 : undefined,
    zIndex: 10,
  },

  container__inputWrap__5: {
    elevation: Platform.OS === 'android' ? 5 : undefined,
    zIndex: 5,
  },

  container__img: {
    resizeMode: 'contain',
    position: 'relative',
    overflow: 'hidden',
  },
});
