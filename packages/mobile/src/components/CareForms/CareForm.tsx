import React, { useState } from 'react';
import { Picker } from '@react-native-community/picker';
import { View, Text } from 'react-native';
import { timingTypes } from '../FlowerForms/helpers';
import { CareFormHourly } from './CareFormHourly';
import { CareFormDaily } from './CareFormDaily';
import { CareFormWeekly } from './CareFormWeekly';
import { CareFormMounthly } from './CareFormMounthly';

import styles from './styles';

export const CareForm = (props: any) => {
  const { setParameter, defaultParameters } = props;
  const [timingType, setTimingType] = useState(defaultParameters.type);

  const setInterval = (interval: any) => {
    setParameter({ type: timingType, ...interval });
  };

  const renderForm = () => {
    let form = null;
    switch (timingType) {
      case timingTypes.hourly: {
        form = (
          <CareFormHourly
            defaultInterval={defaultParameters}
            setInterval={setInterval}
          />
        );
        break;
      }

      case timingTypes.daily: {
        form = (
          <CareFormDaily
            defaultInterval={defaultParameters}
            setInterval={setInterval}
          />
        );
        break;
      }

      case timingTypes.weekly: {
        form = (
          <CareFormWeekly
            defaultInterval={defaultParameters}
            setInterval={setInterval}
          />
        );
        break;
      }

      case timingTypes.monthly: {
        form = (
          <CareFormMounthly
            defaultInterval={defaultParameters}
            setInterval={setInterval}
          />
        );
        break;
      }

      default: {
        form = (
          <CareFormHourly
            defaultInterval={defaultParameters}
            setInterval={setInterval}
          />
        );
      }
    }

    return form;
  };

  return (
    <View style={styles.careForm}>
      <View style={styles.careForm__header}>
        <Text style={styles.careForm__header__title}>Type:</Text>
        <Picker
          style={styles.careForm__header__picker}
          selectedValue={timingType}
          onValueChange={itemValue => {
            // TODO: We should to correct interval according to timing type
            setTimingType(itemValue);
          }}>
          <Picker.Item label={timingTypes.hourly} value={timingTypes.hourly} />
          <Picker.Item label={timingTypes.daily} value={timingTypes.daily} />
          <Picker.Item label={timingTypes.weekly} value={timingTypes.weekly} />
        </Picker>
      </View>
      <View style={styles.careForm__body}>{renderForm()}</View>
    </View>
  );
};
