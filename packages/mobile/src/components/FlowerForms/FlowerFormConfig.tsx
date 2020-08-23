import React, { FC, useState } from 'react';
import { SafeAreaView, View } from 'react-native';
import { useDispatch } from 'react-redux';

import styles from './styles';
import {
  SHELF_FLOWER_GET,
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
  // TODO: remove this mockup
  const FakeRrules = '{"watering":"","hydration":"","fertilizing":""}';
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

  const setDefaultValue = () => {
    setFlowerName('');
    setFlowerDescription('');
  };

  const setDefaultValidationStatus = () => {
    setValidationStatusFlowerName(validationStatusDefaultValue);
    setValidationStatusFlowerDescription(validationStatusDefaultValue);
  };

  const setDefaultState = () => {
    setDefaultValidationStatus();
    setDefaultValue();
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
            name: flowerName,
            description: flowerDescription,
            rrules: FakeRrules,
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
            rrules: FakeRrules,
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
      type: SHELF_FLOWER_GET,
      payload: { shelfId: id },
    });
    closeFunc(isNameChanged);
  };

  return (
    <SafeAreaView style={styles.flowerForm}>
      <ShelfFormHeader closeFunc={closeModalFunc} />
      <View style={styles.flowerForm__body}>
        <View style={styles.flowerForm__message}>
          <NotifyMessage />
        </View>
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
        <View style={styles.flowerForm__buttonWrap}>
          <View style={styles.flowerForm__button}>
            <CustomButton
              title="Submit"
              variant="primary"
              onPress={() => submitForm()}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};
