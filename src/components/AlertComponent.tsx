/*
 * IONIC'S
 * ACTIONSHEET CTRL
 * FROM SCRATCH
 */
import React, {useState} from 'react';
import { View, 
         StyleSheet, 
         Text,
         Modal } from 'react-native';

const AlertComponent = ({ alertMsg,
                         //alertFgColor,
                         //alertBgColor,
                          alertVisible,
                          setAlertVisible,
                       }) => {
  return (
    <View> 
      <Modal
        visible={alertVisible}
        animationType='slide'
        transparent={true}
        onRequestClose={ ()=>{ setAlertVisible(false) } }
      >
        {/* ALERT CONTAINER */}
        <View style={ styles.alertContainer }>

          {/* ALERT BODY */}
          <View style={ styles.alertBackground }>
            <Text style={ styles.alertText }>{alertMsg}</Text>
          </View>

        </View>
      </Modal>

    </View>
  )
};

const styles = StyleSheet.create({

  alertContainer : {
    flex : 1,
    justifyContent : 'flex-end',
  },

  alertBackground : {
    backgroundColor : '#2e2818',
  },

  alertText : {
    fontSize : 16,
    color : 'white',
    padding : 10,
    paddingHorizontal : 25,
  },


});

export default AlertComponent;

