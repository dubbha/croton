import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  code: {
    flex: 1,
    alignItems: 'center',
  },

  code__container: {
    flex: 1,
    justifyContent: 'center',
  },

  code__header: {
    height: 30,
    marginBottom: 15,
  },

  code__text: {
    fontSize: 20,
    textAlign: 'center',
  },

  code__fields: {
    flexDirection: 'row',
    justifyContent: 'center',
  },

  code__field: {
    minHeight: 75,
    width: 75,
    paddingBottom: 0,
    marginVertical: 20,
    marginHorizontal: 5,
    borderBottomWidth: 1,
    fontSize: 40,
    textAlign: 'center',
    textAlignVertical: 'bottom',
  },

  code__button: {
    height: 50,
  },
});
