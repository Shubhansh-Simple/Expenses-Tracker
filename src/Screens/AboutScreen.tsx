import React  from 'react';

import { View,
         Text,
         Image,
         StyleSheet } from 'react-native';

const AboutScreen = () => {
  return (
    <View style={ styles.aboutContainer }>
      <Image 
        style={{ width:200, 
                 height : 200, 
                 borderRadius : 100 }}
        source={require('../../assets/programmer.png')} 
      />

      <Text style={ styles.textStyle }>It's Shubhanshu</Text>

      <Text style={{ fontWeight : 'bold' }}>
        (Computer Programmer & Software Developer)
      </Text>

      <Text style={ styles.textParagraph }>
        This application is written in "React Native" &
        using "Sqlite" database for storing the data in your mobile.
        {'\n'} {'\n'}
        It's just a personal mobile app for practicing concept or nothing else.
      </Text>

    </View>
  )
}

const styles = StyleSheet.create({

  headingStyle : { 
    fontSize : 30,
  },

  aboutContainer : {
    flex : 1,
    justifyContent : 'flex-start',
    marginTop : 40,
    alignItems : 'center',
    padding : 30,
  },
  
  textStyle : {
    fontSize : 25,
    paddingVertical : 20,
    paddingBottom : 0,
  },

  textParagraph : {
    padding : 20,
    fontStyle : 'italic',
    alignSelf : 'stretch',
    color : 'black',
    fontSize : 17,
    marginVertical : 18,
  }
});

export default AboutScreen;

  


