/*
 * Debit MODAL 
 * COMPONENT
 */
import React, {useState} from 'react';
import { View, 
         TouchableOpacity, 
         StyleSheet, 
         Text,
         TextInput,
         Modal } from 'react-native';

import { Entypo } from '@expo/vector-icons';


const ModalComponent = ({ modalVisible, 
                          setModalVisible, 
                          submitBtnColor,
                          submitBtnText,
                          submitData }) => {
  
  // REACT's STATE 
  const [ inputAmount, setInputAmount ]          = useState('');
  const [ inputDescription, setInputDescription] = useState('');
  //const [ errorText, errorTextSet ]       = useState('Default Error Style');

  return (

    // MODAL CODE START

    <Modal
      visible={modalVisible}
      animationType='slide'
      transparent={true}
      onRequestClose={()=>{ setModalVisible(false) }}
    >
      <View style={ styles.modalView } >
        
        <View>

          <Text style={ styles.modalTitle }>Modal Title</Text>

          <Entypo
            name='cross'
            style={ styles.modalIcon }
            size={50}
            onPress={()=>{setModalVisible(false)}}
          />
        </View>

        <TextInput 
          placeholder='Amounty'
          placeholderTextColor='#242320'
          keyboardType='numeric'
          value={inputAmount}
          onChangeText={inputValue=>{setInputAmount(inputValue)}}
          style={ styles.modalAmountInput } 
        />

        <TextInput 
          placeholder='Description'
          placeholderTextColor='#242320'
          value={inputDescription}
          onChangeText={inputValue=>{setInputDescription(inputValue)}}
          autoCorrect={false}
          style={ styles.modalTextDescription } 
        />


        {/* SUBMIT BUTTON */}
        <TouchableOpacity 
          onPress={()=>{ 
                        submitData(inputAmount,inputDescription)
                        setModalVisible(false)
                  }}
        >
          <View style={[ styles.modalSubmitBtn, {backgroundColor : submitBtnColor} ]} >
            <Text style={ styles.modalSubmitBtnText} >{submitBtnText}</Text>
          </View>
        </TouchableOpacity>

      </View>
    </Modal>
  )
};

const styles = StyleSheet.create({
  
  modalView : {
    backgroundColor:'#ebe6df',
    flex : 1,
    padding : 20,
  },

  modalTitle : {
    fontSize : 30,
    textAlign : 'center',
  },

  modalIcon : {
    alignSelf : 'flex-end',
  },

  modalText : {
    fontSize : 30,
    textAlign : 'center',
    color : 'white',
  },

  modalAmountInput : {
    fontSize : 35,
    fontWeight : 'bold',
    textAlign : 'center',
    borderBottomWidth : 2,
    borderEndColor : 'black',
    margin : 5,
    color : 'black',
  },

  modalTextDescription : {
    fontSize : 20,
    paddingTop : 30,
    padding : 5,
    borderBottomWidth : 2,
    borderEndColor : 'black',
    marginHorizontal : 30,
    color : '#2b2b2b',
  },
 
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

  errorStyle : {
    alignSelf : 'center',
    fontSize : 15,
    color : 'red',
    marginBottom : 5,
  },

});

export default ModalComponent;
