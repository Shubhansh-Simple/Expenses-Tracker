import React, {useState} from 'react';
import { View, 
         Modal, 
         TouchableOpacity, 
         Text,
         TextInput,
         Button,
         StyleSheet } from 'react-native';
import { Entypo } from '@expo/vector-icons';

const HomeScreen = () => {

  const [ inputText, setInputText ] = useState('');
  const [ errorText, errorTextSet ] = useState('Default Error for styling');
  const [ modalVisible, setModalVisible ] = useState(false);

  return (
    <View style={styles.homeStyle} >

      {/* MODAL STARTS */}
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

          <TextInput 
            placeholder='Type Amount'
            placeholderTextColor='#242320'
            keyboardType='numeric'
            value={inputText}
            onChangeText={inputValue=>{setInputText(inputValue)}}
            style={ styles.modalTextInput } 
          />

          {/*ERROR*/}
          { true ? 
            <Text style={ styles.errorStyle }>({errorText})</Text> :
            null }


          <TouchableOpacity 
            onPress={()=>{console.log('Value you submit is - ',inputText) }}
          >
            <View style={ styles.modalSubmitBtn } >
              <Text style={ styles.modalSubmitBtnText} >Submit</Text>
            </View>
          </TouchableOpacity>
     

        </View>
      </Modal>
      {/* MODAL ENDS */}

      <TouchableOpacity 
        style={{ flexDirection : 'row'}}
        onPress={()=>{ setModalVisible(true) }}
      >
        <View style={ styles.signBgStyle} >
          <Text style={ styles.signStyle} >+</Text>
        </View>

      </TouchableOpacity>

    </View>
  )
};

const styles = StyleSheet.create({

  homeStyle : {
    flex : 1,
    alignItems : 'flex-start',
    backgroundColor : 'white',
    padding : 10,
    paddingTop : 30,
  },

  // ----MODAL STARTS---
  
  modalView : {
    backgroundColor:'#ebe6df',
    flex : 1,
    //alignSelf : 'stretch',
    padding : 20,
  },

  modalIcon : {
    alignSelf : 'flex-end',
  },

  modalText : {
    fontSize : 30,
    textAlign : 'center',
    color : 'white',
  },

  modalTextInput : {
    fontSize : 35,
    textAlign : 'center',
    //padding : 20,
    borderBottomWidth : 2,
    borderEndColor : 'black',
    margin : 5,
    color : 'black',
  },

  // SUBMIT BUTTONa
  //
  modalSubmitBtn : {
    borderRadius : 15,
    backgroundColor : '#fc035e',
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
    padding : 10,
    paddingHorizontal : 20,
  },

  // ----MODAL ENDS---

  signBgStyle : {
    backgroundColor : '#3ea832',
    paddingHorizontal : 30,
    paddingVertical : 5,
    borderRadius : 10,
    marginHorizontal : 30,
  },

  signStyle : {
    fontSize : 40,
    textAlignVertical : 'center',
    fontWeight : 'bold',
    alignSelf : 'center',
    color : 'white',
  },

  errorStyle : {
    alignSelf : 'center',
    fontSize : 15,
    color : 'red',
    marginBottom : 5,
  },

});

export default HomeScreen;


