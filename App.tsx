import { StatusBar } from 'expo-status-bar';
import React,{useEffect} from 'react';

// FOR NAVIGATION
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as SQLite from 'expo-sqlite';

// LOCAL
import HomeScreen         from './src/screens/HomeScreen';
import ReadDatabaseScreen from './src/screens/ReadDatabaseScreen';


global.db = SQLite.openDatabase('something2.db');


const createCredit = () => {
  /*
   * CREATING CREDIT
   * TABLE
   */

  let createCreditQuery : string = 'CREATE TABLE IF NOT EXISTS "Credit" ("id" integer NOT NULL PRIMARY KEY AUTOINCREMENT, "credit_amount" smallint unsigned NOT NULL CHECK ("credit_amount" >= 0), "credit_description" varchar(40) NOT NULL);'

  global.db.transaction( tx =>{
      tx.executeSql( 
        createCreditQuery, 
        null,
        ()=>{console.log('Successfully created credit')},
        (_,err)=>{console.log('Failed to create credit.',err)},
      )
  })

}

const insertPocket = () => {
  /*
   * INSERT DEFAULT
   * VALUE TO POCKET
   */

  let insertPocketQuery : string = 'INSERT INTO Pocket (id,currentBal) VALUES(?,?);'

  global.db.transaction( tx =>{
      tx.executeSql( 
        insertPocketQuery, 
        [1,0],
        (_,{ rows:{ _array }})=>{console.log('Data after insert ',_array)},
        (_,err)=>{console.log('Failed to insert into pocket.',err)},
      )
  })
}

const readingPocket = () => {
  /*
   * READING TABLE
   */

  let readPocketQuery : string = 'SELECT * FROM Pocket;'

  global.db.transaction( tx =>{
      tx.executeSql(
        readPocketQuery,
        null,
        (_,{ rows:{ _array }})=>
          {
            if( _array.length === 0){
              console.log('Checking data -',_array)
              insertPocket()
            }
            else{
              console.log('Table is already prepopulated - ',_array)
            }
          },
        (_,err)=>{console.log('Failed to read pocket.',err)},
      )
  })
}

const createPocket = () => {
  /*
   * CREATING TABLE
   * IF IT'S NOT
   * EXIST
   */

  let createPocketQuery : string = 'CREATE TABLE IF NOT EXISTS "Pocket" ("id" integer NOT NULL PRIMARY KEY AUTOINCREMENT, "currentBal" smallint unsigned NOT NULL CHECK ("currentBal" >= 0));' 

  global.db.transaction( tx=>{
    tx.executeSql(
      createPocketQuery,
      null,
      ()=>{console.log('Successfully Pocket Table is created.')},
      (_,err)=>{console.log('Failed to created SQL Table.',err)},
    );
  })
}


export default () => {

  useEffect( ()=>{
    /*
     * Execute only once
     * at the starting of app
     * CREATE TABLE IF NOT EXISTS
     */
 
  createPocket()
  readingPocket()
  createCredit()

  },[]) // useEffect Ends


  const Stack = createStackNavigator()

  return (
    <NavigationContainer>
  
      <Stack.Navigator screenOptions={
        {
          headerStyle : {
            backgroundColor : '#fc035e',
          },
          headerTitleAlign : 'center',
          headerTitleStyle : {
            fontSize : 22,
            color : 'white',
          }
        }
      }>

        <Stack.Screen
          name='home'
          component={HomeScreen}
          options={ {title:'Laxmi Manager'}}
        />

       <Stack.Screen
          name='reading'
          component={ReadDatabaseScreen}
          options={ {title:'Laxmi Manager'}}
        />

      </Stack.Navigator>

    </NavigationContainer>
  )
};



