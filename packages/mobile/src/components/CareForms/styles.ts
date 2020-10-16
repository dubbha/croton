import { StyleSheet } from 'react-native';
import { COMPONENTS_STYLE } from '../../styles/Theme';

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
    borderWidth: COMPONENTS_STYLE.borderWidth,
    borderRadius: COMPONENTS_STYLE.borderRadiusMedium,
    textAlign: 'center',
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

  careForm__days: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
  },

  careForm__day: {
    flex: 0.14,
    padding: 5,
  },
});
