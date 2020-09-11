import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  careForm: {
    flex: 1,
  },

  careForm__header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  careForm__body: {
    flex: 1,
  },

  careForm__body__part: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  careForm__footer: {
    marginTop: 20,
  },

  careForm__input: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginHorizontal: 5,
    borderWidth: 1,
    borderRadius: 5,
  },

  careForm__header__title: {
    fontSize: 16,
  },

  careForm__header__picker: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 5,
  },

  careForm__months: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    minHeight: 60,
    marginTop: 20,
  },

  careForm__month: {
    flex: 0.14,
    padding: 5,
    zIndex: 5,
    minHeight: 60,
  },
});
