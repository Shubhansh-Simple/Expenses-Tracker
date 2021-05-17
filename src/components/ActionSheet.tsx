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

const ActionSheet = ({ sheetTitle,
                       sheetDescription,
                       sheetData,
                    //------------------
                       sheetVisible,
                       setSheetVisible,
                       sheetSelectedItem,
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

              <Text style={{ fontSize:14, fontWeight: 'bold', paddingVertical:5}}> 
                { sheetTitle }
              </Text>

              { sheetDescription 
                ?  <Text style={{ fontSize:14, color:'#4e544d', paddingVertical:5}}>
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
                    <TouchableOpacity onPress={ ()=>{
                      console.log('Action - ',element.item.value)
                      sheetSelectedItem(element.item.value)
                      setSheetVisible(false)
                      }
                      }>
                      <Text style={ styles.flatListItem }>
                        { element.item.title }
                      </Text>
                      <View style={{ 
                        borderBottomColor:'#f0ede6',
                        borderBottomWidth:2,
                        }}>
                      </View>
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

  modalBody: {
    alignItems : 'stretch',
    paddingBottom : 30,
  },

  flatListItem : {
    fontSize : 18,
    color : '#0095ff',
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
