import { StyleSheet, Platform } from 'react-native';

export default StyleSheet.create({
  code: {
    flex: 1,
    alignItems: 'center',
  },

  code__container: {
    flex: 1,
    justifyContent: 'center',
  },

  code__text: {
    fontSize: 20,
  },

  code__field: {
    height: 50,
    marginVertical: 20,
    elevation: Platform.OS === 'android' ? 5 : undefined,
    zIndex: 5,
  },

  code__button: {
    backgroundColor: 'orange',
  },
});
