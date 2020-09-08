import React, { FC, useState } from 'react';
import { RRule } from 'rrule';

import {
  SafeAreaView,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { useDispatch } from 'react-redux';

import styles from './styles';
import {
  SHELF_FLOWERS_GET,
  SHELF_FLOWER_ADD,
  SHELF_FLOWER_EDIT,
} from '../../store/shelves/actions';
import { ValidationResult } from '../Input/interfaces';
import { FlowerInterface } from '../Flower/interface';
import {
  inputValidatorFunctionalComponent,
  hideMessageFunctionalComponent,
} from '../Input/helpers';
import { ShelfFormHeader } from './FlowerFormHeader';
import { CustomInput } from '../Input';
import { CustomButton } from '../Button';
import { NotifyMessage } from '../NotifyMessage';
import { Accordion } from '../Accordion';
import { daysName, rrulesDefaultValue, timingTypes } from './helpers';
import { CareForm } from '../CareForms';

interface FlowerFormConfigProps {
  closeFunc: (name?: string) => void;
  shelfId?: 'string';
  flower?: FlowerInterface;
}
export const FlowerFormConfig: FC<FlowerFormConfigProps> = ({
  flower = {},
  shelfId,
  closeFunc,
}) => {
  const dispatch = useDispatch();
  // TODO: this object we should import from input component
  const validationStatusDefaultValue = {
    status: null,
    isShowMessage: false,
  };
  const [isEdit] = useState(Boolean(flower.name));
  const [isNameChanged, setIsNameChanged] = useState('');
  const [flowerName, setFlowerName] = useState(flower.name || '');
  const [flowerDescription, setFlowerDescription] = useState(
    flower.description || '',
  );
  const [validationStatusFlowerName, setValidationStatusFlowerName] = useState<
    ValidationResult
  >(validationStatusDefaultValue);
  const [
    validationStatusFlowerDescription,
    setValidationStatusFlowerDescription,
  ] = useState<ValidationResult>(validationStatusDefaultValue);

  // TODO: Move this functionality for separate class
  const getRruleType = (rrule: any) => {
    const { freq } = rrule;
    if (!freq) {
      return null;
    }
    let type;
    switch (freq) {
      case 2: {
        type = timingTypes.weekly;
        break;
      }
      case 3: {
        type = timingTypes.daily;
        break;
      }
      case 4: {
        type = timingTypes.hourly;
        break;
      }
      default: {
        type = null;
      }
    }
    return type;
  };

  const getRruleInterval = (rrule: any) => {
    return rrule.interval;
  };

  const getRruleDay = (day: any) => {
    const index = day.weekday;
    let dayName;

    switch (index) {
      case 0: {
        dayName = daysName.sun;
        break;
      }
      case 1: {
        dayName = daysName.mon;
        break;
      }
      case 2: {
        dayName = daysName.tue;
        break;
      }
      case 3: {
        dayName = daysName.wed;
        break;
      }
      case 4: {
        dayName = daysName.thu;
        break;
      }
      case 5: {
        dayName = daysName.fri;
        break;
      }
      case 6: {
        dayName = daysName.sat;
        break;
      }
    }
    return dayName;
  };

  const getRruleDays = (rrule: any) => {
    const days: (string | undefined)[] = [];
    if (rrule.byweekday) {
      rrule.byweekday.forEach((day: any) => {
        days.push(getRruleDay(day));
      });
    }
    return days.length ? days : [];
  };

  // parse current rrule
  // set rrule
  const getRruleObj = (configs: any) => {
    if (!configs) {
      return '';
    }
    const rrule = RRule.parseString(configs);
    const type = getRruleType(rrule);
    const interval = getRruleInterval(rrule);
    const byweekday = getRruleDays(rrule);

    return {
      type,
      interval,
      byweekday,
    };
  };
  const currentRrules = flower.rrules;
  let currentWateringRules;
  let currentFertilizingRules;
  let currentHydrationRules;
  if (currentRrules) {
    currentWateringRules = getRruleObj(currentRrules.watering);
    currentFertilizingRules = getRruleObj(currentRrules.fertilizing);
    currentHydrationRules = getRruleObj(currentRrules.hydration);
  }
  const [wateringRules, setWateringRules] = useState<any>(
    currentWateringRules || rrulesDefaultValue,
  );
  const [hydrationRules, setHydrationRules] = useState<any>(
    currentHydrationRules || rrulesDefaultValue,
  );
  const [fertilizingRules, setFertilizingRules] = useState<any>(
    currentFertilizingRules || rrulesDefaultValue,
  );

  const getWeekDay = (byweekday?: Array<string>) => {
    if (!byweekday || !byweekday.length) {
      return null;
    }
    const days = byweekday.map(day => RRule[day.toUpperCase()]);
    return days;
  };

  const setFlowerRrulesDefault = () => {
    setWateringRules(rrulesDefaultValue);
    setHydrationRules(rrulesDefaultValue);
    setFertilizingRules(rrulesDefaultValue);
  };

  const setDefaultValue = () => {
    setFlowerName('');
    setFlowerDescription('');
    setFlowerRrulesDefault();
  };

  const setDefaultValidationStatus = () => {
    setValidationStatusFlowerName(validationStatusDefaultValue);
    setValidationStatusFlowerDescription(validationStatusDefaultValue);
  };

  const setDefaultState = () => {
    setDefaultValidationStatus();
    setDefaultValue();
  };

  const getRrule = (rule: any) => {
    const rrule = new RRule({
      freq: RRule[rule.type.toUpperCase()],
      interval: rule.interval,
      byweekday: getWeekDay(rule.byweekday),
      dtstart: new Date(),
    });
    return rrule;
  };

  const getRruleInStr = (rule: any) => {
    const rrule = getRrule(rule);
    return rrule.toString();
  };

  const getRrules = () => {
    const rrules = {
      watering: getRruleInStr(wateringRules),
      hydration: getRruleInStr(hydrationRules),
      fertilizing: getRruleInStr(fertilizingRules),
    };

    return rrules;
  };

  const submitForm = () => {
    const { status: isValidFlowerName } = inputValidatorFunctionalComponent(
      flowerName,
      'flowerName',
      setValidationStatusFlowerName,
      true,
    );
    const {
      status: isValidFlowerDescription,
    } = inputValidatorFunctionalComponent(
      flowerDescription,
      'flowerDescription',
      setValidationStatusFlowerDescription,
      true,
    );
    const isValidAllFields = isValidFlowerName && isValidFlowerDescription;

    if (isValidAllFields) {
      if (isEdit) {
        dispatch({
          type: SHELF_FLOWER_EDIT,
          payload: {
            id: flower.id,
            shelfId: flower.shelfId,
            order: flower.order,
            name: flowerName || new Date().toString(),
            description: flowerDescription || new Date().toString(),
            rrules: getRrules(),
          },
        });
        setDefaultValidationStatus();
        setIsNameChanged(flowerName);
      } else {
        dispatch({
          type: SHELF_FLOWER_ADD,
          payload: {
            shelfId,
            name: flowerName,
            description: flowerDescription,
            rrules: getRrules(),
          },
        });
        setDefaultState();
      }
    } else {
      setTimeout(() => {
        hideMessageFunctionalComponent(
          {
            status: isValidFlowerName,
            isShowMessage: false,
          },
          setValidationStatusFlowerName,
        );
        hideMessageFunctionalComponent(
          {
            status: isValidFlowerDescription,
            isShowMessage: false,
          },
          setValidationStatusFlowerDescription,
        );
      }, 2000);
    }
  };

  const closeModalFunc = () => {
    const id = flower.shelfId ? flower.shelfId : shelfId;
    dispatch({
      type: SHELF_FLOWERS_GET,
      payload: { shelfId: id },
    });
    closeFunc(isNameChanged);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.flowerForm}>
      <SafeAreaView style={styles.flowerForm__content}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            scrollEnabled={Platform.OS === 'android' ? false : true}
            contentContainerStyle={styles.flowerForm__keyboard}>
            <View style={styles.flowerForm__header}>
              <ShelfFormHeader closeFunc={closeModalFunc} />
            </View>
            <View style={styles.flowerForm__body}>
              <View style={styles.flowerForm__message}>
                <NotifyMessage />
              </View>
              <View>
                <View
                  style={[
                    styles.flowerForm__inputWrap,
                    styles.flowerForm__inputWrap__1,
                  ]}>
                  <CustomInput
                    inputType="flowerName"
                    value={flowerName}
                    validationStatus={validationStatusFlowerName}
                    onChangeText={(data: string) => setFlowerName(data)}
                    onBlur={() =>
                      inputValidatorFunctionalComponent(
                        flowerName,
                        'flowerName',
                        setValidationStatusFlowerName,
                      )
                    }
                  />
                </View>
                <View
                  style={[
                    styles.flowerForm__inputWrap,
                    styles.flowerForm__inputWrap__2,
                  ]}>
                  <CustomInput
                    inputType="flowerDescription"
                    value={flowerDescription}
                    validationStatus={validationStatusFlowerDescription}
                    onChangeText={(data: string) => setFlowerDescription(data)}
                    onBlur={() =>
                      inputValidatorFunctionalComponent(
                        flowerDescription,
                        'flowerDescription',
                        setValidationStatusFlowerDescription,
                      )
                    }
                  />
                </View>
              </View>
              {/* TODO: should make scroll for last open accordion item*/}
              <ScrollView style={styles.flowerForm__accordions}>
                <View
                  style={[
                    styles.flowerForm__accordion,
                    styles.flowerForm__accordion__first,
                  ]}>
                  <Accordion title="Watering">
                    <CareForm
                      defaultParameters={wateringRules}
                      setParameter={setWateringRules}
                    />
                  </Accordion>
                </View>
                <View style={styles.flowerForm__accordion}>
                  <Accordion title="Hydration">
                    <CareForm
                      defaultParameters={hydrationRules}
                      setParameter={setHydrationRules}
                    />
                  </Accordion>
                </View>
                <View style={styles.flowerForm__accordion}>
                  <Accordion title="Fertilizing">
                    <CareForm
                      defaultParameters={fertilizingRules}
                      setParameter={setFertilizingRules}
                    />
                  </Accordion>
                </View>
              </ScrollView>
            </View>
            <View style={styles.flowerForm__footer}>
              <View style={styles.flowerForm__button}>
                <CustomButton
                  title="Submit"
                  variant="primary"
                  onPress={() => submitForm()}
                />
              </View>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};
