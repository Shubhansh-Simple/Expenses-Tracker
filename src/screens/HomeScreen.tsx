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

  const [ modalVisible, setModalVisible ] = useState(false);

  return (
    <View style={styles.homeStyle} >

      <Modal
        visible={modalVisible}
        animationType='slide'
        transparent={false}
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
            style={ styles.modalTextInput } 
          />

        </View>
      </Modal>

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
    paddingTop : 20,
  },

  modalView : {
    backgroundColor:'#ebe6df',
    flex : 1,
    //justifyContent : 'center',
    alignSelf : 'stretch',
  },

  modalIcon : {
    alignSelf : 'flex-end',
  },

  modalText : {
    fontSize : 40,
    textAlign : 'center',
    color : 'white',
  },

  modalTextInput : {
    fontSize : 40,
    textAlign : 'center',
    padding : 20,
    borderBottomWidth : 2,
    borderEndColor : 'black',
    margin : 20,
    color : 'black',
  },

  signBgStyle : {
    backgroundColor : '#3ea832',
    paddingHorizontal : 30,
    paddingVertical : 5,
    borderRadius : 20,
    marginHorizontal : 30,
  },

  signStyle : {
    fontSize : 40,
    textAlignVertical : 'center',
    fontWeight : 'bold',
    alignSelf : 'center',
    color : 'white',
  },

});

export default HomeScreen;


