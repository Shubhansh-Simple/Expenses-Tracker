import React  from 'react';

import { View,
         Text,
         StyleSheet } from 'react-native';

const AboutScreen = () => {
  return (
    <View style={ styles.aboutContainer }>
      <Text style={ styles.headingStyle }>Welcome</Text>

      <Text style={ styles.textStyle }>It's Shubhanshu</Text>

      <Text>Computer Programmer & Software Developer</Text>
    </View>
  )
}

const styles = StyleSheet.create({

  headingStyle : { 
    fontSize : 30,
  },

  aboutContainer : {
    flex : 1,
    justifyContent : 'center',
    alignItems : 'center',
    padding : 30,
  },
  
  textStyle : {
    fontSize : 25,
    paddingVertical : 20,
  },
});

export default AboutScreen;

  


