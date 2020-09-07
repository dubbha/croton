import React, { useState, useEffect } from 'react';
import { View, Text, TextInput } from 'react-native';

import styles from './styles';
import { daysName } from '../FlowerForms/helpers';
import { CustomButton } from './../Button';

export const CareFormWeekly = (props: any) => {
  const { setInterval, defaultInterval } = props;
  const [value, setValue] = useState(defaultInterval.interval);
  const [days, setDay] = useState<Array<string>>(
    defaultInterval.byweekday || [],
  );

  useEffect(() => {
    setInterval({
      byweekday: days,
      interval: value,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [days]);

  const isDayExists = (day: any) => {
    const result = days.indexOf(day);
    return result !== -1;
  };

  const setDayHandler = (day: any) => {
    const isExist = isDayExists(day);
    if (isExist) {
      const filteredDays = days.filter(item => item !== day);
      setDay(filteredDays);
    } else {
      setDay([...days, day]);
    }
  };

  return (
    <View>
      <View style={styles.careForm__body__part}>
        <Text>Repeat every</Text>
        <TextInput
          keyboardType="decimal-pad"
          style={styles.careForm__input}
          value={String(value)}
          onChangeText={data => setValue(data)}
          onBlur={() => {
            setInterval({
              byweekday: days,
              interval: value,
            });
          }}
        />
        <Text>week(s)</Text>
      </View>
      <View style={styles.careForm__body__part}>
        <View style={styles.careForm__months}>
          <CustomButton
            variant={isDayExists(daysName.mon) ? 'primary__solid' : 'primary'}
            title={daysName.mon}
            onPress={() => setDayHandler(daysName.mon)}
            style={styles.careForm__month}
          />
          <CustomButton
            variant={isDayExists(daysName.tue) ? 'primary__solid' : 'primary'}
            title={daysName.tue}
            onPress={() => setDayHandler(daysName.tue)}
            style={styles.careForm__month}
          />
          <CustomButton
            variant={isDayExists(daysName.wed) ? 'primary__solid' : 'primary'}
            title={daysName.wed}
            onPress={() => setDayHandler(daysName.wed)}
            style={styles.careForm__month}
          />
          <CustomButton
            variant={isDayExists(daysName.thu) ? 'primary__solid' : 'primary'}
            title={daysName.thu}
            onPress={() => setDayHandler(daysName.thu)}
            style={styles.careForm__month}
          />
          <CustomButton
            variant={isDayExists(daysName.fri) ? 'primary__solid' : 'primary'}
            title={daysName.fri}
            onPress={() => setDayHandler(daysName.fri)}
            style={styles.careForm__month}
          />
          <CustomButton
            variant={isDayExists(daysName.sat) ? 'primary__solid' : 'primary'}
            title={daysName.sat}
            onPress={() => setDayHandler(daysName.sat)}
            style={styles.careForm__month}
          />
          <CustomButton
            variant={isDayExists(daysName.sun) ? 'primary__solid' : 'primary'}
            title={daysName.sun}
            onPress={() => setDayHandler(daysName.sun)}
            style={styles.careForm__month}
          />
        </View>
      </View>
    </View>
  );
};
