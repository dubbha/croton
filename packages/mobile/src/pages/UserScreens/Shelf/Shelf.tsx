import React, { FC, useState, useEffect } from 'react';
import { View, SafeAreaView, Text, Modal, FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import styles from './styles';
import { SCREEN_USER_FLOWER } from '../../screens';
import { ShelfInterface } from '../../../components/Shelf/interface';
import {
  ShelfFormConfig,
  ShelfFormDelete,
  ShelfFormUserInvite,
} from '../../../components/ShelfForms';
import { FlowerFormConfig } from '../../../components/FlowerForms';
import { CustomButton } from '../../../components/Button';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SHELF_FLOWERS_GET, SHELVES_GET } from '../../../store/shelves/actions';
import { Flower } from '../../../components/Flower';
import { Accordion } from '../../../components/Accordion';

export const Shelf: FC<ShelfInterface> = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const { params } = route;
  const { id: shelfId, description, location } = params;
  const [isShowFormConfig, setIsShowFormConfig] = useState(false);
  const [isShowFormRemove, setIsShowFormRemove] = useState(false);
  const [isShowFormInvite, setIsShowFormInvite] = useState(false);
  const [isShowFormFlower, setIsShowFormFlower] = useState(false);

  const flowers: ShelfInterface[] = useSelector(state => {
    return state.shelves.flowers;
  });

  useEffect(() => {
    dispatch({
      type: SHELF_FLOWERS_GET,
      payload: { shelfId },
    });
  }, [dispatch, shelfId]);

  const renderSettings = () => (
    <Modal animationType="fade" transparent={true}>
      <View style={styles.shelf__modal}>
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
      <View style={styles.shelf__modal}>
        <ShelfFormDelete
          shelf={params}
          closeFunc={() => {
            dispatch({ type: SHELVES_GET });
            setIsShowFormRemove(false);
          }}
        />
      </View>
    </Modal>
  );

  const renderInvite = () => (
    <Modal animationType="fade" transparent={true}>
      <View style={styles.shelf__modal}>
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
      <View style={styles.shelf__modal}>
        <FlowerFormConfig
          shelfId={shelfId}
          closeFunc={() => {
            dispatch({
              type: SHELF_FLOWERS_GET,
              payload: { shelfId },
            });
            setIsShowFormFlower(false);
          }}
        />
      </View>
    </Modal>
  );

  const renderFlower = ({ item: flower, index }: any) => {
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate(SCREEN_USER_FLOWER, { shelfId, ...flower })
        }
        style={[
          styles.shelf__item,
          index === 0 ? styles.shelf__item__first : undefined,
        ]}>
        <Flower {...flower} />
      </TouchableOpacity>
    );
  };

  const renderFlowers = () => {
    if (flowers && flowers.length) {
      return (
        <FlatList
          ListHeaderComponent={
            <View style={styles.shelf__info}>
              <View style={styles.shelf__info__item}>
                <Accordion title="Location information">
                  <Text>{location}</Text>
                </Accordion>
              </View>
              <View style={styles.shelf__info__item}>
                <Accordion title="Description information">
                  <Text>{description}</Text>
                </Accordion>
              </View>
            </View>
          }
          data={flowers}
          renderItem={renderFlower}
          keyExtractor={item => item.id.toString()}
        />
      );
    } else {
      return <Text>Shelf is empty</Text>;
    }
  };

  return (
    <SafeAreaView style={styles.shelf}>
      <View style={styles.shelf__body}>{flowers && renderFlowers()}</View>
      <View style={styles.shelf__footer}>
        <View style={styles.shelf__footer__content}>
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
          <View style={styles.shelf__addButton}>
            <CustomButton
              title="Add flower"
              onPress={() => setIsShowFormFlower(true)}
            />
          </View>
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
