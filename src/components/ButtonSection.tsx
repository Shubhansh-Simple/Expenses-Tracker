import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

const ButtonSection = ( {btnColor : string, btnText : string} ) => {
  return (
    <TouchableOpacity style={{ flexDirection : 'row'}}>

      <View style={ [styles.signBgStyle,{backgroundColor : 'yellow' }] } >
        <Text style={ styles.signStyle}>
          {btnText}
        </Text>
      </View>
    </TouchableOpacity>
  )
};

const styles = StyleSheet.create({

  signBgStyle : {
    //backgroundColor : {btnColor},
    paddingHorizontal : 30,
    paddingVertical : 5,
    borderRadius : 20,
    marginHorizontal : 30,
  },

  signStyle : {
    fontSize : 40,
    textAlignVertical : 'center',
    fontWeight : 'bold',
    alignSelf : 'center',
    color : 'white',
  },

});

export default ButtonSection;


