/*
 * IONIC'S
 * ACTIONSHEET CTRL
 * FROM SCRATCH
 */
import React, {useState} from 'react';
import { View, 
         TouchableOpacity, 
         TouchableWithoutFeedback,
         StyleSheet, 
         FlatList,
         Text,
         Modal } from 'react-native';

import { Entypo } from '@expo/vector-icons';

const ActionSheet = ({ sheetTitle,
                       sheetDescription,
                       sheetData,
                    //------------------
                       sheetVisible,
                       setSheetVisible,
                    }) => {

  return (
    <View>

      {/* BACKGROUND MODAL */}
      <Modal
        visible={sheetVisible}
        animationType='fade'
        transparent={true}
        onRequestClose={ ()=>{ setSheetVisible(false) } }
      >
        <View style={{ 
          flex:1,
          backgroundColor:'rgba(52,52,52,0.9)'}}
        >
        </View>
      </Modal>

      {/* FOREGROUND MODAL */}
      <Modal
        visible={sheetVisible}
        animationType='slide'
        transparent={true}
        onRequestClose={ ()=>{ setSheetVisible(false) } }
      >
        <View style={ styles.modalContainer } >

          <View style={ styles.modalBackground }>
  
            {/* HEADER */}
            <View style={ styles.modalHeader }>

              <Text style={{ fontSize:16, fontWeight: 'bold'}}> 
                { sheetTitle }
              </Text>

              { sheetDescription 
                ?  <Text style={{ fontSize:14, color:'#4e544d'}}>
                    ({ sheetDescription })
                  </Text>
                : null
              }
            </View>

            {/* BODY */}
            <View style={ styles.modalBody }>

              <FlatList
                data={ sheetData }
                keyExtractor={ item=>item.title }
                renderItem={ (element)=>{
                  return (
                    <TouchableOpacity onPress={ ()=>console.log('Action - ',element.item.value)}>
                      <Text style={ styles.flatListItem }>
                        { element.item.title }
                      </Text>
                    </TouchableOpacity>
                  )
                }}
              />

            </View>

          </View>

          {/* FOOTER */}
          <TouchableWithoutFeedback onPress={ ()=>setSheetVisible(false) }>
            <View style={ styles.modalCancelButton }>
              <Text style={ styles.modalCancelButtonText }>Cancel</Text>
            </View>
          </TouchableWithoutFeedback>

        </View>
      </Modal>
    </View>
  )
};

const styles = StyleSheet.create({

  modalContainer : {
    flex : 1,
    justifyContent : 'flex-end',
    padding : 20,
  },

  modalBackground : {
    backgroundColor : '#faf8f7',
    borderRadius : 20,
  },

  modalHeader : {
    alignItems : 'center',
    padding : 10,
  },

  modalBody: {
    alignItems : 'center',
    paddingBottom : 20,
  },

  flatListItem : {
    fontSize : 18,
    color : '#0095ff',
    alignSelf : 'stretch',
    padding : 10,
    textAlign : 'center',
  },

  modalCancelButton : {
    backgroundColor : '#faf8f7',
    alignItems : 'center',
    marginVertical : 10,
    borderRadius : 20,
  },

  modalCancelButtonText : {
    fontSize : 18,
    fontWeight : 'bold',
    color : 'red',
    padding : 10,
  },


});

export default ActionSheet;
