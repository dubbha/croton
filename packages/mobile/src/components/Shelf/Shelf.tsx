import React, { FC } from 'react';
import { View, Text, ImageBackground } from 'react-native';

import styles from './styles';
import { ShelfInterface } from './interface';

const shelfDefaultImg = require('./../../assets/img/shelf.png');

const limitateString = (text: string, letterLimit: number) => {
  if (text.length > letterLimit) {
    return `${text.slice(0, letterLimit)}...`;
  }
  return text;
};

export const Shelf: FC<ShelfInterface> = props => {
  const {
    name = '',
    location = '',
    description = '',
    pictureUrl = null,
  } = props;

  let pictureSource;
  if (pictureUrl) {
    pictureSource = {
      uri: pictureUrl,
    };
  } else {
    pictureSource = shelfDefaultImg;
  }

  const limitLetterTitle = 40;
  const limitLetterLocation = 40;
  const limitLetterDescription = 60;

  return (
    <View style={styles.shelf}>
      <View style={styles.shelf__body}>
        <View style={styles.shelf__leftPart}>
          <View style={styles.shelf__picture}>
            <ImageBackground style={styles.shelf__img} source={pictureSource} />
          </View>
        </View>
        <View style={styles.shelf__rightPart}>
          <Text style={styles.shelf__title}>
            {limitateString(name, limitLetterTitle)}
          </Text>
          <Text style={styles.shelf__location}>
            {limitateString(location, limitLetterLocation)}
          </Text>
          <Text style={styles.shelf__description}>
            {limitateString(description, limitLetterDescription)}
          </Text>
        </View>
      </View>
    </View>
  );
};
