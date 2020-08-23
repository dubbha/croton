import React, { FC } from 'react';
import { SafeAreaView, View, Text } from 'react-native';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

import styles from './styles';
import { SCREEN_USER_SHELF } from '../../pages/screens';
import {
  SHELF_FLOWER_DELETE,
  SHELF_FLOWER_GET,
} from '../../store/shelves/actions';
import { ShelfInterface } from '../Shelf/interface';
import { ShelfFormHeader } from './FlowerFormHeader';
import { NotifyMessage } from '../NotifyMessage';
import { CustomButton } from '../Button';

interface ShelfFormConfigProps {
  closeFunc: (name?: string) => void;
  shelf?: ShelfInterface;
}

export const FlowerFormDelete: FC<ShelfFormConfigProps> = ({
  shelf = {},
  closeFunc,
}) => {
  const { id, shelfId } = shelf;
  const dispatch = useDispatch();
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.flowerForm}>
      <ShelfFormHeader closeFunc={closeFunc} />
      <View style={styles.flowerForm__body}>
        <View style={styles.flowerForm__message}>
          <NotifyMessage />
        </View>
        <View>
          <Text>Are you sure?</Text>
        </View>
        <View style={styles.flowerForm__buttonWrap}>
          <View style={styles.flowerForm__button}>
            <CustomButton
              title="Confirm"
              variant="primary"
              onPress={() => {
                dispatch({
                  type: SHELF_FLOWER_DELETE,
                  payload: { id, shelfId },
                });
                navigation.navigate(SCREEN_USER_SHELF);
                dispatch({ type: SHELF_FLOWER_GET, payload: { shelfId } });
                closeFunc();
              }}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};
