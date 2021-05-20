/*
 * BLACK SCREEN
 * MODAL
 * AT BACKGROUND
 */

import React from 'react';

import { View, 
         Modal } from 'react-native';

const BlackScreen = ({ modalVisible,
                       setModalVisible
                    }) => {

  return (
    <View>
      {/* BACKGROUND MODAL */}
      <Modal
        visible={ modalVisible }
        animationType='fade'
        transparent={true}
        onRequestClose={ ()=>setModalVisible(false) }
      >
        <View style={{ 
          flex:1,
          backgroundColor:'rgba(52,52,52,0.9)'}}
        >
        </View>
      </Modal>
    </View>
  )
};

export default BlackScreen ;

