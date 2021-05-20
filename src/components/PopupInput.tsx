import React, {useState} from 'react';

import { View, 
         Text,
         Modal,
         Button,
         TextInput,
         TouchableOpacity,
         StyleSheet } from 'react-native';

import reuseStyle      from '../Styles/reuseStyle';

import BlackScreen     from './BlackScreen';
import PopupButton     from './PopupButton';
import ButtonComponent from './ButtonComponent';


const PopupInput = ({ popupTitle,
                      popupDescription,
                      popupPlaceholder,
                      // STATE
                      popupVisible,
                      setPopupVisible,
                      // output
                      submitData
                       })  =>  {

  const [ nameInput, setNameInput  ] = useState('')
  const [ error, setError ] = useState('')

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
              placeholder={popupPlaceholder}
              placeholderTextColor='#dedede'
              value={ nameInput }
              onChangeText={inputValue=>setNameInput(inputValue)}
              style={ styles.modalNameInput } 
            />

            {
              nameInput.length > 20
                ?
              <Text style={ reuseStyle.errorStyle }>
                (Not more than 20 characters)
              </Text>
                :
              null
            }
      
            {/* STRAIGHT LINE */}
            <View style={{ 
              borderBottomColor : '#CACACA',
              borderBottomWidth : 2,
              alignSelf         : 'stretch',
              marginTop         : 5,
              }}>
            </View>

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


