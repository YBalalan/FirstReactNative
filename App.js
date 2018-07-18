/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { createStackNavigator,DrawerNavigator } from 'react-navigation';
import HomePage from './pages/HomePage.js'
import MyApp from './pages/detail/CityWeather.js'
import LocationPage from './pages/detail/Location.js'
import Weather from './pages/detail/Weather.js'









import {
  Platform,
  StyleSheet,
  Text,
  View,
  ImageBackground,
} from 'react-native';





const RootStack = createStackNavigator(
   {

   LocationScreen:LocationPage,
    HomeScreen:HomePage,
    CityScreen:MyApp,
   },
   {

   },
  {
    initialRouteName: 'LocationScreen',
  }
);







export default class App extends React.Component {
  render() {
    return <RootStack />;
  }

}
