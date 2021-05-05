import React,{ useEffect,useState } from 'react';
import { View, 
         Text,
         FlatList,
         StyleSheet } from 'react-native';

import ButtonSection from '../components/ButtonSection';


const TransactionScreen = () => {

  // React STATE
  const [ data, setData ] = useState([]);

  const readingCredit = () => {
    /*
     * READING TABLE
     */
  
    let readCreditQuery : string = 'SELECT * FROM Credit;'
  
    global.db.transaction( tx =>{
        tx.executeSql(
          readCreditQuery,
          null,
          (_,{ rows:{ _array }})=>
            {
              if( _array.length === 0){
                console.log('Checking data -',_array)
                // Calling Function
                console.log('No data found.')
              }
              else{
                console.log('Data we read from credit - ',_array)
                setData(_array)
              }
            },
          (_,err)=>{console.log('Failed to read pocket.',err)},
        )
    })
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
    <View style={ styles.homeStyle }>

      <FlatList 
        data={data}
        keyExtractor={ item=>item.id.toString() }
        renderItem={(element)=>{
          return (
            <View style={ styles.itemContainer }>
              <Text style={ styles.itemStyle }>{element.item.credit_amount}</Text>
              <Text style={ styles.itemStyle }>{element.item.credit_description}</Text>
            </View>
          )
        }}
      />

      <Text>No Data Found.</Text>
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
