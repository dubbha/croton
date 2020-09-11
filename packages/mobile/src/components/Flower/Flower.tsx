import React, { FC } from 'react';
import { View, Text, ImageBackground } from 'react-native';

import styles from './styles';
import { FlowerInterface } from './interface';

export const Flower: FC<FlowerInterface> = props => {
  const { name = null, description = null, pictureUrls = [] } = props;

  const mainPicture = pictureUrls[0];
  const pictureSource = {
    uri: mainPicture || 'https://reactnative.dev/img/tiny_logo.png',
  };

  return (
    <View style={styles.flower}>
      <View style={styles.flower__body}>
        <View style={styles.flower__leftPart}>
          <View style={styles.flower__picture}>
            <ImageBackground
              style={styles.flower__img}
              source={pictureSource}
            />
          </View>
        </View>
        <View style={styles.flower__rightPart}>
          <Text>{name}</Text>
          <Text style={styles.flower__description}>{description}</Text>
        </View>
      </View>
    </View>
  );
};
