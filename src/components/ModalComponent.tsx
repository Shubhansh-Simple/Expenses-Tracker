/*
 * Credit-Debit MODAL 
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

// LOCAL
import ActionSheet from './ActionSheet';


const ModalComponent = ({ modalTitle, 
                          submitBtnColor,
                          submitBtnText,
                          sourceOptions,
                          modalVisible, 
                          setModalVisible, 
                          submitData }) => {

  // CHOICES 
  const pickerTwoData = {
    source_name : 'Choose your source',
    id : 0
  }

  const pickerOneData = [
    { source_name    : 'Select payment type', id : 'Default' },
    { source_name    : 'Cash Payment'  ,      id : 'cash'  },
    { source_name    : 'Online Payment',      id : 'online'},
  ] 
  
  // REACT's STATE 
  const [ inputAmount, setInputAmount ]          = useState('');
  const [ inputDescription, setInputDescription] = useState('');

  const [ inputCashType, setCashType]     = useState(pickerOneData[0]) 
  const [ inputSourceType, setSourceType] = useState( pickerTwoData )

  const [ pickerOne, setPickerOne ]       = useState(false);
  const [ pickerTwo, setPickerTwo ]       = useState(false);

  return (
    // MODAL CODE START

    <Modal
      visible={modalVisible}
      animationType='slide'
      transparent={true}
      onRequestClose={()=>{ setModalVisible(false) }}
    >
      <View style={ styles.modalView } >
        
        <View style={{ flexDirection : 'row',justifyContent : 'space-around'}}>

          <Text style={[styles.modalTitle,{fontSize:30} ]}>{modalTitle}</Text>

          <Entypo
            name='cross'
            style={ styles.modalIcon }
            size={50}
            color='#353b34'
            onPress={ ()=>setModalVisible(false) }
          />
        </View>

        {/* AMOUNT INPUT */}
        <TextInput 
          placeholder='0'
          placeholderTextColor='#242320'
          keyboardType='numeric'
          value={inputAmount}
          onChangeText={inputValue=>{setInputAmount(inputValue)}}
          style={ styles.modalAmountInput } 
        />


        {/* CASH TYPE MODAL */}
        <ActionSheet 
          sheetTitle       ='Choose any option'
          sheetDescription ='Ensure user what type of cash it is.'
          listItemColor    ='#0095ff'
          sheetData        ={ pickerOneData.slice(1,) }
          sheetVisible     ={pickerOne}
          setSheetVisible  ={ (bool:boolean)=>setPickerOne(bool) }
          sheetSelectedItem={item=>setCashType(item)}
        />

        {/* CASH TYPE INPUT */}
        <TouchableOpacity onPress={ ()=>setPickerOne(true) }>
          <View style={ styles.pickersContainer } >
            <Text style={ styles.modalTitle }>
              { inputCashType.source_name }
            </Text>
            <Entypo 
              name='triangle-down' 
              size={30} 
              color='black'
              style={ styles.modalIcon }
            />
          </View>
        </TouchableOpacity>


        {/* SOURCE TYPE MODAL */}
        <ActionSheet 
          sheetTitle        ='Choose your option'
          sheetDescription  ='Like for what you making this trasaction.'
          listItemColor     ='#0095ff'
          sheetData         ={sourceOptions}
          sheetVisible      ={pickerTwo}
          setSheetVisible   ={ (bool:boolean)=>setPickerTwo(bool) }
          sheetSelectedItem ={ item=>setSourceType(item) }
        />

        {/* SOURCE TYPE INPUT */}
        <View style={ styles.pickersContainer}>
          <Text style={ styles.modalTitle }>Source</Text>

          <TouchableOpacity onPress={()=>setPickerTwo(true) }>
            <View style={ styles.sourceRightContainer }>

                <Text style={ styles.sourceOptionText}>
                  {inputSourceType.source_name}
                </Text>
                <Entypo 
                    name='triangle-down' 
                    size={18} 
                    color='black'
                    style={ styles.modalIcon }
                  />
            </View>
          </TouchableOpacity>
        </View>


        {/* DESCRIPTION INPUT */}
        <TextInput 
          placeholder='Type your reason here...'
          value={inputDescription}
          onChangeText={inputValue=>{setInputDescription(inputValue)}}
          autoCorrect={false}
          style={ styles.modalTextDescription } 
        />

        
        {/* SUBMIT BUTTON */}
        <TouchableOpacity 
          onPress={()=>{ 
                        submitData( inputAmount, 
                                    inputDescription, 
                                    inputCashType.id, 
                                    inputSourceType.id )
                        setModalVisible(false)
                  }}
        >
          <View style={[ styles.modalSubmitBtn, 
                         {backgroundColor : submitBtnColor} 
                      ]}>
            <Text style={ styles.modalSubmitBtnText} >{submitBtnText}</Text>
          </View>
        </TouchableOpacity>

      </View>

    </Modal>
  )
};

const styles = StyleSheet.create({
  
  modalView : {
    //backgroundColor:'#ebe6df',
    backgroundColor:'#ffe6b5',
    flex : 1,
    borderRadius : 40,
    marginTop   : 40,
    marginBottom: 80,
    padding : 10,
  },

  modalTitle : {
    fontSize : 25,
    color : '#353b34',
    fontWeight : 'bold',
    fontStyle : 'italic',
    textAlignVertical : 'center',
  },

  modalIcon : {
    textAlignVertical : 'bottom' ,
  },

  modalAmountInput : {
    fontSize : 40,
    textAlign : 'center',
    borderBottomWidth : 2,
    borderEndColor : 'black',
    marginHorizontal : 30,
    margin : 10,
    color : 'black',
  },

  modalTextDescription : {
    fontSize : 20,
    paddingTop : 30,
    padding : 5,
    borderBottomWidth : 1,
    borderEndColor : 'black',
    marginHorizontal : 30,
    color : '#4e544d',
  },

  // CASH TYPE STYLING
  pickersContainer : {
    flexDirection: 'row', 
    justifyContent : 'space-around',
    paddingTop : 30,
  },

  sourceRightContainer : {
    flexDirection : 'row',
    top : 5,
  },

  sourceOptionText : {
    fontSize   : 18,
    fontWeight : 'bold',
    color      : 'black',
  },

  // SUBMIT BUTTON
  modalSubmitBtn : {
    borderRadius : 15,
    alignSelf : 'center',
    margin : 40,
  },

  modalSubmitBtnText : {
    fontSize : 20,
    color : 'white',
    fontWeight : 'bold',
    padding : 10,
    paddingHorizontal : 20,
  },

});

export default ModalComponent;
