import React, {useState} from 'react';
import { View, 
         Modal, 
         TouchableOpacity, 
         Text, 
         Button,
         StyleSheet } from 'react-native';

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
        <View style={{backgroundColor:'black'}}>
          <Text>Hello Modal</Text>

          <Button
            color='red'
            title='Close Modal'
            onPress={()=>{ setModalVisible(false)}}
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


