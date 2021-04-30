import { StatusBar } from 'expo-status-bar';
import React,{useEffect} from 'react';

// FOR NAVIGATION
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as SQLite from 'expo-sqlite';

// LOCAL
import HomeScreen from './src/screens/HomeScreen';
import ReadDatabaseScreen from './src/screens/ReadDatabaseScreen';


global.db = SQLite.openDatabase('database.db');
const Stack = createStackNavigator()

export default () => {

  useEffect( ()=>{
    /*
     * Execute only once
     * at the starting of app
     * CREATE TABLE IF NOT EXISTS
     * 
     * */

   let createTableQuery : string = 'CREATE TABLE IF NOT EXISTS "Pocket" ("id" integer NOT NULL PRIMARY KEY AUTOINCREMENT, "currentBal" smallint unsigned NOT NULL CHECK ("currentBal" >= 0));' 

    global.db.transaction( tx=>{
      tx.executeSql(
        createTableQuery,
        null,
        ()=>{console.log('SQL Table created successfully.')},
        ()=>{console.log('Failed to created SQL Table.')},
      )
    }) 
  },[])

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



