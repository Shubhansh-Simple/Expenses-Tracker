import React  from 'react';

import { View,
         Text,
         Image,
         StyleSheet } from 'react-native';

// LOCAL
import ContactMe  from '../components/About/ContactMe';
import reuseStyle from '../Styles/reuseStyle';

const AboutScreen = () => {
  return (
    <View style={{ backgroundColor : 'white', 
                   flex : 1, 
                   paddingVertical : 20 }}>
      <View style={[ styles.aboutContainer, reuseStyle.bgShadow ]}>
        <Image 
          style={{ width:200, 
                   height : 200, 
                   borderRadius : 100,
                   bottom : 50,
                }}
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


        <ContactMe 
          iconName='email' 
          textOnLine='shubhansh7777@gmail.com' 
          iconBgColor='#3085fc' />

        <ContactMe 
          iconName='instagram' 
          textOnLine='shubhanshu_177' 
          iconBgColor='#eb2358' />

      </View>
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
    borderRadius : 50,
    marginTop : 90,
    alignItems : 'center',
    padding : 20,
    marginHorizontal : 12,
    marginVertical : 20,
    backgroundColor : 'white',
  },
  
  textStyle : {
    fontSize : 25,
    //paddingVertical : 20,
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

  


