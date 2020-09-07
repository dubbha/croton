import React, { FC, useState, useEffect } from 'react';
import { View, SafeAreaView, Text, Modal } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import styles from './styles';
import { SCREEN_USER_FLOWER } from '../../screens';
import { ShelfInterface } from '../../../components/Shelf/interface';
import { FlowerInterface } from '../../../components/Flower/interface';
import {
  ShelfFormConfig,
  ShelfFormDelete,
  ShelfFormUserInvite,
} from '../../../components/ShelfForms';
import { FlowerFormConfig } from '../../../components/FlowerForms';
import { CustomButton } from '../../../components/Button';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { SHELF_FLOWERS_GET } from '../../../store/shelves/actions';
import { Flower } from '../../../components/Flower';

export const Shelf: FC<ShelfInterface> = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const { params } = route;
  const { id: shelfId } = params;
  const [isShowFormConfig, setIsShowFormConfig] = useState(false);
  const [isShowFormRemove, setIsShowFormRemove] = useState(false);
  const [isShowFormInvite, setIsShowFormInvite] = useState(false);
  const [isShowFormFlower, setIsShowFormFlower] = useState(false);

  const shelfItems: ShelfInterface[] = useSelector(state => {
    return state.shelves.flowers;
  });

  const renderFlowers = (flowers: FlowerInterface[], nav: any) => {
    let flowersList;
    if (!flowers.length) {
      flowersList = <Text>Shelves are empty</Text>;
    } else {
      // TODO: Why we shouldn't send shelfId in every flower (we have it in db);
      flowersList = flowers.map(flower => {
        return (
          <TouchableOpacity
            onPress={() =>
              nav.navigate(SCREEN_USER_FLOWER, { shelfId, ...flower })
            }
            style={styles.shelf__item}
            key={flower.id}>
            <Flower {...flower} />
          </TouchableOpacity>
        );
      });
    }
    return <ScrollView style={styles.shelf__list}>{flowersList}</ScrollView>;
  };

  const renderSettings = () => (
    <Modal animationType="fade" transparent={true}>
      <View style={styles.shelves__modal}>
        <ShelfFormConfig
          shelf={params}
          closeFunc={(name?: string) => {
            // TODO: need to implement this if store is changed (now always set new title)
            setIsShowFormConfig(false);
            if (name) {
              navigation.setOptions({ title: name });
            }
          }}
        />
      </View>
    </Modal>
  );

  const renderRemover = () => (
    <Modal animationType="fade" transparent={true}>
      <View style={styles.shelves__modal}>
        <ShelfFormDelete
          shelf={params}
          closeFunc={() => {
            setIsShowFormRemove(false);
          }}
        />
      </View>
    </Modal>
  );

  const renderInvite = () => (
    <Modal animationType="fade" transparent={true}>
      <View style={styles.shelves__modal}>
        <ShelfFormUserInvite
          shelf={params}
          closeFunc={() => {
            setIsShowFormInvite(false);
          }}
        />
      </View>
    </Modal>
  );

  const renderFormFlower = () => (
    <Modal animationType="fade" transparent={true}>
      <View style={styles.shelves__modal}>
        <FlowerFormConfig
          shelfId={shelfId}
          closeFunc={() => {
            setIsShowFormFlower(false);
          }}
        />
      </View>
    </Modal>
  );

  useEffect(() => {
    dispatch({
      type: SHELF_FLOWERS_GET,
      payload: { shelfId },
    });
  }, [dispatch, shelfId]);

  return (
    <SafeAreaView style={styles.shelf}>
      <View style={styles.shelf__header}>
        <View style={styles.shelf__buttons}>
          <View style={styles.shelf__button}>
            <CustomButton
              title="Edit Shelf"
              onPress={() => setIsShowFormConfig(true)}
            />
          </View>
          <View style={styles.shelf__button}>
            <CustomButton
              title="Delete Shelf"
              onPress={() => setIsShowFormRemove(true)}
            />
          </View>
          <View style={styles.shelf__button}>
            <CustomButton
              title="Invite User"
              onPress={() => setIsShowFormInvite(true)}
            />
          </View>
        </View>
      </View>
      <View style={styles.shelf__body}>
        <CustomButton
          title="Add flower"
          onPress={() => setIsShowFormFlower(true)}
        />
        <View style={styles.shelf__flowerWrap}>
          {shelfItems && renderFlowers(shelfItems, navigation)}
        </View>
      </View>
      {/* TODO: It make sense remove duplication there */}
      {isShowFormConfig && renderSettings()}
      {isShowFormRemove && renderRemover()}
      {isShowFormInvite && renderInvite()}
      {isShowFormFlower && renderFormFlower()}
    </SafeAreaView>
  );
};
