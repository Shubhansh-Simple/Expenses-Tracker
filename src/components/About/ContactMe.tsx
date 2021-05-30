/*
 * Keep Icon and text
 * in a row.
 */
import React from 'react';

import { View, 
         Text,
         StyleSheet } from 'react-native';

import { MaterialCommunityIcons } from '@expo/vector-icons'; 

const ContactMe = ({ iconName, textOnLine, iconBgColor }) =>{
  return (
    <View style={{ flexDirection : 'row', 
                   justifyContent : 'space-between', 
                   alignSelf : 'stretch',
                }}>

      <MaterialCommunityIcons 
        name={iconName}
        size={20} 
        color="white" 
        style={[ styles.iconStyle, {backgroundColor : iconBgColor} ]}
      />
      <Text style={{ fontWeight : 'bold',
                     textAlignVertical : 'center',
                     fontStyle : 'italic',
                  }}>
        {textOnLine}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  iconStyle : {
    padding : 5,
    borderRadius : 50,

  },
})

export default ContactMe;


