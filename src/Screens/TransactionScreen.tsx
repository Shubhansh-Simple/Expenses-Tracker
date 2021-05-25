import React,{ useEffect,useState } from 'react';
import { View, 
         Text,
         FlatList,
         StyleSheet } from 'react-native';

import NoDataFound     from '../components/NoDataFound';
//import ButtonSection from '../components/ButtonSection';
import { credit }    from '../database_code/sqlQueries';
import queryExecutor from '../database_code/starterFunction';


const TransactionScreen = () => {

  // React STATE
  const [ creditData, setCreditData ] = useState([]);


  // DATABASE SECTION STARTS
  const readingCredit = ()  =>  {
    /*
     * READING TABLE 
     */
    queryExecutor( credit.readCreditQuery,
                   null,
                   'Credit-R',
                   databaseData => {setCreditData(databaseData)
                     console.log('The data - ',creditData)
                    }
                 )
  }


  useEffect( ()=>{
  /*
   * FIRST THING HAPPEN
   * AFTER LOADING
   * THIS SCREEN
   */
    console.log('Inside useEffect of transaction.')
    readingCredit()
  },[])

  return (
    <View style={{ flex : 1}}>

      {/* CONDITIONAL CODE */}
      { creditData.length === 0 
          ?
        <NoDataFound 
          dataTitle='No Transaction Found !'
          dataDescription='Kindly add some data first'
          emojiName='emoji-sad' 
          emojiSize={84}
        />
          :
        <View style={ styles.homeStyle }>
          <Text style={{ fontSize : 20, textAlign : 'center'}}>
            All records
          </Text>
          <FlatList 
            data={creditData}
            keyExtractor={ item=>item.id.toString() }
            renderItem={(element)=>{
              return (
                <View style={ styles.itemContainer }>
                  <Text style={ styles.itemStyle }>
                    Amount - {element.item.credit_amount}
                  </Text>
                  <Text style={ styles.itemStyle }>
                    Description - {element.item.credit_description}
                  </Text>
                  <Text style={ styles.itemStyle }>
                    Type - {element.item.credit_type}
                  </Text>
                </View>
              )
            }}
          />
        </View>
      }
    </View>
  )  
};

const styles = StyleSheet.create({

  homeStyle : {
    flex : 1,
    alignItems : 'center',
    justifyContent : 'center',
    backgroundColor : 'white',
    fontSize : 40,
  },

  itemContainer : {
    padding : 10,
    marginVertical : 10,
    marginHorizontal : 20,
    borderWidth : 1,
    borderRadius : 8,
    shadowColor : 'black',
    shadowOffset : { width:2, height:2 },
    shadowOpacity : 0.9
  },

  itemStyle : {
    fontSize : 15,
    fontWeight : 'bold',
    textTransform : 'capitalize',
    marginVertical : 5,
  },


});

export default TransactionScreen;
