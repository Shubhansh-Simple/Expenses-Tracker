import React,{useEffect} from 'react';

// FOR NAVIGATION
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as SQLite from 'expo-sqlite';

// LOCAL
import HomeScreen         from './src/Screens/HomeScreen';
import ReadDatabaseScreen from './src/Screens/ReadDatabaseScreen';
import TransactionScreen  from './src/Screens/TransactionScreen';

import { createCredit, 
         createPocket,
         readingPocket }  from './src/database_code/starterFunction';


global.db = SQLite.openDatabase('something.db');

export default () => {

  useEffect( ()=>{
    /*
     * Execute only once
     * at the starting of app
     * CREATE TABLE IF NOT EXISTS
     */
  console.log('App.tsx useEffect')
  createPocket()
  readingPocket()
  createCredit()

  },[]) // useEffect Ends


  const Stack = createStackNavigator()

  return (
    <NavigationContainer>
  
      {/* ALL SCREENS STYLE SETTINGS */}
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

        {/* DJANGO's URLS.PY */}
        {/* Just CHANGING the sequence */}

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

        <Stack.Screen
          name='transaction'
          component={TransactionScreen}
          options={ {title:'Transactions'}}
        />

      </Stack.Navigator>

    </NavigationContainer>
  )
};



