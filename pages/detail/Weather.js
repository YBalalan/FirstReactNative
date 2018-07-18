/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { createStackNavigator } from 'react-navigation';
import Geocoder from 'react-native-geocoding';
import { Dimensions,View,ImageBackground,StyleSheet,ActivityIndicator,FlatList,Text,Image,TextInput,Button,TouchableOpacity } from 'react-native';
const ITEM_WIDTH = Dimensions.get('window').width

export default class Weather extends React.Component {
   

  render() {
   return (
     <View>
       </View>

   ) 
      }
}



const styles = StyleSheet.create({
   container:{
     flex:1,
     flexDirection:'column',
     justifyContent:'center',
     alignItems:'center',
     backgroundColor:'#FFBF00',
},


})