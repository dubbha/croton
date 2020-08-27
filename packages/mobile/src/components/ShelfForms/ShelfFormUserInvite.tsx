import React, { FC, useState } from 'react';
import { SafeAreaView, View } from 'react-native';
import { useDispatch } from 'react-redux';

import styles from './styles';
import { ShelfInterface } from '../Shelf/interface';
import { ValidationResult } from '../Input/interfaces';
import { inputValidatorFunctionalComponent } from '../Input/helpers';
import { ShelfFormHeader } from './ShelfFormHeader';
import { NotifyMessage } from '../NotifyMessage';
import { CustomButton } from '../Button';
import { CustomInput } from '../Input';
import { SHELVES_SHELF_INVITE } from '../../store/shelves/actions';

interface ShelfFormConfigProps {
  closeFunc: (name?: string) => void;
  shelf?: ShelfInterface;
}

export const ShelfFormUserInvite: FC<ShelfFormConfigProps> = ({
  closeFunc,
  shelf,
}) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState<string>('');
  const [validationStatusEmail, setValidationStatusEmail] = useState<
    ValidationResult
  >({
    status: null,
    isShowMessage: false,
  });

  const submitForm = () => {
    const validationStatus = inputValidatorFunctionalComponent(
      email,
      'email',
      setValidationStatusEmail,
      true,
    );

    if (validationStatus) {
      dispatch({
        type: SHELVES_SHELF_INVITE,
        payload: {
          userEmail: email,
          shelfId: shelf.id,
        },
      });
    }
  };

  return (
    <SafeAreaView style={styles.shelfForm}>
      <ShelfFormHeader closeFunc={closeFunc} />
      <View style={styles.shelfForm__body}>
        <View style={styles.shelfForm__message}>
          <NotifyMessage />
        </View>
        <View
          style={[styles.shelfForm__inputWrap, styles.shelfForm__inputWrap__1]}>
          <CustomInput
            inputType="email"
            validationStatus={validationStatusEmail}
            onChangeText={(data: string) => {
              setEmail(data);
            }}
            onBlur={() => {
              inputValidatorFunctionalComponent(
                email,
                'email',
                setValidationStatusEmail,
              );
            }}
          />
        </View>
        <View style={styles.shelfForm__buttonWrap}>
          <View style={styles.shelfForm__button}>
            <CustomButton
              title="Invite"
              variant="primary"
              onPress={() => {
                submitForm();
              }}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};
