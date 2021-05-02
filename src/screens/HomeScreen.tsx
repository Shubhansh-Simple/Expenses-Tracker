import React, {useState,useEffect} from 'react';
import { View, 
         Modal, 
         TouchableOpacity, 
         Text,
         TextInput,
         Button,
         StyleSheet } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import ButtonSection from '../components/ButtonSection';

const HomeScreen = ({navigation}) => {

  // REACT STATE 
  const [ inputText, setInputText]        = useState('');
  const [ inputAmount, setInputAmount ]   = useState('');
  const [ currentBal, setCurrentBal ]     = useState(0);
  const [ errorText, errorTextSet ]       = useState('Default Error Style');
  const [ modalVisible, setModalVisible ] = useState(false);

  // QUERIES
  let readingPocketQuery : string  = 'SELECT currentBal FROM Pocket WHERE ID=1'

  // DATABASE SECTION STARTS
  const readingPocket = () => {
    /*
     * READING Pocket
     * table
     * */

    global.db.transaction( tx =>{
      tx.executeSql( readingPocketQuery,
        null,
        (_,{ rows:{ _array }})=>{ setCurrentBal( _array[0].currentBal+0 )},
        ()=>{console.log('Failed to read pocket.')},
      )
    })
  }

  const incrementPocket = ( valueAdd : number ) => {
    /*
     * ADDING balance to 
     * current balance
     * */

    global.db.transaction( tx =>{
      tx.executeSql( 'REPLACE INTO Pocket(id,currentBal) VALUES(1,?)',
                     [currentBal + valueAdd],
                     (_,txdb)=>{
                         setCurrentBal( currentBal + valueAdd )
                         console.log('Inserted data successfully.'),
                         setModalVisible(false) 
                        },
                   )
    })
  }
  // DATABASE SECTION ENDS 

  useEffect( ()=>{
  /*
   * FIRST THING HAPPEN
   * AFTER LOADING
   * THIS SCREEN
   */
    readingPocket()
  },[])


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
            value={inputAmount}
            onChangeText={inputValue=>{setInputAmount(inputValue)}}
            style={ styles.modalAmountInput } 
          />

          <TextInput 
            placeholder='Description'
            placeholderTextColor='#242320'
            value={inputText}
            onChangeText={inputValue=>{setInputText(inputValue)}}
            autoCorrect={false}
            style={ styles.modalTextInput } 
          />

          {/*ERROR*/}
          { true ? 
            <Text style={ styles.errorStyle }>({errorText})</Text> :
            null 
          }

          {/* MODAL SUBMIT BUTTON */}
          <TouchableOpacity 
            onPress={()=>{
                incrementPocket(+inputAmount) 
            }}
          >
            <View style={ styles.modalSubmitBtn } >
              <Text style={ styles.modalSubmitBtnText} >Submit</Text>
            </View>
          </TouchableOpacity>
     

        </View>
      </Modal>
      {/* MODAL ENDS */}


      {/* MAIN BUTTON SECTION STARTS */}

      <View style={{ flexDirection:'row',alignItems:'stretch'}}>

        <ButtonSection 
          btnColor='#3ea832' 
          btnText='+' 
          callModal={(bool)=>{ setModalVisible(bool) }} 
        />

        <ButtonSection 
          btnColor='#ff0022' 
          btnText='-' 
          callModal={(bool)=>{ setModalVisible(bool) }} 
        />
      </View>

      {/* MAIN BUTTON SECTION ENDS */}

      <Button title='Navigate' 
              onPress={ ()=>{ navigation.navigate('reading') }} />

      <Text style={ styles.currentBalStyle }> 
        Current Balance - {currentBal} Rs
      </Text>

    </View>
  )
};

const styles = StyleSheet.create({

  homeStyle : {
    flex : 1,
    alignItems : 'center',
    backgroundColor : 'white',
    padding : 10,
    paddingTop : 30,
  },
  
  currentBalStyle : {
    fontSize : 25,
    color : 'black',
    alignSelf : 'center',
  },

  // ----MODAL STYLING STARTS---
  
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

  modalAmountInput : {
    fontSize : 35,
    textAlign : 'center',
    borderBottomWidth : 2,
    borderEndColor : 'black',
    margin : 5,
    color : 'black',
  },

  modalTextInput : {
    fontSize : 20,
    paddingTop : 30,
    padding : 5,
    borderBottomWidth : 2,
    borderEndColor : 'black',
    marginHorizontal : 30,
    color : '#2b2b2b',
  },
  /* SUBMIT BUTTON
  */
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

  // ----MODAL STYLING ENDS---

  errorStyle : {
    alignSelf : 'center',
    fontSize : 15,
    color : 'red',
    marginBottom : 5,
  },

});

export default HomeScreen;


