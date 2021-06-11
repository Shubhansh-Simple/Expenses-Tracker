import React,{ useEffect, useState, useRef } from 'react';

import { View, 
         Text,
         TouchableOpacity,
         StyleSheet } from 'react-native';

import { MaterialCommunityIcons } from '@expo/vector-icons'; 

const SegmentButton = ({ segmentIcon,
                         segmentName,
                         buttonId,
                         callBack,
                      }) => {

  return (
    <TouchableOpacity onPress={ ()=>callBack(buttonId) }>
      <View style={{ 'alignItems' : 'center' }}>

        <MaterialCommunityIcons
      	  name={segmentIcon}
          size={27}
          color='white'
          style={ styles.iconStyle }
        />

        <Text style={ styles.iconTitle }>
          {segmentName}
        </Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({

  iconTitle : {
    fontWeight : 'bold',
    fontSize : 12,
  },

  iconStyle : {
    borderRadius : 15,
    backgroundColor : '#4080ff',
  },
})


export default SegmentButton;



