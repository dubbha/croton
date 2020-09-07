import React, { useState } from 'react';
import { View, Text, TextInput } from 'react-native';

import styles from './styles';

export const CareFormDaily = (props: any) => {
  const { setInterval, defaultInterval } = props;
  const [value, setValue] = useState(defaultInterval.interval);

  return (
    <View style={styles.careForm__body__part}>
      <Text>Repeat every</Text>
      <TextInput
        keyboardType="decimal-pad"
        style={styles.careForm__input}
        value={String(value)}
        onChangeText={data => setValue(data)}
        onBlur={() => {
          setInterval({ interval: value });
        }}
      />
      <Text>day(s)</Text>
    </View>
  );
};
