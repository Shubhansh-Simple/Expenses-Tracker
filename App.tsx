import React, {useEffect} from 'react';

// FOR NAVIGATION
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import * as SQLite from 'expo-sqlite';

// LOCAL
import HomeScreen         from './src/Screens/HomeScreen';
//import ReadDatabaseScreen from './src/Screens/ReadDatabaseScreen';
import TransactionScreen  from './src/Screens/TransactionScreen';
import SourceScreen  from      './src/Screens/SourceScreen';
import AboutScreen    from './src/Screens/AboutScreen';

import { createCredit, 
         createPocket,
         createSource,
         readingPocket }  from './src/database_code/starterFunction';


// DATABASE'S INSTANCE
global.db = SQLite.openDatabase('something.db');

export default () => {

  useEffect( ()=>{
    /*
     * Execute only once
     * at the starting of app
     */
    createPocket()
    readingPocket()
    createCredit()
    createSource()

  },[]) 


  const Tab   = createBottomTabNavigator()

  return (
    <NavigationContainer>
      <Tab.Navigator
        tabBarOptions={{
          
          style : {
            backgroundColor : '#393b39',
          },

          labelStyle : {
            fontSize : 13,
            textTransform : 'capitalize',
            color : 'white',
          },
        }}
	  >
        <Tab.Screen name='home'        component={ HomeScreen} />
        <Tab.Screen name='source'      component={ SourceScreen} />
        <Tab.Screen name='transaction' component={ TransactionScreen } />
        <Tab.Screen name='about'       component={ AboutScreen } />
      </Tab.Navigator>
    </NavigationContainer>
  )
};

