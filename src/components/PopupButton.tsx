import React from 'react';

import { StyleSheet, Text, View } from 'react-native';

const PopupButton = ({ buttonText })=> {
  
  return (
    <View style={{ 
      paddingHorizontal : 50,
      paddingVertical   : 15,
      }}>
    
      <Text style={{ color : '#2699ff', 
                     fontSize : 19, 
                     fontWeight : 'bold',
                     }}>
        {buttonText}
      </Text>
    </View>
  )
};

export default PopupButton;

