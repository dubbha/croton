import React, { FC } from 'react';
import { View, Text, ImageBackground } from 'react-native';

import styles from './styles';
import { FlowerInterface } from './interface';

const flowerDefaultImg = require('./../../assets/img/flower.png');

const limitateString = (text: string, letterLimit: number) => {
  if (text.length > letterLimit) {
    return `${text.slice(0, letterLimit)}...`;
  }
  return text;
};

export const Flower: FC<FlowerInterface> = props => {
  const { name = '', description = '', pictureUrls = [] } = props;
  let pictureSource;
  if (pictureUrls.length) {
    pictureSource = {
      uri: pictureUrls[0],
    };
  } else {
    pictureSource = flowerDefaultImg;
  }

  const limitLetterTitle = 40;
  const limitLetterDescription = 60;

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
          <Text style={styles.flower__title}>
            {limitateString(name, limitLetterTitle)}
          </Text>
          <Text style={styles.flower__description}>
            {limitateString(description, limitLetterDescription)}
          </Text>
        </View>
      </View>
    </View>
  );
};
