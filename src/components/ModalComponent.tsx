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
  
  // REACT's STATE 
  const [ inputAmount, setInputAmount ]          = useState('');
  const [ inputDescription, setInputDescription] = useState('');

  const [ inputCashType, setCashType]     = useState('Select payment type') 
  //const [ inputSourceType, setSourceType] = useState('Choose source type')

  const [ pickerOne, setPickerOne ]          = useState(false);
  const [ pickerTwo, setPickerTwo]           = useState(false);

  //STATIC DATA
  const pickerOneData = [
    { source_name : 'Cash'  , id : 'Cash'  },
    { souce_name  : 'Online', id : 'Online' },
  ]

  return (

    // MODAL CODE START

    <Modal
      visible={modalVisible}
      animationType='slide'
      transparent={true}
      onRequestClose={()=>{ setModalVisible(false) }}
    >
      <View style={ styles.modalView } >
        
        <View style={{ flexDirection : 'row',justifyContent : 'space-between'}}>

          <Text style={ styles.modalTitle }>{modalTitle}</Text>

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


        {/* DESCRIPTION INPUT */}
        <TextInput 
          placeholder='Type your description here...'
          value={inputDescription}
          onChangeText={inputValue=>{setInputDescription(inputValue)}}
          autoCorrect={false}
          style={ styles.modalTextDescription } 
        />

        {/* CASH TYPE MODAL */}
        <ActionSheet 
          sheetTitle       ='Choose any option'
          sheetDescription ='Ensure user what type of cash it is.'
          listItemColor    ='#0095ff'
          sheetData        ={pickerOneData}
          sheetVisible     ={pickerOne}
          setSheetVisible  ={ (bool:boolean)=>setPickerOne(bool) }
          sheetSelectedItem={item=>setCashType(item)}
        />

        {/* CASH TYPE INPUT */}
        <TouchableOpacity onPress={ ()=>setPickerOne(true) }>
          <View style={ styles.pickerOneContainer } >
            <Text style={ styles.modalTitle }>
              {inputCashType}
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
          sheetSelectedItem ={ item=>console.log('Data return - ',item) }
        />

        {/* SOURCE TYPE INPUT */}
        <View style={ styles.sourceContainer }>
          <Text style={ styles.modalTitle }>Source</Text>

          <TouchableOpacity onPress={()=>setPickerTwo(true) }>
            <View style={ styles.sourceRightContainer }>

                <Text style={ styles.sourceOptionText}>Choose a source</Text>
                <Entypo 
                    name='triangle-down' 
                    size={18} 
                    color='black'
                    style={ styles.modalIcon }
                  />
            </View>
          </TouchableOpacity>
        </View>

        
        {/* SUBMIT BUTTON */}
        <TouchableOpacity 
          onPress={()=>{ 
                        submitData(inputAmount,inputDescription, inputCashType)
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
    backgroundColor:'#ebe6df',
    flex : 1,
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
    //fontWeight : 'bold',
    textAlign : 'center',
    borderBottomWidth : 2,
    borderEndColor : 'black',
    marginHorizontal : 30,
    margin : 10,
    color : 'black',
  },

  modalTextDescription : {
    fontSize : 20,
    paddingTop : 20,
    padding : 5,
    borderBottomWidth : 1,
    borderEndColor : 'black',
    marginHorizontal : 30,
    color : '#4e544d',
  },

  // SOURCE STYLING

  sourceContainer : {
    flexDirection : 'row',
    justifyContent : 'space-around',
    paddingTop : 30,
  },

  sourceRightContainer : {
    flexDirection : 'row',
    marginTop : 9,
  },

  sourceOptionText : {
    fontSize : 15,
    textAlignVertical : 'center',
    fontWeight : 'bold',
    color : 'black',
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

  pickerOneContainer : {
    flexDirection: 'row', 
    alignSelf :'center',
    paddingTop : 20,
  },

});

export default ModalComponent;
