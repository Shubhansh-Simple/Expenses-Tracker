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
import ActionSheet    from '../components/ActionSheet';
import AlertComponent from '../components/AlertComponent';
import PopupInput     from '../components/PopupInput';


const SourceScreen = () => {

  const [ dataSource, setDataSource ] = useState([])

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

  //-----------------FUNCTIONS STARTS-----------------
  
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

    queryExecutor( source.updateSourceQuery,
                   [ source_name,itemId ],
                   'Source-U',
                   databaseData=>autoHideMsg('Successfully Updated',2000)
                 )
  }


  const deleteSource = ( itemId:number ) => {
    /*
  	 * DELETE FROM
  	 * SOURCE TABLE
  	 */

    queryExecutor( source.deleteSourceQuery,
                   [ itemId ],
                   'Source-D',
                   databaseData=>autoHideMsg('Successfully Deleted',2000) 
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
    <View style={{ flex:1, padding : 15, backgroundColor :'#e6e6e6'  }}>

      <FlatList 
        data={dataSource}
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
                          title :'Delete '+ element.item.source_name,
                          id : element.item.id 
                      }]
                    ) 
                    setActionDel( true )
                  }
                }>

                  <MaterialCommunityIcons name='delete' size={24} color='white' />
                </TouchableOpacity>
              </View>

            </View>
          )
        }}
      />
      
      {/* INPUT COMPONENT */}
      <PopupInput 
        popupTitle       = 'Category Name'
        popupDescription = 'Choose a short & meaningful name '
        popupPlaceholder = 'Type your name here...'
        //
        defaulty         = {popupDefaultTxt}
        //
        popupVisible     = {modalPopup}
        setPopupVisible  = { (bool:boolean) => setModalPopup(bool) }

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
        sheetDescription   = ''
        listItemColor      =  'red'
        sheetData          = { actionDelData }
        sheetVisible       = { actionDel }
        setSheetVisible    = { (bool:boolean)=>setActionDel(bool) }
        sheetSelectedItem  = { itemId=>deleteSource( +itemId ) }
      />

      <View style={ styles.buttonContainer }>
        <TouchableOpacity onPress={ ()=>{ setPopupDefaultTxt('') 
                                          setItemId(0)
                                          setModalPopup(true) }
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
    shadowOffset : { width:2, height:2 },
    shadowOpacity : 0.9

  },

  iconContainer : {
    flex : 1, 
    backgroundColor : 'red',
    padding : 4,
    paddingVertical : 6,
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











