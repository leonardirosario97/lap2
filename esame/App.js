import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation';

import MenuScreen from './components/MenuScreen.js';
import DetailScreen from './components/DetailScreen.js';
import CarelloScreen from './components/CarelloScreen.js';
import OrdinaScreen from './components/OrdinaScreen.js';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
});

const RootStack = createStackNavigator(
  {
    MenuScreen: { screen: MenuScreen },
    DetailScreen: { screen: DetailScreen },
    CarelloScreen: { screen: CarelloScreen },
    OrdinaScreen: { screen: OrdinaScreen },
  },
);

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <RootStack />
      </View>
    );
  }
}
