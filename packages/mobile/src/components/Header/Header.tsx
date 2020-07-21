import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Nav } from '../Nav';
import { Logo } from '../Logo';
import { Search } from '../Search';

export const Header = () => {
  return (
    <View style={styles.wrapper}>
      <Nav />
      <Logo />
      <Search />
    </View>
  )
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 10,
    borderStyle: "solid",
    borderColor: "#fff",
    borderRadius: 5,
  }
});
