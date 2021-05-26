import React, { useState,useEffect } from 'react';

import { View, 
         Text,
         Modal,
         Button,
         TextInput,
         TouchableOpacity,
         StyleSheet } from 'react-native';

import reuseStyle      from '../Styles/reuseStyle';

import StraightLine    from './StraightLine';
import BlackScreen     from './BlackScreen';
import PopupButton     from './PopupButton';


const PopupInput = ({ popupTitle,
                      popupDescription,
                      popupPlaceholder,
                      defaulty,
                      // STATE
                      popupVisible,
                      setPopupVisible,
                      // output
                      submitData
                       })  =>  {

  const [ nameInput, setNameInput  ] = useState('')
  //const [ error, setError ] = useState('')


  useEffect( () => {
    /*
     * FIRST THING HAPPEN
     * AFTER LOADING
     * THIS SCREEN
     */
    setNameInput(defaulty)
  },[ defaulty ])


  return (
    <View>

      {/* BACKGROUND MODAL */}
      <BlackScreen 
        modalVisible={popupVisible}
        setModalVisible={ (bool:boolean)=>setPopupVisible(bool) }
      />

      <Modal
        visible={popupVisible}
        animationType='slide'
        transparent={true}
        onRequestClose={ ()=>{ setPopupVisible(false) } }
      >
        <View style={ styles.modalContainer }>

          <View style={ styles.modalBackground }>

            <Text style={ styles.modalTitle} >
              {popupTitle}
            </Text>

            <Text style={ styles.modalDescription} >
              ({popupDescription})
            </Text>


            {/* SOURCE NAME INPUT */}
            <TextInput
              placeholder = 'Type your name here....'
              placeholderTextColor='#dedede'
              onChangeText={ inputValue=>setNameInput(inputValue) }
              value={ nameInput }
              style={ styles.modalNameInput } 
            />

            
            {/*CONDITIONAL CODE*/} 
            {
              nameInput.length > 20
                ?
              <Text style={ reuseStyle.errorStyle }>
                (Not more than 20 characters)
              </Text>
                :
              null
            }
      
            {/* ST. LINE*/}
            <StraightLine 
              color='#CACACA'
              width={2}
            />


            <View style={{ 
              flexDirection : 'row', 
              justifyContent : 'space-around' 
              }}>
    
              <TouchableOpacity
                onPress={ ()=>setPopupVisible(false) }
              >
                <PopupButton buttonText='Cancel' />
              </TouchableOpacity>

              {/* STRAIGHT LINE */}
              <View style={{ 
                borderRightColor :'#CACACA',
                borderRightWidth :  2,
                backgroundColor  : 'black',
                justifyContent   : 'space-around',
                }}>
              </View>

              {/* SUBMIT BUTTON */}
              <TouchableOpacity
                onPress={ ()=>{ setPopupVisible(false)
                                submitData(nameInput)                    
                }}
              >
                <PopupButton buttonText='Submit' />
              </TouchableOpacity>

            </View>

          </View>

        </View>

      </Modal>
    </View>
  )
};

const styles = StyleSheet.create({

  modalContainer : {
    flex : 1,
    justifyContent : 'center',
    paddingHorizontal : 30,
  },

  modalBackground : {
    backgroundColor : '#E0E0E0',
    borderRadius : 10,
  },

  modalTitle : {
    fontSize   : 20, 
    fontWeight : 'bold',
    textAlign : 'center',
    paddingTop : 25,
    paddingBottom : 2,
  },

  modalDescription : {
    fontSize : 15, 
    textAlign : 'center',
    fontStyle : 'italic',
    color:'#4e544d', 
  },

  modalNameInput : {
    fontSize : 20,
    borderWidth : 2,
    marginHorizontal : 10,
    borderRadius : 7,
    backgroundColor : 'white',
    borderColor : '#CACACA',
    paddingHorizontal : 10,
    paddingVertical : 5,
    marginVertical : 30,
    color : '#636363',
  },

});

export default PopupInput;


