import React, { FC } from 'react';
import { View, Text, ImageBackground } from 'react-native';

import styles from './styles';
import { ShelfInterface } from './interface';

export const Shelf: FC<ShelfInterface> = props => {
  const {
    name = null,
    location = null,
    description = null,
    pictureUrl = null,
  } = props;

  const pictureSource = {
    uri: pictureUrl || 'https://reactnative.dev/img/tiny_logo.png',
  };

  return (
    <View style={styles.shelf}>
      <View style={styles.shelf__body}>
        <View style={styles.shelf__leftPart}>
          <View style={styles.shelf__picture}>
            <ImageBackground style={styles.shelf__img} source={pictureSource} />
          </View>
        </View>
        <View style={styles.shelf__rightPart}>
          <Text style={styles.shelf__title}>{name}</Text>
          <Text style={styles.shelf__location}>{location}</Text>
          <Text style={styles.shelf__description}>{description}</Text>
        </View>
      </View>
    </View>
  );
};
