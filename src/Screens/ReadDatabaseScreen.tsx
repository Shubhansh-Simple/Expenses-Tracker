import React, {useState} from 'react';
import { View,
         Text,
         Modal,
         Button,
         TouchableOpacity,
         TouchableWithoutFeedback,
         FlatList,
         StyleSheet } from 'react-native';

import { Entypo } from '@expo/vector-icons';

const ReadDatabaseScreen = () => {
  

  const [ modal, setModal ] = useState(false)
  const [ dropDown, setDropDown ] = useState('Select a value')

  const flatData = [
    { title : 'One' },
    { title : 'Two' },
    { title : 'Three' },
  ]

  const readSQL = () => {
    global.db.transaction( tx => {
      tx.executeSql('SELECT * FROM Pocket;',
                    null,
                    (_,{ rows:{ _array }})=>{console.log('Data is ',_array)},
                    ()=>{console.log('Failed to read Pocket')}
        )
    })  
  }

  return (
    <View style={{ margin:10,padding:20, alignItems:'center' }}>

      <Text style={ styles.textStyle }>
        It's just an extra screen for practice
      </Text>

      <Button title='Call Query' onPress={readSQL} />

      <TouchableOpacity onPress={()=>{setModal(true)} }>
        <View style={{ flexDirection:'row',padding : 20 }}>
          <Text style={{ fontSize : 20 }}>{ dropDown }</Text>
          <Entypo name='arrow-down' size={30} style={{ textAlignVertical : 'center'}} />
        </View>
      </TouchableOpacity>

     <Modal
        visible={modal}
        animationType='fade'
        transparent={true}
        onRequestClose={()=>{ setModal(false) }}
      >
       <View style={{ flex:1,backgroundColor:'rgba(52,52,52,0.9)'}}></View>
     </Modal>


      <Modal
        visible={modal}
        animationType='slide'
        transparent={true}
        onRequestClose={()=>{ setModal(false) }}
      >
        <View style={ styles.modalContainer }>
        
          <View style={{
            backgroundColor : 'white',
            borderRadius : 20,
          }}>

            <View style={ styles.modalHeader }>
              <Text style={{ fontSize : 16, fontWeight : 'bold'}}>
                Choose a option below 
              </Text>
            </View>

            <View style={ styles.modalBody }>
              <Text style={ styles.flatListItem }>
                Select an item
              </Text>

              <FlatList 
                data={ flatData }
                keyExtractor={ item=>item.title }
                renderItem={(element)=>{
                  return (
                    <TouchableOpacity onPress={ ()=>{ 
                        console.log( 'I hope so - ',element.item.title.toLowerCase() )
                        setDropDown( element.item.title.toLowerCase() )
                        setModal(false)
                      }}>
                      <Text style={ styles.flatListItem }>
                        {element.item.title}
                      </Text>
                    </TouchableOpacity>
                  )
                }}
              />

            </View>

          </View> 

          <TouchableWithoutFeedback onPress={()=>{ setModal(false)  }}>
            <View style={ styles.modalCancelButton }>
              <Text style={ styles.modalCancelButtonText }>
                Cancel
              </Text>
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
    padding : 20,
  },

  modalHeader : {
    alignItems : 'center',
    padding : 10,
  },

  modalBody : { 
    alignItems : 'center',
    paddingBottom : 20,
  },

  flatListItem : {
    fontSize : 18,
    color:'#496ae3',
    alignSelf : 'stretch',
    padding:10,
    textAlign : 'center',
  },

  modalCancelButton : {
    backgroundColor : 'white',
    alignItems : 'center',
    marginVertical : 10,
    borderRadius : 20,
  },

  modalCancelButtonText : {
    fontSize : 18,
    fontWeight:'bold',
    color:'red',
    padding:10 
  },

  textStyle : {
    fontSize : 20,
    padding : 20,
  },

});

export default ReadDatabaseScreen;
