import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

const ButtonSection = ( {btnColor, btnText, callModal } ) => {
  return (
    <TouchableOpacity 
      style={{ flexDirection : 'row'}}
      onPress={()=>{ callModal(true) }}
    >

      <View style={ [styles.signBgStyle,{backgroundColor : btnColor}] } >
        <Text style={ styles.signStyle}>
          {btnText}
        </Text>
      </View>
    </TouchableOpacity>

  )
};

const styles = StyleSheet.create({

  signBgStyle : {
    paddingHorizontal : 30,
    paddingVertical : 5,
    borderRadius : 10,
    marginHorizontal : 10,
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


