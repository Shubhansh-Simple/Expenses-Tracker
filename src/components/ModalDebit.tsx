/*
 * Debit MODAL 
 * COMPONENT
 */
import React from 'react';
import { View, StyleSheet, Text, Modal } from 'react-native';
import { Entypo } from '@expo/vector-icons';

// COMPONENT
import ModalSubmitBtn from './ModalSubmitBtn';

const ModalDebit = ( { modalVisible, setModalVisible } )=> {
  return (

    <View>
      <Modal
        visible={modalVisible}
        animationType='slide'
        transparent={true}
        onRequestClose={()=>{ setModalVisible(false)}}
      >
        <View style={ styles.modalView } >

          <Entypo
            name='cross'
            style={ styles.modalIcon }
            size={50}
            onPress={()=>{ setModalVisible(false)}}
          />
          <Text>Modal inside component</Text>

          {/* COMPONENT */}
          <ModalSubmitBtn 
            btnText='Debit'
            btnColor='#ff1900'
            btnSubmit={ (bool:boolean)=>{ setModalVisible(bool) } }
          />

        </View>
      </Modal>
      {/* MODAL ENDS */}

    </View>

  )
};

const styles = StyleSheet.create({
  
  modalView : {
    backgroundColor:'#ebe6df',
    flex : 1,
    //alignSelf : 'stretch',
    padding : 20,
  },

  modalIcon : {
    alignSelf : 'flex-end',
  },

});

export default ModalDebit;
