/*
 * Function at this file
 * runs at the starting of the 
 * application
 *
 */

import React from 'react';
import { pocket, credit } from './sqlQueries';


const queryExecutor = ( sqlQuery:string, 
                        argument : null | Array<any>, 
                        table_name='' ) => {

  global.db.transaction( (tx)=>{
    tx.executeSql(
      sqlQuery,
      argument,
      () => { 
        console.log('Success in',table_name,'table') 
      },
      (_,err) => { console.log('Failure in ',table_name,' table - ',err) }
    )
  })

};


export function createCredit(){
  // CREATING CREDIT TABLE 
  //
  queryExecutor(credit.createCreditQuery, null, 'Credit')
}


function insertPocket(){
  // INSERT DEFAULT VALUE TO POCKET 
  //
  queryExecutor( pocket.insertPocketQuery, [1,0], 'Pocket-I' )
}


export function createPocket(){
  //  CREATING TABLE IF IT'S NOT  EXIST
  //
  queryExecutor( pocket.createPocketQuery, null, 'Pocket-C' )
}


export function readingPocket(){
  /*
   * READING TABLE
   */
  queryExecutor( pocket.readPocketQuery, null, 'Pocket-R' ) 

  global.db.transaction( tx =>{
      tx.executeSql(
        pocket.readPocketQuery,
        null,
        (_,{ rows:{ _array }})=>
          {
            if( _array.length === 0){
              console.log('Checking data -',_array)
              // Calling Function
              insertPocket()
            }
            else{
              console.log('Table is already prepopulated - ',_array)
            }
          },
        (_,err)=>{console.log('Failed to read pocket.',err)},
      )
  })
}



