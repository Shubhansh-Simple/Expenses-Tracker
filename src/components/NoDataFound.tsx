import React,{ useEffect,useState } from 'react';

import { View, 
         Text,
         TouchableOpacity,
         StyleSheet } from 'react-native';
import { Entypo } from '@expo/vector-icons'; 

import reuseStyle      from '../Styles/reuseStyle';

const NoDataFound = ({ dataTitle, 
                       dataDescription, 
                       emojiName, 
                       emojiSize,
                       callBack,
                    })  =>  {

  return (
    <View style={ reuseStyle.keepItCenter }>
      <Entypo name={emojiName} size={emojiSize} color="black" />

      <Text style={ styles.titleStyle }>
        { dataTitle }
      </Text>

      <Text style={ styles.descriptionStyle}>
        { dataDescription }
      </Text>

      <TouchableOpacity onPress={()=>callBack()}>
        <Text style={ styles.retryBtn }>
          Retry
        </Text>
      </TouchableOpacity>
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
  retryBtn : {
    color :'#036ffc',
    fontSize : 18,
    paddingVertical : 10,
  },
});

export default NoDataFound;
 


