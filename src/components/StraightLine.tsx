/*
 * STRAIGHT LINE
 * like <hr> tag in html
 */

import React from 'react';

import { View } from 'react-native';

const StraightLine = ({ color, width })=> {
  
  return (
    <View style={{ 
      borderBottomColor : color,
      borderBottomWidth : width,
      alignSelf : 'stretch',
      }}>
    </View>

  )
};

export default StraightLine;

