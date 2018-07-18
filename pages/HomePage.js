/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { createStackNavigator } from 'react-navigation';
import { View,ImageBackground,StyleSheet,ActivityIndicator,FlatList,Text,Image,TextInput,Button,TouchableOpacity } from 'react-native';


export default class HomePage extends React.Component {
  //it is used for hide weather from page
  static navigationOptions = { title: 'Welcome', header: null };
  
  


  constructor (props){
  
    super(props);
    let lat = 0;
    let lon =0;
    
    this.state = {
      list:[],
      isLoading:false,
      imageSource:'',
      imageString:'',
      city:0,
      error:null,
      latitude:null,
      longitude:null,
    }
  }


 componentWillMount(){
  const { navigation } = this.props;
  const latitude = navigation.getParam('lat');
  const longitude = navigation.getParam('lon');
  console.warn(latitude)
  console.warn(longitude)
  return fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=0&lon=0&appid=557b6fb541506e90034bf7116dc26b0e`)
   .then((response) => response.json())
      .then((responseJson) => {

        this.setState({
          isLoading: false,
          list: responseJson.list,
          });

      })
      .catch((error) =>{
        console.error(error);
      });
      
    
    }
  

  _goAnotherCity=()=>{
    const { navigation } = this.props;
    this.props.navigation.navigate('CityScreen', {
              cityOfWeather:this.state.city
          });


    
        
           
     }

   render() {
   if(this.state.isLoading){
        return (
          <ImageBackground source={require('./Images/rain.jpg')} style={styles.container}>
            <ActivityIndicator size="large" style={styles.activityIndicatorStyle} />
            
          </ImageBackground>
        );}else{
          return(
            <ImageBackground source={require('./Images/rain.jpg')} style={styles.container}>
              <View style={styles.rowContainer}>
                <TextInput style = {styles.textInputStyle}
                  underlineColorAndroid = "transparent"
                  placeholder = "Istanbul"
                  placeholderTextColor = "#585858"
                  autoCapitalize = "none"
                  onChangeText = {(city) => this.setState({city})}/>
              
                  
                  
                <TouchableOpacity onPress={this._goAnotherCity}>
                    <Text style={styles.textStyle}>GetWeather</Text>
                  </TouchableOpacity> 
                 
              </View>


             <FlatList
              data={this.state.list} 
              renderItem={({item}) => 
             
            
            <View style={styles.tempView}>
               <Text>{item.dt_txt}</Text>
               <Text>{parseInt(item.main.temp-272.35,10)}</Text>
              
                { item.weather[0].main === "Clouds" && <Image source={require('./Images/cloudy.png')}/> }
                { item.weather[0].main === "Rain" && <Image source={require('./Images/umbrella.png')}/> }
                { item.weather[0].main === "Clear" && <Image source={require('./Images/sun.png')}/> }
               
            </View> 
      
                }
               keyExtractor={(item, index) => index}
            />
          </ImageBackground>
          )
        }
      }
}



const styles = StyleSheet.create({
   container:{
     flex:1,
     flexDirection:'column',
     justifyContent:'center',
   
  },

   rowContainer:{
    height:60,
    width:'100%',
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    backgroundColor:'#fff',
    borderRadius:10,
  },

   tempView:{
     height:80,
     width:'100%',
     flexDirection:'column',
     justifyContent:'center',
     alignItems:'center',
     backgroundColor:'#fff',
     marginTop:10,
     borderRadius:10,
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