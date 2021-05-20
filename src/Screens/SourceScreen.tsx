import React, {useState} from 'react';

import { View, 
         Text,
         TouchableOpacity,
         ScrollView,
         StyleSheet } from 'react-native';

import { AntDesign } from '@expo/vector-icons'; 

// LOCAL
import AlertComponent from '../components/AlertComponent';
import PopupInput     from '../components/PopupInput';

const SourceScreen = () => {


  const [ modalPopup, setModalPopup ] = useState(false)
  const [ modalAlert, setModalAlert ] = useState(false)

  function autoHide( timout:number ){
    setTimeout( ()=>{setModalAlert(false) }, timout )
  }

  return (
    <View style={{ flex:1 }}>

      <PopupInput 
        popupTitle='Category Name'
        popupDescription='Choose a short & meaningful name '
        popupPlaceholder='Type your name here...'
        popupVisible={modalPopup}
        setPopupVisible={ (bool:boolean)=> setModalPopup(bool) }
      />
     
      <AlertComponent
        alertMsg='Successfully Created!'
        alertVisible={ modalAlert }
        setAlertVisible={ (bool:boolean)=>setModalAlert(bool) }
      />

      <View style={ styles.buttonContainer }>
        <TouchableOpacity onPress={ ()=>{ setModalPopup(true)
                                          autoHide(2000) 
                                        }
        }>
          <AntDesign 
            name="pluscircle" 
            size={60} 
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











