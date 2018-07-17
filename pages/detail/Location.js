/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { createStackNavigator } from 'react-navigation';
import { View,ImageBackground,StyleSheet,ActivityIndicator,FlatList,Text,Image,TextInput,Button,TouchableOpacity } from 'react-native';
import HomePage from '../HomePage.js'
import { PermissionsAndroid } from 'react-native';

export default class LocationPage extends React.Component {
  //it is used for hide weather from page
  static navigationOptions = { title: 'Welcome', header: null };


  constructor (props){
   super(props);
   this.state = {
   isLoading:true,
   latitude: null,
   longitude:null,
   
    }
  }
  
async componentDidMount(){
  const granted = await PermissionsAndroid.check( PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)

       if (granted) {
     
      navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log("wokeeey");
       
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null,
          isLoading:false,
        });
        this.props.navigation.navigate('HomeScreen', {
          lat: this.state.latitude,
          lon:this.state.longitude,
       
        });
       
      },
      
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: false, timeout: 200000, maximumAge: 1000 },
    );
  

  }else{
 

  }

     
    
  }

 render() {
  
 if(this.state.isLoading){
    return(
      <View style={{flex: 1, padding: 20}}>
        <ActivityIndicator/>
      </View>
    )
  }
   return(
     
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
  },
})