/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput,
  Image
} from 'react-native';

class Forecast extends Component {
  constructor(props){
    super(props);
    this.state = {
      zip: '',
      forecast: {
        main: "",
        description: "",
        temp: ""
      }
    }
    this._handleTextChange = this._handleTextChange.bind(this);
  }
  _handleTextChange(event) {
    var zip = event.nativeEvent.text;
    var key = '9d2ee214fc30a0a751652888291bf2ff';
    this.setState({zip: zip});
    console.log(this.state.zip)
    fetch('http://api.openweathermap.org/data/2.5/weather?q=zip'
      + zip + '&units=imperial&appid=' + key, {method:'GET'})
      .then((response) => response.json()
      .then((responseJSON) => {
        console.log(responseJSON);
        this.setState({
          forecast: {
            main: responseJSON.weather[0].main,
            description: responseJSON.weather[0].description,
            temp: responseJSON.main.temp
          }
        })
      }))
      .catch((error) => {
        console.warn(error);
      });
  }
  render() {
    return (
      <Image source={require('./bg.png')} style={styles.container}>
          <View style={styles.overlay}>
           <View style={styles.row}>
             <Text style={styles.mainText}>
               Current weather for 
             </Text>
             <View style={styles.zipContainer}>
               <TextInput
                 style={[styles.zipCode, styles.mainText]}
                 onSubmitEditing={this._handleTextChange}/>
             </View>
           </View>
           <View style={styles.row}>
            <Text style={styles.mainText}>
              Weather: {this.state.forecast.main}
            </Text>
           </View>
           <View style={styles.row}>
            <Text style={styles.mainText}>
              Temp: {this.state.forecast.temp}
            </Text>
           </View>
         </View>
      </Image>
    );
  }
}

var baseFontSize = 16;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 30,
    width: null,
    height: null
  },
  backdrop: {
    flex: 1,
    flexDirection: 'column'
  },
  overlay: {
    paddingTop: 5,
    backgroundColor: '#000000',
    opacity: 0.5,
    flexDirection: 'column',
    alignItems: 'center'
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'nowrap',
    alignItems: 'flex-start',
    padding: 30
  },
  zipContainer: {
    flex: 1,
    borderBottomColor: '#DDDDDD',
    borderBottomWidth: 1,
    marginLeft: 5,
    marginTop: 3
  },
  zipCode: {
    width: 50,
    height: baseFontSize,
  },
  mainText: {
    flex: 1,
    fontSize: baseFontSize,
    color: '#FFFFFF'
  }
});

module.exports = Forecast;