import React, {useState} from 'react';
import { View,
         Text,
         Modal,
         Button,
         TouchableOpacity,
         FlatList,
         StyleSheet } from 'react-native';

const ReadDatabaseScreen = () => {
  

  const [ modal, setModal ] = useState(false)

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
    <View style={{ margin:10,padding:20 }}>

      <Text style={ styles.textStyle }>
        It's just an extra screen for practice
      </Text>

      <Button title='Call Query' onPress={readSQL} />

      <Button 
        title='Call Modal' 
        color='black'
        onPress={ ()=>{setModal(true)} }
      />

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
              <Text style={{ fontSize : 15, fontWeight : 'bold'}}>
                Which one you like ? 
              </Text>
            </View>

            <View style={ styles.modalBody }>
              <Text style={ styles.flatListItem }>
                Select an item
              </Text>

              <FlatList 
                data={ flatData }
                renderItem={(element)=>{
                  return (
                    <TouchableOpacity onPress={ ()=>{ 
                        console.log( 'I hope so - ',element.item.title.toLowerCase() )
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

          <View style={ styles.modalCancelButton }>
            <TouchableOpacity onPress={()=>{ setModal(false)  }}>
              <Text style={ styles.modalCancelButtonText }>
                Cancel
              </Text>
            </TouchableOpacity>
          </View>

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
    padding:10 
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
