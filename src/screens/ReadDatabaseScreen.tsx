import React, {useState} from 'react';
import { View, Text, Button } from 'react-native';


const ReadDatabaseScreen = () => {

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
    <View sytle={{ margin : 10 }}>
      <Button title='Call Query' onPress={readSQL} />
    </View>
  ) 
};

export default ReadDatabaseScreen;
