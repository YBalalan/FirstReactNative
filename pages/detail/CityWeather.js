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

export default class CityWeather extends React.Component {
   
  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;

    return {
      title: params.headerPage
    
    };
  }

 X


  //it is used for hide weather from page
  constructor (props){
    super(props);
    this.state = {
      list:[],
      isLoading:false,
      imageSource:'',
      imageString:'',
      cityName:'',
     
      }
   

   
    
  }

  componentDidMount(){
    //fetch(`https://api.parse.com/1/users?foo=${encodeURIComponent(data.foo)}&bar=${encodeURIComponent(data.bar)}`
    
    const { navigation } = this.props;
    const city = navigation.getParam('cityOfWeather');

    //For describing header from outside the navigation option
    this.props.navigation.setParams({ headerPage: city });
    
  
    return fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(city)},tr&appid=557b6fb541506e90034bf7116dc26b0e`)
    .then((response) => response.json())
      .then((responseJson) => {

        this.setState({
          isLoading: false,
          list: responseJson.list,
          cityName:city,
        }, function(){

        });

      })
       
     
      .catch((error) =>{
        console.error(error);
      });
     
}
  render() {
    if(this.state.isLoading){
        return (
          <ImageBackground source={require('../Images/rain.jpg')} style={styles.container}>
            <ActivityIndicator size="large" style={styles.activityIndicatorStyle} />
            
          </ImageBackground>
        );}else{
          return(
            <View style={styles.container}>
            <FlatList
              data={this.state.list} 
              numColumns={2}
              renderItem={({item}) => 
             
            
            <View style={styles.tempView}>
               <Text>{item.dt_txt}</Text>
               <Text>{parseInt(item.main.temp-272.35,10)}</Text>
              
                { item.weather[0].main === "Clouds" && <Image source={require('../Images/cloudy.png')}/> }
                { item.weather[0].main === "Rain" && <Image source={require('../Images/umbrella.png')}/> }
                { item.weather[0].main === "Clear" && <Image source={require('../Images/sun.png')}/> }
               
            </View> 
      
                }
               keyExtractor={(item, index) => index}
            />
          </View>
          )
        }
      }
}



const styles = StyleSheet.create({
   container:{
     flex:1,
     flexDirection:'column',
     justifyContent:'center',
     alignItems:'center',
    
  },

   rowContainer:{
    height:60,
    width:'100%',
    marginRight:10,
    marginLeft:10,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    backgroundColor:'#ccc'
},

tempView:{
     height:200,
     width:160,
     flexDirection:'column',
     justifyContent:'center',
     alignItems:'center',
     backgroundColor:'#fff',
     borderRadius:10,
     flexWrap: 'wrap',
     margin:5,
  },

 activityIndicatorStyle:{
    color:"#6E6E6E"
  },

  textStyle:{
    color:'#0080FF',
    marginRight:20,
    
  },

textInputStyle:{
borderColor: '#7a42f4',
width:100,

}  

})