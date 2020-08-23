import React, { FC } from 'react';
import { SafeAreaView, View, Text } from 'react-native';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

import styles from './styles';
import { SCREEN_USER_SHELVES } from '../../pages/screens';
import { SHELVES_SHELF_DELETE, SHELVES_GET } from '../../store/shelves/actions';
import { ShelfInterface } from '../Shelf/interface';
import { ShelfFormHeader } from './ShelfFormHeader';
import { NotifyMessage } from '../NotifyMessage';
import { CustomButton } from '../Button';

interface ShelfFormConfigProps {
  closeFunc: (name?: string) => void;
  shelf?: ShelfInterface;
}

export const ShelfFormDelete: FC<ShelfFormConfigProps> = ({
  shelf = {},
  closeFunc,
}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.shelfForm}>
      <ShelfFormHeader closeFunc={closeFunc} />
      <View style={styles.shelfForm__body}>
        <View style={styles.shelfForm__message}>
          <NotifyMessage />
        </View>
        <View>
          <Text>Are you sure?</Text>
        </View>
        <View style={styles.shelfForm__buttonWrap}>
          <View style={styles.shelfForm__button}>
            <CustomButton
              title="Confirm"
              variant="primary"
              onPress={() => {
                dispatch({
                  type: SHELVES_SHELF_DELETE,
                  payload: {
                    id: shelf.id,
                  },
                });
                dispatch({ type: SHELVES_GET });
                navigation.navigate(SCREEN_USER_SHELVES);
                closeFunc();
              }}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};
