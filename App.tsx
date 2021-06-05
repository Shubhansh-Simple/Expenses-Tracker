import React, {useEffect} from 'react';

// FOR NAVIGATION
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import * as SQLite from 'expo-sqlite';

// LOCAL
import HomeScreen         from './src/Screens/HomeScreen';
import TransactionScreen  from './src/Screens/TransactionScreen';
import SourceScreen  from      './src/Screens/SourceScreen';
import AboutScreen    from './src/Screens/AboutScreen';

import { createCredit, 
         createPocket,
         createSource,
         readingPocket }  from './src/database_code/starterFunction';


// DATABASE'S INSTANCE
global.db = SQLite.openDatabase('something.db');


const HomeStack = createStackNavigator();

function HomeStackScreen(){
  return (
    <HomeStack.Navigator
      screenOptions={{ headerTitleAlign : 'center', 
                       headerStyle : { height : 60},
                    }}
    >
      <HomeStack.Screen 
        name='Home' 
        component={HomeScreen} />
    </HomeStack.Navigator>
  )
}

const TransactionStack = createStackNavigator();

function TransactionStackScreen(){
  return (
    <TransactionStack.Navigator 
      screenOptions={{ headerTitleAlign : 'center', 
                       headerStyle : { height : 60},
                       title : 'Transactions'

                    }}
    >
      <TransactionStack.Screen 
        name='Transactions' 
        component={TransactionScreen} />
    </TransactionStack.Navigator>
  )
}

const SourceStack = createStackNavigator();

function SourceStackScreen(){
  return (
    <SourceStack.Navigator
      screenOptions={{ headerTitleAlign : 'center', 
                       headerStyle : { height : 60},
                       title : 'Source Lists'
                    }}
      
    >
      <SourceStack.Screen name='Source' component={SourceScreen} />
    </SourceStack.Navigator>
  )
}

const AboutStack = createStackNavigator();

function AboutStackScreen(){
  return (
    <AboutStack.Navigator
      screenOptions={{ headerTitleAlign : 'center', 
                       headerStyle : { height : 60},
                       title : 'Programmer Section',
                    
                    }}
    >
      <AboutStack.Screen name='Programmer' component={AboutScreen} />
    </AboutStack.Navigator>
  )
}

const Tab   = createBottomTabNavigator()


export default () => {

  useEffect( ()=>{
    /*
     * Execute only once
     * at the starting of app
     */
    createPocket()
    createCredit()
    createSource()

  },[]) 



  return (
    <NavigationContainer>
      <Tab.Navigator
        tabBarOptions={{
          activeTintColor : 'tomato',
          inactiveTintColor : 'gray',
          
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
        <Tab.Screen name='transaction' component={ TransactionStackScreen } />
        <Tab.Screen name='home'        component={ HomeStackScreen } />
        <Tab.Screen name='source'      component={ SourceStackScreen } />
        <Tab.Screen name='about'       component={ AboutStackScreen } />
      </Tab.Navigator>
    </NavigationContainer>
  )
};

