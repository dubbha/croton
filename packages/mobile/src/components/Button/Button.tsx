import React, { Component } from 'react';
import {
  AppRegistry,
  View,
  TouchableOpacity,
  Image,
  Text, 
  StyleSheet
} from 'react-native';

import { THEME, COMPONENTS_STYLE } from '../../styles';
import { ICONS } from '../../assets/icons';

type MyProps = {
  title: string;
  icon? : string;
  isOutline?: boolean;
  action?: any;
  style?: object,
};

export class CustomButton extends Component<MyProps> {
  title: string;
  icon: string;
  isOutline: boolean;
  action: any;
  constructor(props: any) {
    super(props);
    this.title = props.title;
    this.icon = props.icon;
    this.isOutline = props.isOutline;
    this.action = props.action;
    
  };

  render() {
    const icon = this.icon && ICONS[this.icon];

    return(
      <View style = {styles.button}>
        <TouchableOpacity onPress = {this.action ? this.action : () => alert('Button')}>
          <View style={[styles.button__body, this.isOutline && styles.button__body__outline]}>
            {icon && <Image style={styles.button__icon} source={icon}/> }
            <Text style = {[styles.button__text, this.isOutline && styles.button__text__outline]}>{this.title}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    flex: 1,
    maxHeight: COMPONENTS_STYLE.buttonHeight,
  },
  
  button__body: {
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: 'center',
    height: COMPONENTS_STYLE.buttonHeight,
    borderRadius: 5,
    backgroundColor: THEME.mainLight,
    color: THEME.green,
  },

  button__body__outline: {
    borderColor: THEME.green,
    borderWidth: 2,
    backgroundColor: THEME.mainLight,
  },

  button__text: {
    textTransform: 'uppercase',
    textAlign: 'center',
    color: THEME.green,
    fontSize: 12,
    fontWeight: '500',
  },

  button__text__outline: {
    color: THEME.green,
  },

  button__icon: {
    width: 17.5,
    height: 17.5,
    marginRight: 10,
  },
});

AppRegistry.registerComponent('CustomButton', () => CustomButton);