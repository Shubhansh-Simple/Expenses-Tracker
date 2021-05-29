import React,{ useEffect,useState } from 'react';
import { View, 
         Text,
         TouchableOpacity,
         FlatList,
         StyleSheet } from 'react-native';

import { MaterialCommunityIcons } from '@expo/vector-icons'; 

// LOCAL
import NoDataFound          from '../components/NoDataFound';
import TransactionIcon      from '../components/Transaction/TransactionIcon';
import ActionSheet          from '../components/ActionSheet';

// DATABASE
import { credit }    from '../database_code/sqlQueries';
import queryExecutor from '../database_code/starterFunction';


const TransactionScreen = () => {

  // React STATE
  const [ creditData, setCreditData ]           = useState([]);
  const [ showDescription, setShowDescription ] = useState(false)
  const [ description, setDescription ] = useState({})

  useEffect( ()=>{
  /*
   * FIRST THING HAPPEN
   * AFTER LOADING
   * THIS SCREEN
   */

    // DATABASE SECTION STARTS
    const readingCredit = ()  =>  {
      /*
       * READING TABLE 
       */
      queryExecutor( credit.readCreditQuery,
                     null,
                     'Credit-R',
                     databaseData=>setCreditData(databaseData) 
                   )
    }

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

          {/* SHOW DESCRIPTION MODAL */}
          <ActionSheet 
            sheetTitle       ='Description for this transaction'
            sheetDescription ={ description }
            listItemColor    ='#0095ff'
            sheetData        ={[]}
            sheetVisible     ={ showDescription }
            setSheetVisible  ={ (bool:boolean)=>setShowDescription(bool) }
            sheetSelectedItem={item=>setShowDescription(false)}
          />


          <FlatList 
            data={creditData}
            keyExtractor={ item=>item.id.toString() }
            showsVerticalScrollIndicator={false}
            renderItem={(element)=>{
              return (
                <View style={styles.itemContainer}>

                  <TransactionIcon 
                    is_credit ={element.item.is_credit}
                  />
                  <View style={{ 'alignItems' : 'flex-end' }}>

                    <Text style={ styles.itemStyle }>
                      {element.item.credit_amount}Rs
                    </Text>
         
                    <TouchableOpacity onPress={ ()=>{ setShowDescription(true),
                                                      setDescription(
                                                        [element.item.credit_description]
                                                     ) 
                                              }}>
                      <MaterialCommunityIcons 
                        name="comment-eye-outline" 
                        size={24} 
                        color="black" 
                        style={{ paddingTop:5 }}
                      />
                    </TouchableOpacity>
                  </View>

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
    alignItems : 'stretch',
    marginHorizontal : 20,
    fontSize : 40,
  },

  itemContainer : {
    flexDirection : 'row',
    padding : 10,
    marginVertical : 10,
    borderWidth : 1,
    borderColor : 'black',
    borderRadius : 8,
    backgroundColor : '#ffe6b5',
    shadowColor : 'black',
    shadowOffset : { width:0, height:9 },
    shadowOpacity : 0.9,
    elevation : 9,
    shadowRadius : 2,
    justifyContent : 'space-between',
  },

  itemStyle : {
    fontSize : 17,
    fontWeight : 'bold',
  },

  itemDescription : {
    fontSize : 13,
    fontWeight : 'bold',
    textTransform : 'capitalize',

  }


});

export default TransactionScreen;
