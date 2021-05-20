import React, {useState,useEffect} from 'react';

import { View, 
         TouchableOpacity,
         FlatList,
         Text,
         StyleSheet } from 'react-native';

import { AntDesign } from '@expo/vector-icons'; 

import queryExecutor from '../database_code/starterFunction';
import {source}      from '../database_code/sqlQueries';

// LOCAL
import AlertComponent from '../components/AlertComponent';
import PopupInput     from '../components/PopupInput';

const SourceScreen = () => {

  const [ dataSource, setDataSource ] = useState([])
  const [ modalPopup, setModalPopup ] = useState(false)
  const [ modalAlert, setModalAlert ] = useState(false)


  function autoHide( timout:number ){
    /*
     * Auto hides the Alert Popup
     */
    setTimeout( ()=>{setModalAlert(false) }, timout )
  }

  const readingSource = () => {
    /*
  	 * READING FROM
  	 * SOURCE TABLE
  	 */

    queryExecutor( source.readSourceQuery,
                   null,
                   'Source-R',
                   databaseData=>setDataSource(databaseData) 
                 )
  }

  const insertSource = ( source_name : string ) => {

  	/*
  	 * INSERTING INTO
  	 * SOURCE TABLE
  	 */

  	queryExecutor( source.insertSourceQuery, 
				   [ source_name ],
                   'Source-I',
                   databaseData =>{ setModalAlert(true) 
                                    readingSource()
                                    autoHide(2000) }
                 )
  }

  useEffect( () => {
    /*
     * FIRST THING HAPPEN
     * AFTER LOADING
     * THIS SCREEN
     */
    readingSource()
  },[])


  return (
    <View style={{ flex:1, padding : 15, backgroundColor :'#e6e6e6'  }}>

      <FlatList 
        data={dataSource}
        keyExtractor={ item=>item.id.toString() }
        renderItem={(element)=>{
          return (
            <View style={ styles.itemContainer }>
              <Text style={ styles.itemStyle }>
                 {element.item.source_name}
              </Text>
              <AntDesign name='edit' size={34} color='green' />
              <AntDesign name='delete' size={34} color='red' />
            </View>
          )
        }}
      />

      <PopupInput 
        popupTitle='Category Name'
        popupDescription='Choose a short & meaningful name '
        popupPlaceholder='Type your name here...'
        popupVisible={modalPopup}
        setPopupVisible={ (bool:boolean)=> setModalPopup(bool) }
        submitData={ (data:string)=>insertSource(data) }
      />
     
      <AlertComponent
        alertMsg='Successfully Created!'
        alertVisible={ modalAlert }
        setAlertVisible={ (bool:boolean)=>setModalAlert(bool) }
      />

      <View style={ styles.buttonContainer }>
        <TouchableOpacity onPress={ ()=>setModalPopup(true) }>
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

  itemStyle : {
    fontSize : 20,
    textAlign : 'center',
    textAlignVertical : 'center',
  },

  itemContainer : {
    padding : 20,
    borderRadius : 20,
    backgroundColor : 'white',
    margin : 5,
    flexDirection : 'row',
    justifyContent : 'space-between',
    shadowColor : 'black',
    shadowOffset : { width:2, height:2 },
    shadowOpacity : 0.9

  },
  buttonContainer : {
    position : 'absolute',
    bottom : 0,
    paddingHorizontal : 40,
    paddingBottom: 40,
    alignSelf : 'flex-end',
  },
  
});

export default SourceScreen;











