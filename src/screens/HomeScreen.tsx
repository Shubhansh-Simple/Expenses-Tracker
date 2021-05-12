import React, {useState,useEffect} from 'react';

import { View, 
         Text,
         Button,
         StyleSheet } from 'react-native';

// 3rd Party
import DropdownMenu from 'react-native-dropdown-menu';

// LOCAL
import ButtonSection  from '../components/ButtonSection';
import ModalComponent from '../components/ModalComponent';

import { pocket,credit } from '../database_code/sqlQueries';
import queryExecutor     from '../database_code/starterFunction';


const HomeScreen = ({navigation}) => {

  // REACT STATE 
  const [ currentBal, setCurrentBal ]     = useState(0);

  // MODAL's STATE
  const [ modalCreditVisible, setModalCreditVisible ] = useState(false);
  const [ modalDebitVisible,  setModalDebitVisible  ] = useState(false);


  // DATABASE SECTION STARTS
  const readingPocket = () => {
    /*
     * READING Pocket
     * table
     */
    
    queryExecutor( pocket.readPocketQuery+' WHERE id=1',
                   null,
                   'Pocket-R',
                   ( databaseData )=>{ setCurrentBal(databaseData[0].currentBal) }
                 )
  }

  const insertCredit = ( credit_amount : number,  
                         credit_description : string ) => {
    /*
     * INSERTING INTO
     * CREDIT TABLE
     */
    queryExecutor( credit.insertCreditQuery,
                   [credit_amount,credit_description],
                   'Credit-I',
                   ( databaseData )=>{ incrementPocket( credit_amount ) }
                 )
  }


  const incrementPocket = ( valueAdd : number ) => {
    /*
     * ADDING balance to 
     * current balance
     */
    queryExecutor( pocket.updatePocketQuery,
                   [currentBal + valueAdd],
                   'Pocket-U',
                   ( databaseData )=>{ 
                         setCurrentBal( currentBal + valueAdd )
                         console.log('Updated data successfully.'),
                         setModalCreditVisible(false)
                   }
                 )
  }

  // DATABASE SECTION ENDS 

  useEffect( ()=>{
  /*
   * FIRST THING HAPPEN
   * AFTER LOADING
   * THIS SCREEN
   */
    console.log('Inside useEffect of home.')
    readingPocket()
  },[])


  return (
    <View style={styles.homeStyle} >

      <ModalComponent
        submitBtnText='Credit'
        modalTitle='Add Credit'
        submitBtnColor='#34b518'
        modalVisible={modalCreditVisible}
        setModalVisible={ (bool:boolean)=>{ setModalCreditVisible(bool) }}
        submitData={ (data1,data2)=>{ insertCredit(+data1,data2) } }
      />

      <ModalComponent
        submitBtnText='Debit'
        modalTitle='Add Expense'
        submitBtnColor='red'
        modalVisible={modalDebitVisible}
        setModalVisible={ (bool:boolean)=>{ setModalDebitVisible(bool) }}
        submitData={ (data1,data2)=>{ console.log('Parent get data - ',data1,data2)} }
      />

      {/* MAIN BUTTON SECTION STARTS */}
      
      <View style={ styles.mainButtonContainer }>

        <ButtonSection 
          btnColor='#3ea832' 
          btnText='+' 
          callModal={(bool : boolean )=>{ setModalCreditVisible(bool) }} 
        />

        <ButtonSection 
          btnColor='#ff0022' 
          btnText='-' 
          callModal={(bool : boolean )=>{ setModalDebitVisible(bool) }} 
        />

        <ButtonSection 
          btnColor='black' 
          btnText='$' 
          callModal={(bool : boolean )=>{ navigation.navigate('transaction') }} 
        />
      </View>

      {/* MAIN BUTTON SECTION ENDS */}

 
      {/*<DropdownMenu 
        data={['Python','Ruby','Perl']}
      />*/}
      

      <Button title='Navigate' 
              onPress={ ()=>{ navigation.navigate('reading') }} />

      <View style={ styles.currentBalParentContainer }>

        <View style={ styles.currentBalContainer }>
          <Text style={ styles.currentBalStyle }> Cash </Text>
          <Text style={ styles.currentBalStyle }> {currentBal} Rs </Text>
        </View>

        <View style={ styles.currentBalContainer }>
          <Text style={ styles.currentBalStyle }> Online </Text>
          <Text style={ styles.currentBalStyle }> {currentBal} Rs </Text>
        </View>   

        <View style={ styles.currentBalContainer }>
          <Text style={ styles.currentBalStyle }> Total Balance </Text>
          <Text style={ styles.currentBalStyle }> {currentBal} Rs </Text>
        </View>

      </View>

    </View>
  )
};

const styles = StyleSheet.create({

  homeStyle : {
    flex : 1,
    alignItems : 'center',
    justifyContent : 'center',
    backgroundColor : 'white',
  },

  currentBalParentContainer : { 
    backgroundColor:'#ede5ce', 
    borderRadius : 20,
    marginVertical : 10,
    alignSelf : 'stretch'
  },

  currentBalContainer : {
    alignSelf : 'stretch',
    flexDirection : 'row',
    justifyContent : 'space-between',
  },
  
  currentBalStyle : {
    padding : 15,
    fontSize : 20,
    textAlignVertical : 'center',
    fontStyle : 'italic',
    textAlign : 'center',
  },

  mainButtonContainer : {
    flexDirection:'row',
    alignItems:'stretch',
    margin : 30
  },

});

export default HomeScreen;


