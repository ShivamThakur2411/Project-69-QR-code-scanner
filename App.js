import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ScanScreen from './Screens/ScanScreen.js';

export default class App extends React.Component{
  
  render(){
    return(
      <View>
        <ScanScreen/>
      </View>
    )
  }
}