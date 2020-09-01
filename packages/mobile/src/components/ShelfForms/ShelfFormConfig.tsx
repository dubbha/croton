import React, { FC, useState } from 'react';
import { SafeAreaView, View } from 'react-native';
import { useDispatch } from 'react-redux';

import styles from './styles';
import {
  SHELVES_GET,
  SHELVES_SHELF_ADD,
  SHELVES_SHELF_EDIT,
} from '../../store/shelves/actions';
import { ValidationResult } from '../Input/interfaces';
import { ShelfInterface } from '../Shelf/interface';
import {
  inputValidatorFunctionalComponent,
  hideMessageFunctionalComponent,
} from '../Input/helpers';
import { ShelfFormHeader } from './ShelfFormHeader';
import { CustomInput } from '../Input';
import { CustomButton } from '../Button';
import { NotifyMessage } from '../NotifyMessage';

interface ShelfFormConfigProps {
  closeFunc: (name?: string) => void;
  shelf?: ShelfInterface;
}

export const ShelfFormConfig: FC<ShelfFormConfigProps> = ({
  shelf = {},
  closeFunc,
}) => {
  const dispatch = useDispatch();
  const validationStatusDefaultValue = {
    status: null,
    isShowMessage: false,
  };
  const [isEdit] = useState(Boolean(shelf.name));
  const [isNameChanged, setIsNameChanged] = useState('');
  const [shelfName, setShelfName] = useState(shelf.name || '');
  const [shelfLocation, setShelfLocation] = useState(shelf.location || '');
  const [shelfDescription, setShelfDescription] = useState(
    shelf.description || '',
  );
  const [validationStatusShelfName, setValidationStatusShelfName] = useState<
    ValidationResult
  >(validationStatusDefaultValue);
  const [
    validationStatusShelfLocation,
    setValidationStatusShelfLocation,
  ] = useState<ValidationResult>(validationStatusDefaultValue);
  const [
    validationStatusShelfDescription,
    setValidationStatusShelfDescription,
  ] = useState<ValidationResult>(validationStatusDefaultValue);

  const setDefaultValue = () => {
    setShelfName('');
    setShelfLocation('');
    setShelfDescription('');
  };

  const setDefaultValidationStatus = () => {
    setValidationStatusShelfName(validationStatusDefaultValue);
    setValidationStatusShelfLocation(validationStatusDefaultValue);
    setValidationStatusShelfDescription(validationStatusDefaultValue);
  };

  const setDefaultState = () => {
    setDefaultValidationStatus();
    setDefaultValue();
  };

  const submitForm = () => {
    const { status: isValidShelfName } = inputValidatorFunctionalComponent(
      shelfName,
      'shelfName',
      setValidationStatusShelfName,
      true,
    );
    const { status: isValidShelfLocation } = inputValidatorFunctionalComponent(
      shelfLocation,
      'shelfLocation',
      setValidationStatusShelfLocation,
      true,
    );
    const {
      status: isValidShelfDescription,
    } = inputValidatorFunctionalComponent(
      shelfLocation,
      'shelfLocation',
      setValidationStatusShelfDescription,
      true,
    );
    const isValidAllFields =
      isValidShelfName && isValidShelfLocation && isValidShelfDescription;

    if (isValidAllFields) {
      if (isEdit) {
        dispatch({
          type: SHELVES_SHELF_EDIT,
          payload: {
            id: shelf.id,
            name: shelfName,
            location: shelfLocation,
            description: shelfDescription,
          },
        });
        setDefaultValidationStatus();
        setIsNameChanged(shelfName);
      } else {
        dispatch({
          type: SHELVES_SHELF_ADD,
          payload: {
            name: shelfName,
            location: shelfLocation,
            description: shelfDescription,
          },
        });
        setDefaultState();
      }
    } else {
      setTimeout(() => {
        hideMessageFunctionalComponent(
          {
            status: isValidShelfName,
            isShowMessage: false,
          },
          setValidationStatusShelfName,
        );
        hideMessageFunctionalComponent(
          {
            status: isValidShelfLocation,
            isShowMessage: false,
          },
          setValidationStatusShelfLocation,
        );
        hideMessageFunctionalComponent(
          {
            status: isValidShelfDescription,
            isShowMessage: false,
          },
          setValidationStatusShelfDescription,
        );
      }, 2000);
    }
  };

  const closeModalFunc = () => {
    dispatch({ type: SHELVES_GET });
    closeFunc(isNameChanged);
  };

  return (
    <SafeAreaView style={styles.shelfForm}>
      <ShelfFormHeader closeFunc={closeModalFunc} />
      <View style={styles.shelfForm__body}>
        <View style={styles.shelfForm__message}>
          <NotifyMessage />
        </View>
        <View
          style={[styles.shelfForm__inputWrap, styles.shelfForm__inputWrap__1]}>
          <CustomInput
            inputType="shelfName"
            value={shelfName}
            validationStatus={validationStatusShelfName}
            onChangeText={(data: string) => setShelfName(data)}
            onBlur={() =>
              inputValidatorFunctionalComponent(
                shelfName,
                'shelfName',
                setValidationStatusShelfName,
              )
            }
          />
        </View>
        <View
          style={[styles.shelfForm__inputWrap, styles.shelfForm__inputWrap__2]}>
          <CustomInput
            inputType="shelfLocation"
            value={shelfLocation}
            validationStatus={validationStatusShelfLocation}
            onChangeText={(data: string) => setShelfLocation(data)}
            onBlur={() =>
              inputValidatorFunctionalComponent(
                shelfLocation,
                'shelfLocation',
                setValidationStatusShelfLocation,
              )
            }
          />
        </View>
        <View
          style={[styles.shelfForm__inputWrap, styles.shelfForm__inputWrap__3]}>
          <CustomInput
            inputType="shelfDescription"
            value={shelfDescription}
            validationStatus={validationStatusShelfDescription}
            onChangeText={(data: string) => setShelfDescription(data)}
            onBlur={() =>
              inputValidatorFunctionalComponent(
                shelfDescription,
                'shelfDescription',
                setValidationStatusShelfDescription,
              )
            }
          />
        </View>
        <View style={styles.shelfForm__buttonWrap}>
          <View style={styles.shelfForm__button}>
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
