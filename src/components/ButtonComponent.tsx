import React from 'react';
import { View,
         TouchableOpacity,
         Text,
         StyleSheet } from 'react-native';

import { Entypo } from '@expo/vector-icons'; 

const ButtonComponent = ( {btnColor, iconName, btnText, callModal } ) => {
  return (
    <TouchableOpacity 
      style={{ flexDirection : 'row'}}
      onPress={()=>{ callModal(true) }}
    >
      <View style={ [styles.signBgStyle,{borderColor : btnColor}] } >
        <Entypo 
          name={iconName}
          size={50}
          color={btnColor}
        />
        <Text style={ styles.signStyle }>{btnText}</Text>
      </View>
    </TouchableOpacity>

  )
};

const styles = StyleSheet.create({

  signBgStyle : {
    borderWidth : 3,
    padding : 30,
    borderRadius : 100,
    alignItems : 'center',
    justifyContent : 'center',
    marginHorizontal : 10,
    backgroundColor : '#393b39',
  },

  signStyle : {
    fontSize : 14,
    color : 'white',
  },

});

export default ButtonComponent;


