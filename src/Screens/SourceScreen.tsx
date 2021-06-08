import React, {useState,useEffect} from 'react';

import { View, 
         TouchableOpacity,
         FlatList,
         Text,
         StyleSheet } from 'react-native';

import { MaterialCommunityIcons, AntDesign } from '@expo/vector-icons'; 

// DATABASE
import queryExecutor from '../database_code/starterFunction';
import {source}      from '../database_code/sqlQueries';

// LOCAL
import NoDataFound     from '../components/NoDataFound';
import ActionSheet    from '../components/ActionSheet';
import AlertComponent from '../components/AlertComponent';
import PopupInput     from '../components/PopupInput';


const SourceScreen = () => {

  /*****************
   * REACT'S STATE *
   *****************/

  const [ dataSource, setDataSource ] = useState([])
  const [ icon,       setIcon ]       = useState('pluscircle')

  // POPUP INPUT
  const [ modalPopup, setModalPopup ]            = useState(false)
  const [ popupDefaultTxt , setPopupDefaultTxt ] = useState('')
  const [ itemId , setItemId ] = useState(0)

  // SUCCESS POPUP'S
  const [ alertMsg, setAlertMsg ]     = useState('')
  const [ modalAlert, setModalAlert ] = useState(false)
  
  // ActionSheet for delete
  const [ actionDel , setActionDel ]         = useState(false)
  const [ actionDelData , setActionDelData ] = useState([])

  /************
   * FUNCTION *
   ***********/
  
  function autoHideMsg( msg:string, timeout:number ){
    /*
     * Auto hides the Alert Popup
     */
    readingSource()
    setAlertMsg(msg)
    setModalAlert(true)

    setTimeout( ()=>setModalAlert(false), timeout )
  }

  function Decider( data:string ){
    /*
     * ID there then UPDATE otherwise INSERT
     */
    { itemId ? updatingSource( data, itemId ) : insertSource( data ) }
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


  const updatingSource = ( source_name:string, itemId : number ) => {
    /*
  	 * UPDATING FROM
  	 * SOURCE TABLE
  	 */

    if ( itemId > 2 ){
      // Others id is 1
      //
      queryExecutor( source.updateSourceQuery,
                     [ source_name,itemId ],
                     'Source-U',
                     databaseData=>autoHideMsg('Successfully Updated',2000)
                   )
    }
  }


  const deleteSource = ( itemId:number ) => {
    /*
  	 * DELETE FROM
  	 * SOURCE TABLE
  	 */

    if ( itemId > 2 ){
      // Others id is 1
      //
      queryExecutor( source.deleteSourceQuery,
                     [ itemId ],
                     'Source-D',
                     databaseData=>autoHideMsg('Successfully Deleted',2000) 
                   )
    }
  }


  const insertSource = ( source_name : string ) => {

  	/*
  	 * INSERTING INTO
  	 * SOURCE TABLE
  	 */

  	queryExecutor( source.insertSourceQuery, 
				   [ source_name ],
                   'Source-I',
                   databaseData=>autoHideMsg('Successfully Added',2000) 
                 )
  }

  //-----------------FUNCTIONS ENDS-----------------

  useEffect( () => {
    /*
     * FIRST THING HAPPEN
     * AFTER LOADING
     * THIS SCREEN
     */
    readingSource()
  },[])

  return (
    <View style={{flex : 1}}>

      {/* CONDITIONAL CODE */}
      { dataSource.length === 2 
          ?
      <NoDataFound 
          dataTitle='No Sources Found !'
          dataDescription='Kindly add some sources first'
          emojiName='emoji-neutral'
          emojiSize={84}
          callBack={()=>readingSource() }
      />
          :
      <View style={ styles.screenContainer }>

        <FlatList 
          data={ dataSource.slice(1,dataSource.length-1) }
          keyExtractor={ item=>item.id.toString() }
          renderItem={(element)=>{

            return (
              <View style={ styles.itemContainer }>

                <View style={{ flex : 10,}}>

                  <TouchableOpacity onPress={ ()=>{ 
                    setItemId( element.item.id )
                    setPopupDefaultTxt( element.item.source_name )
                    setModalPopup(true) 
                  }}>
                    <Text style={ styles.itemStyle }>
                       {element.item.source_name}
                    </Text>
                  </TouchableOpacity>

                </View>

                <View style={ styles.iconContainer }>
                  <TouchableOpacity onPress={()=>
                    { setActionDelData(
                        [{ 
                            source_name :'Delete '+ element.item.source_name,
                            id          : element.item.id 
                        }]
                      )
                      setActionDel( true )
                    }
                  }>
                    <MaterialCommunityIcons 
                      name='delete' 
                      size={24} 
                      color='red' />
                  </TouchableOpacity>
                </View>

              </View>
            )
          }}
        />

        </View>
      }
        
      {/* INPUT COMPONENT */}
      <PopupInput 
        popupTitle       = 'Category Name'
        popupDescription = 'Choose a short & meaningful name '
        popupPlaceholder = 'Type your name here...'
        //
        defaulty         = {popupDefaultTxt}
        //
        popupVisible     = {modalPopup}
        setPopupVisible  = { (bool:boolean)=> { setModalPopup(bool)
                                                setIcon('pluscircle')
                           }}

        submitData       = { (data:string)=>Decider(data) }

      />
      
      {/* MSG COMPONENT */}
      <AlertComponent
        alertMsg        = { alertMsg }
        alertVisible    = { modalAlert }
        setAlertVisible = { (bool:boolean)=>setModalAlert(bool) }
      />

      {/* CHOICE COMPONENT */}
      <ActionSheet 
        sheetTitle         = 'Are You Sure ?'
        sheetDescription   = 'You cant undo this action'
        listItemColor      = 'red'
        sheetData          = { actionDelData }
        sheetVisible       = { actionDel }
        setSheetVisible    = { (bool:boolean)=>setActionDel(bool) }
        sheetSelectedItem  = { itemId=>deleteSource( itemId.id ) }
      />

        <View style={ styles.buttonContainer }>
          <TouchableOpacity onPress={ ()=>{ 
                                       setIcon('closecircle')
                                       setPopupDefaultTxt('') 
                                       setItemId(0)
                                       setModalPopup(true) 
                                     }}>
            <AntDesign name={icon} size={60} color="#fc035e" />

          </TouchableOpacity>
        </View>

      </View>
  )
};

const styles = StyleSheet.create({

  screenContainer : { 
    flex:1, 
    padding : 15, 
    backgroundColor :'#e6e6e6'  
  },

  itemStyle : {
    fontSize : 20,
    textAlign : 'center',
    color : '#1d6cf5',
    textAlignVertical : 'center',
  },

  itemContainer : {
    padding : 10,
    paddingVertical : 10,
    borderRadius : 20,
    backgroundColor : 'white',
    margin : 5,
    flexDirection : 'row',
    justifyContent : 'space-around',
    shadowColor : 'black',
    shadowOffset : { width:0, height:9 },
    shadowOpacity : 0.9,
    elevation : 9,
    shadowRadius : 2,
  },

  iconContainer : {
    flex : 1, 
    padding : 5,
    borderRadius : 10,
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











