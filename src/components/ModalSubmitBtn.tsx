/*
 * Modal's submit
 * Button
 * COMPONENT
 */
import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';

const ModalSubmitBtn = ( { btnText, btnColor, btnSubmit } )=> {
  return (

    <TouchableOpacity 
        onPress={()=>{
            btnSubmit( false )
        }}
      >
        <View style={[styles.modalSubmitBtn,{backgroundColor : btnColor}]} >
          <Text style={ styles.modalSubmitBtnText} >{btnText}</Text>
        </View>
    </TouchableOpacity>
  )
};

const styles = StyleSheet.create({
 
  // SUBMIT BUTTON
  modalSubmitBtn : {
    borderRadius : 15,
    paddingHorizontal : 20,
    alignSelf : 'center',
    margin : 40,
    shadowColor : 'black',
    shadowOffset : { width:2, height:2 },
    shadowOpacity : 1.9,
  },

  modalSubmitBtnText : {
    fontSize : 20,
    color : 'white',
    fontWeight : 'bold',
    padding : 10,
    paddingHorizontal : 20,
  },

});



export default ModalSubmitBtn;


