/*
 * IONIC'S
 * ACTIONSHEET CTRL
 * FROM SCRATCH
 */
import React from 'react';

import { View, 
         TouchableOpacity, 
         TouchableWithoutFeedback,
         StyleSheet, 
         FlatList,
         Text,
         Modal } from 'react-native';

import StraightLine from './StraightLine';
import BlackScreen  from './BlackScreen';


const ActionSheet = ({ sheetTitle,
                       sheetDescription,
                       sheetData,
                       listItemColor,
                    //------------------
                       sheetVisible,
                       setSheetVisible,
                       sheetSelectedItem,
                    }) => {

  return (
    <View>

      {/* BACKGROUND MODAL */}
      <BlackScreen 
        modalVisible={sheetVisible}
        setModalVisible={ (bool:boolean)=>setSheetVisible(bool) }
      />

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

              <Text style={ styles.modalTitle }> 
                { sheetTitle }
              </Text>

              { sheetDescription 
                ?  <Text style={ styles.modalDescription }>
                    ({ sheetDescription })
                  </Text>
                : null
              }
            </View>

            {/* BODY */}
            <View style={ styles.modalBody }>

              <FlatList
                data={ sheetData }
                keyExtractor={ item=>item.id.toString()}
                renderItem={ (element)=>{
                  return (
                    <TouchableOpacity onPress={ ()=>{
                      sheetSelectedItem( element.item )
                      setSheetVisible(false)
                    }}>
                      <Text style={[
                        styles.flatListItem, 
                        { color: listItemColor } 
                      ]}>
                        { element.item.source_name}
                      </Text>

                      {/* ST. LINE*/}
                      <StraightLine 
                        color='#f0ede6'
                        width={2}
                      />

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
    padding : 15,
  },

  modalBackground : {
    backgroundColor : '#faf8f7',
    borderRadius : 15,
  },

  modalHeader : {
    alignItems : 'center',
    padding : 10,
  },

  modalTitle : {
    fontSize : 14, 
    fontWeight: 'bold', 
    paddingVertical : 5,
  },

  modalDescription : {
    fontSize : 14, 
    color:'#4e544d', 
    paddingVertical : 5,
  },

  modalBody: {
    alignItems : 'stretch',
    paddingBottom : 30,
  },

  flatListItem : {
    fontSize : 18,
    alignSelf : 'stretch',
    padding : 10,
    textAlign : 'center',
  },

  // CANCEL BUTTON BACKGROUND   
  modalCancelButton : {
    backgroundColor : '#faf8f7',
    alignItems : 'center',
    marginVertical : 10,
    borderRadius : 15,
  },

  // CANCEL BUTTON FOREGROUND    
  modalCancelButtonText : {
    fontSize : 18,
    fontWeight : 'bold',
    color : '#0095ff',
    padding : 10,
  },


});

export default ActionSheet;
