import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  ScrollView,
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

const renderShelves = (shelves: ShelfInterface[], navigation: any) => {
  let shelvesList = shelves.map(shelf => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate(SCREEN_USER_SHELF, { ...shelf })}
        style={styles.shelves__item}
        key={shelf.id}>
        <Shelf {...shelf} />
      </TouchableOpacity>
    );
  });

  return <ScrollView style={styles.shelves__list}>{shelvesList}</ScrollView>;
};

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

  return (
    <SafeAreaView style={styles.shelves}>
      <View style={styles.shelves__header}>
        <CustomButton
          title="Add shelf"
          onPress={() => {
            setIsShowShelfFormConfig(true);
          }}
        />
      </View>
      <View style={styles.shelves__body}>
        <View style={styles.shelves__listWrap}>
          {shelves && renderShelves(shelves, navigation)}
        </View>
      </View>
      {isShowShelfFormConfig && renderShelfSettings()}
    </SafeAreaView>
  );
};
