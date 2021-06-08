import React from 'react';

import { View, 
         Text,
         StyleSheet } from 'react-native';

import { MaterialCommunityIcons } from '@expo/vector-icons'; 

const TransactionIcon = ({ is_credit, source_name }) =>{

  return (
    <View>
      <View style={{ flexDirection : 'row' }}>

        <MaterialCommunityIcons 
                    name={ is_credit 
                             ? 
                           'account-arrow-left'
                             : 
                           'account-arrow-right' }
                    color={ is_credit 
                              ? 
                            '#239964' 
                              : 
                            '#eb3d5d'}
                    size={40}  
                    style={{ padding : 5}}
        />

        <View style={{ paddingVertical : 4 }}>
          <Text style={{ fontSize : 15 }}>
            { is_credit ? 'Recieved From' : 'Debit From' }
          </Text>
          <Text style={{ fontWeight : 'bold' }}>
            {source_name}
          </Text>
        </View>

      </View>
      <Text style={ styles.timeStyle }>
        3 hours ago
      </Text>

    </View>
  )
};

const styles = StyleSheet.create({

  timeStyle : { 
    fontSize : 12,
    color : '#889991',
    paddingHorizontal : 5 
  },

});

export default TransactionIcon;


