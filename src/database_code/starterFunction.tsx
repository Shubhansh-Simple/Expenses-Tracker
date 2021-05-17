/*
 * FILE FOR CLEAN CODE
 * -------------------- 
 * Function at this file
 * runs at the starting of the 
 * application
 */

import React from 'react';
import { pocket, credit } from './sqlQueries';


const queryExecutor = ( sqlQuery:string, 
                        argument : null | Array<any>, 
                        table_name='',
                        callBack
                      ) => {
  /*
   * DECLARE ONCE
   * CALL ANYWHERE
   */

  global.db.transaction( (tx)=>{
    tx.executeSql(
      sqlQuery,
      argument,
      ( _,{rows:{_array}} ) => { 
        console.log('Success in',table_name,'table') 
        callBack( _array )
      },
      (_,err) => { console.log('Failure in ',table_name,' table - ',err) }
    )
  })

};

export function createCredit(){
  // CREATING CREDIT TABLE 
  //
  queryExecutor( credit.createCreditQuery,  
                 null, 
                 'Credit-C', 
                 (yo1)=>{} 
               )
}

export function createPocket(){
  //  CREATING TABLE IF IT'S NOT  EXIST
  //
  queryExecutor( pocket.createPocketQuery,  
                 null,
                 'Pocket-C',
                 (yo1)=>{}
               )
}

function insertPocket(){
  // INSERT DEFAULT VALUE TO POCKET 
  //
  queryExecutor( pocket.insertPocketQuery, 
                 [1,0],  
                 'Pocket-I',
                 (yo1)=>{}
               )
}

function readingPocketHelper( data ){
  /*
   * callBack FUNCTION
   */

  console.log('Data through magic - ',data)
  
  if( data.length === 0){
    console.log('Checking data -',data)
    insertPocket() // FOR VERY FIRST TIME APP OPEN
  }
  else{
    console.log('Table is already prepopulated - ',data)
  }
}

export function readingPocket(){
  // It's just a test 
  //
  queryExecutor( pocket.readPocketQuery, null, 'Pocket-R', readingPocketHelper )
}


export default queryExecutor;








