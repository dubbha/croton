import React, { useState } from 'react';
import {
  View,
  Text,
  LayoutAnimation,
  UIManager,
  Platform,
  TouchableOpacity,
} from 'react-native';

import styles from './styles';

export const Accordion = (props: { title: any; children: any }) => {
  const { title, children } = props;
  const [expanded, setExpanded] = useState(false);
  if (
    Platform.OS === 'android' &&
    UIManager.setLayoutAnimationEnabledExperimental
  ) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
  const renderDetails = () => {
    return <View style={styles.accordion__body}>{children}</View>;
  };

  return (
    <View style={styles.accordion}>
      <TouchableOpacity
        style={[
          styles.accordion__header,
          expanded ? styles.accordion__header__expand : undefined,
        ]}
        onPress={() => {
          LayoutAnimation.configureNext(
            LayoutAnimation.create(100, 'linear', 'opacity'),
          );
          setExpanded(!expanded);
        }}>
        <Text style={styles.accordion__title}>{title}</Text>
      </TouchableOpacity>
      {expanded && renderDetails()}
    </View>
  );
};
