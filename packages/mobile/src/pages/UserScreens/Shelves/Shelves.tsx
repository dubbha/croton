import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Modal,
  TouchableOpacity,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import styles from './styles';
import { SCREEN_USER_SHELF } from '../../screens';
import { SHELVES_GET } from '../../../store/shelves/actions';
import { ShelfInterface } from '../../../components/Shelf/interface';
import { Shelf } from '../../../components/Shelf';
import { ShelfFormConfig } from '../../../components/ShelfForms';
import { CustomButton } from '../../../components/Button';
import { FlatList } from 'react-native-gesture-handler';

export const Shelves = ({ navigation }: any) => {
  const [isShowShelfFormConfig, setIsShowShelfFormConfig] = useState(false);
  const dispatch = useDispatch();
  const shelves: ShelfInterface[] = useSelector(state => {
    // TODO: main property shelves should rename, maybe in 'products'
    return state.shelves.shelves;
  });

  useEffect(() => {
    dispatch({ type: SHELVES_GET });
  }, [dispatch]);

  const renderShelfSettings = () => (
    <Modal animationType="fade" transparent={true}>
      <View style={styles.shelves__modal__body}>
        <ShelfFormConfig
          closeFunc={() => {
            dispatch({ type: SHELVES_GET });
            setIsShowShelfFormConfig(false);
          }}
        />
      </View>
    </Modal>
  );

  const renderShelf = ({ item: shelf, index }: any) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate(SCREEN_USER_SHELF, { ...shelf })}
        style={[
          styles.shelves__item,
          index === 0 ? styles.shelves__item__first : undefined,
        ]}>
        <Shelf {...shelf} />
      </TouchableOpacity>
    );
  };

  const renderShelves = () => {
    if (!shelves || !shelves.length) {
      return (
        <View>
          <Text>Shelves are empty</Text>
        </View>
      );
    } else {
      return (
        <FlatList
          data={shelves}
          keyExtractor={item => item.id.toString()}
          renderItem={renderShelf}
        />
      );
    }
  };

  return (
    <SafeAreaView style={styles.shelves}>
      <View style={styles.shelves__content}>
        <View style={styles.shelves__body}>
          <View style={styles.shelves__listWrap}>
            {shelves && renderShelves()}
          </View>
        </View>
        <View style={styles.shelves__footer}>
          <CustomButton
            title="Add shelf"
            onPress={() => {
              setIsShowShelfFormConfig(true);
            }}
          />
        </View>
        {isShowShelfFormConfig && renderShelfSettings()}
      </View>
    </SafeAreaView>
  );
};
