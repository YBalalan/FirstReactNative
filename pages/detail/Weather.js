import React, { Component } from 'react';
import Geocoder from 'react-native-geocoding';
import { Dimensions,View,ImageBackground,StyleSheet,ActivityIndicator,FlatList,Text,Image,TextInput,Button,TouchableOpacity } from 'react-native';


 export default class Weather extends React.Component {
 
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
      isLoading:false,
      cityName:'',
      temp:'',
      description:'',
     
      }
   

   
    
  }

  componentDidMount(){
    
    const { navigation } = this.props;
    const city = navigation.getParam('cityOfWeather');
  
     this.props.navigation.setParams({ headerPage: city });
    
  
    return fetch(`https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)},tr&appid=557b6fb541506e90034bf7116dc26b0e`)
    .then((response) => response.json())
      .then((responseJson) => {

        this.setState({
          isLoading: false,
          temp:parseInt(responseJson.main.temp-272.35,10),
          cityName:city,
          description:responseJson.weather[0].description,
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
            <ImageBackground source={require('../Images/rain.jpg')} style={styles.container}>
              <Text style={styles.tempText}> {this.state.temp}</Text>
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
     alignItems:'center',
  },

   rowContainer:{
    height:60,
    width:'100%',
    marginRight:10,
    marginLeft:10,
    flexDirection:'row',
    alignItems:'center',
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
},

tempText:{
  fontSize: 80,
  fontWeight: 'bold',
}

})