import React, { FC } from 'react';
import { SafeAreaView, View, Text } from 'react-native';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

import styles from './styles';
import { SCREEN_USER_SHELF } from '../../pages/screens';
import {
  SHELF_FLOWER_DELETE,
  SHELF_FLOWERS_GET,
} from '../../store/shelves/actions';
import { ShelfFormHeader } from './FlowerFormHeader';
import { NotifyMessage } from '../NotifyMessage';
import { CustomButton } from '../Button';

interface ShelfFormConfigProps {
  closeFunc: (name?: string) => void;
  flowerId: string;
  shelfId: string;
}

export const FlowerFormDelete: FC<ShelfFormConfigProps> = ({
  flowerId,
  shelfId,
  closeFunc,
}) => {
  // const { id, shelfId } = shelf;
  const dispatch = useDispatch();
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.flowerForm}>
      <View style={styles.flowerForm__header}>
        <ShelfFormHeader closeFunc={closeFunc} />
      </View>
      <View style={styles.flowerForm__body}>
        <View style={styles.flowerForm__message}>
          <NotifyMessage />
        </View>
        <View>
          <Text>Are you sure?</Text>
        </View>
        <View style={styles.flowerForm__button}>
          <CustomButton
            title="Confirm"
            variant="primary"
            onPress={() => {
              dispatch({
                type: SHELF_FLOWER_DELETE,
                payload: { flowerId, shelfId },
              });
              navigation.navigate(SCREEN_USER_SHELF);
              dispatch({ type: SHELF_FLOWERS_GET, payload: { shelfId } });
              closeFunc();
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};
