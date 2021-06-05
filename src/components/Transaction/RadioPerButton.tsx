import React, { useState } from 'react';

import { View, 
         Text,
         Dimensions,
         TouchableWithoutFeedback,
         StyleSheet } from 'react-native';


const RadioPerButton = ({ buttonId,
                          buttonText, 
                          isColorChange,
                          buttonClick })=>{

  const width = ( Dimensions.get('window').width / 3 - 20 )

  return(

    <TouchableWithoutFeedback onPress={ ()=>buttonClick(buttonId) }>

      <View style={[ styles.radioInnerContainer, {'width' : width} ]}>

        <Text style={[ styles.radioText, 
                      ( isColorChange 
                          ? 
                        {
                         'fontWeight'  : 'bold',
                         'borderBottomColor' : 'black',
                        }
                          :
                        null 
                     )
                    ]}>
          {buttonText}
        </Text>
      </View>

    </TouchableWithoutFeedback>
      
  )
}

const styles = StyleSheet.create({

  radioInnerContainer : {
    paddingTop : 3,
    borderRadius : 12,
  },

  radioText : {
    fontSize : 16,
    color : 'black',
    fontStyle : 'italic',
    textAlign : 'center',
    paddingVertical : 2, 
    borderRadius : 13,
    borderBottomWidth : 4,
    borderBottomColor : '#ffe6b5',
  }
 
})

export default RadioPerButton;
 
