import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const HomeScreen = () => {
  return (
    <View style={styles.homeStyle} >
      <Text style={{ fontSize : 20 }}>Welcome To Home Screen</Text>
    </View>
  )
};

const styles = StyleSheet.create({

  homeStyle : {
    flex : 1,
    alignItems : 'center',
    justifyContent : 'center',
    backgroundColor : 'white',
  }
});

export default HomeScreen;


