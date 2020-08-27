import React, { FC, useState } from 'react';
import { SafeAreaView, View, Text, Modal } from 'react-native';

import styles from './styles';
import { FlowerInterface } from '../../../components/Flower/interface';
import { CustomButton } from '../../../components/Button';
import {
  FlowerFormConfig,
  FlowerFormDelete,
} from '../../../components/FlowerForms';

export const Flower: FC<FlowerInterface> = ({ route, navigation }) => {
  const { params } = route;
  console.dir(params);
  const [isShowFormConfig, setIsShowFormConfig] = useState(false);
  const [isShowFormRemove, setIsShowFormRemove] = useState(false);

  const renderSettings = () => (
    <Modal animationType="fade" transparent={true}>
      <View style={styles.flower__modal}>
        <FlowerFormConfig
          flower={params}
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
      <View style={styles.flower__modal}>
        <FlowerFormDelete
          shelf={params}
          closeFunc={() => {
            setIsShowFormRemove(false);
          }}
        />
      </View>
    </Modal>
  );

  return (
    <SafeAreaView style={styles.flower}>
      <View style={styles.flower__header}>
        <View style={styles.flower__buttons}>
          <View style={styles.flower__button}>
            <CustomButton
              title="Edit Flower"
              onPress={() => setIsShowFormConfig(true)}
            />
          </View>
          <View style={styles.flower__button}>
            <CustomButton
              title="Delete Flower"
              onPress={() => setIsShowFormRemove(true)}
            />
          </View>
        </View>
      </View>
      <View style={styles.flower__body}>
        <Text>Action 1 -- Done</Text>
        <Text>Action 2 -- Done</Text>
        <Text>Action 3 -- Done</Text>
      </View>
      {isShowFormConfig && renderSettings()}
      {isShowFormRemove && renderRemover()}
    </SafeAreaView>
  );
};
