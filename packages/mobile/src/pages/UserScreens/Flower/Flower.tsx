import React, { FC, useState, useEffect } from 'react';
import { SafeAreaView, FlatList, View, Text, Modal } from 'react-native';
import { useDispatch } from 'react-redux';
import { rrulestr } from 'rrule';

import styles from './styles';
import { SHELF_ACTION } from '../../../store/shelves/actions';
import { FlowerInterface } from '../../../components/Flower/interface';
import { httpSender } from '../../../services/http/http.service';
import { CustomButton } from '../../../components/Button';
import {
  FlowerFormConfig,
  FlowerFormDelete,
} from '../../../components/FlowerForms';
import { NotifyMessage } from '../../../components/NotifyMessage';

export const Flower: FC<FlowerInterface> = ({ route, navigation }) => {
  // TODO: This logic will be broken if we should some more cofing, need change fetch to dispatch
  const dispatch = useDispatch();
  const { params } = route;
  let { rrules } = params;
  const [isShowFormConfig, setIsShowFormConfig] = useState(false);
  const [isShowFormRemove, setIsShowFormRemove] = useState(false);
  const [lastActions, setLastActions] = useState({});
  const [markedActions, setMarkedActions] = useState([]);
  // TODO: we should to change this with success dispatch result
  const { shelfId, id: flowerId } = params;
  const getActionKeys = (obj: any) => {
    const keys = [];
    const actionsTypes = ['watering', 'fertilizing', 'hydration'];
    actionsTypes.forEach(type => {
      if (obj[type]) {
        keys.push(type);
      }
    });
    return keys;
  };

  useEffect(() => {
    const fetchLastActions = async () => {
      try {
        const currentLastActions = await httpSender.send({
          router: '/api/shelf/get-last-actions',
          body: { shelfId, flowerId },
        });
        setLastActions(currentLastActions);
        const lastActionKeys = getActionKeys(currentLastActions);
        setMarkedActions(lastActionKeys);
      } catch (e) {
        console.error(e);
      }
    };
    fetchLastActions();
  }, [shelfId, flowerId]);

  const markActionPerformed = async (action: any) => {
    try {
      dispatch({
        type: SHELF_ACTION,
        payload: { action, flowerId, shelfId },
      });
      setMarkedActions([...markedActions, action]);
    } catch (e) {
      console.error(e);
    }
  };

  const renderSettings = () => {
    return (
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
  };

  const renderRemover = () => {
    return (
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
  };

  const getActions = (obj: any) => {
    const result = Object.entries(obj);
    return result || [];
  };

  const getLastActionTime = (type: string) => {
    if (!lastActions || !lastActions[type]) {
      return false;
    }
    const lastActionWithType = lastActions[type];
    return lastActionWithType.timestamp || false;
  };

  const getLastAction = (type: string, rrule: string): boolean => {
    const lastActionTimestamp = getLastActionTime(type);
    const currentDate = new Date(Date.now());
    let result;

    if (lastActionTimestamp) {
      result = rrulestr(rrule).between(
        new Date(lastActionTimestamp * 1000),
        currentDate,
      ).length;
    } else {
      result = rrulestr(rrule).before(new Date(Date.now()));
    }

    return Boolean(result);
  };

  const renderAction = (rrule: any) => {
    const { item, index } = rrule;
    const actionName = item[0];
    const actionBody = item[1];
    const actionDescription = actionBody ? rrulestr(actionBody).toText() : null;
    let isActionMissed;
    if (!actionDescription) {
      isActionMissed = false;
    } else {
      isActionMissed = getLastAction(actionName, actionBody);
    }
    // TODO: this is shame temp resolution, use it before implement dispatch
    const isActionMarked = markedActions.indexOf(actionName) > -1;
    const isActionMade = !isActionMissed || isActionMarked;

    return (
      <View
        style={[
          styles.flower__action,
          index === 0 ? styles.flower__action__first : undefined,
        ]}>
        <View style={styles.flower__action__header}>
          <View style={styles.flower__action__status}>
            <View
              style={[
                styles.flower__action__icon,
                isActionMade
                  ? styles.flower__action__icon__success
                  : isActionMissed && styles.flower__action__icon__failed,
              ]}
            />
          </View>
          <Text style={styles.flower__action__name}>{actionName}</Text>
        </View>
        <View style={styles.flower__action__body}>
          <View style={styles.flower__action__description}>
            <Text>{actionDescription}</Text>
          </View>
        </View>
        <View style={styles.flower__action__footer}>
          <View style={styles.flower__action__button}>
            <CustomButton
              title="Mark performed"
              variant={isActionMarked ? 'primary__solid' : 'primary'}
              onPress={() => markActionPerformed(actionName)}
            />
          </View>
        </View>
      </View>
    );
  };

  rrules = getActions(rrules);

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
        <View style={styles.flower__message}>
          <NotifyMessage />
        </View>
        <FlatList
          data={rrules}
          renderItem={renderAction}
          keyExtractor={rrule => rrule}
          style={styles.flower__actions}
        />
      </View>
      {isShowFormConfig && renderSettings()}
      {isShowFormRemove && renderRemover()}
    </SafeAreaView>
  );
};
