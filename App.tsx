import { StatusBar } from 'expo-status-bar';
import React from 'react';

// FOR NAVIGATION
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// LOCAL
import HomeScreen from './src/screens/HomeScreen';


const Stack = createStackNavigator()

export default () => {
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

      </Stack.Navigator>

    </NavigationContainer>
  )
};



