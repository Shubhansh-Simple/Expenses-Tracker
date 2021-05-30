/*
 * Re-usable style
 */

import { StyleSheet } from 'react-native';

export default StyleSheet.create({

  keepItCenter : {
    flex : 1,
    justifyContent : 'center',
    alignItems : 'center',
    padding : 30,
  },

  errorStyle : {
    alignSelf  : 'center',
    fontSize   :  15,
    fontWeight : 'bold',
    color      : 'red',
  },

  bgShadow : {
    shadowColor : 'black',
    shadowOffset : { width:0, height:9 },
    shadowOpacity : 0.9,
    elevation : 20,
    shadowRadius : 2,
  },

});

