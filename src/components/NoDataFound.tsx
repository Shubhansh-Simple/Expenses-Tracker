import React,{ useEffect,useState } from 'react';

import { View, 
         Text,
         StyleSheet } from 'react-native';
import { Entypo } from '@expo/vector-icons'; 

import reuseStyle      from '../Styles/reuseStyle';

const NoDataFound = ({dataTitle, dataDescription })  =>  {

  return (
    <View style={ reuseStyle.keepItCenter }>
      <Entypo name="emoji-sad" size={84} color="black" />

      <Text style={ styles.titleStyle }>
        { dataTitle }
      </Text>

      <Text style={ styles.descriptionStyle}>
        { dataDescription }
      </Text>
    </View>
  )
};

const styles = StyleSheet.create({
  titleStyle :{
    fontSize : 20,
    fontWeight : 'bold',
    paddingTop : 20,
  },
  descriptionStyle : {
    fontSize : 14,
  },
});

export default NoDataFound;
 


