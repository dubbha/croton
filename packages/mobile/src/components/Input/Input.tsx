import React from 'react';
import { TextInput, Text, StyleSheet, View } from 'react-native';

import { THEME } from '../../styles/Theme';

export const CustomInput = () => {
  const [value, onChangeText] = React.useState('Custom Input');

  return (
    <View style={styles.input}>
      <TextInput
        style={styles.input__field}
        onChangeText={text => onChangeText(text)}
        value={value}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    flex: 1,
    height: 50,
    borderRadius: 5,
    borderColor: THEME.greyLight,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { 
      width: 0,
      height: -3
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  input__field: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 17,
  },
});
