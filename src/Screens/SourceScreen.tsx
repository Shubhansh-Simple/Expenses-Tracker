import React, {useState} from 'react';

import { View, 
         Text,
         TouchableOpacity,
         ScrollView,
         StyleSheet } from 'react-native';

import { Entypo } from '@expo/vector-icons'; 

// LOCAL
import AlertComponent from '../components/AlertComponent';

const SourceScreen = () => {

  const [ modalAlert, setModalAlert ] = useState(false)

  function autoHide( timout:number ){
    setTimeout( ()=>{setModalAlert(false) }, timout )
  }

  return (
    <View style={{ flex:1 }}>
      
      <AlertComponent
        alertMsg='Successfully Created!'
        alertVisible={ modalAlert }
        setAlertVisible={ (bool:boolean)=>setModalAlert(bool) }
      />

      <View style={ styles.buttonContainer }>
        <TouchableOpacity onPress={ ()=>{ setModalAlert(true)
                                          autoHide(2000) }
        }>
          <Entypo 
            name="circle-with-plus" 
            size={80} 
            color="#fc035e" 
          />
        </TouchableOpacity>
      </View>
    </View>
  )

};

const styles = StyleSheet.create({
  buttonContainer : {
    position : 'absolute',
    bottom : 0,
    paddingHorizontal : 40,
    paddingBottom: 40,
    alignSelf : 'flex-end',
  },
  
});

export default SourceScreen;











