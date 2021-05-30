/*
 * FILE FOR CLEAN CODE
 * -------------------- 
 * Function at this file
 * runs at the starting of the 
 * application
 */

import React from 'react';
import { pocket, credit, source } from './sqlQueries';


const queryExecutor = ( sqlQuery:string, 
                        argument : null | Array<any>, 
                        table_name='',
                        callBack
                      ) => {
  /*
   * DECLARE ONCE
   * CALL ANYWHERE
   */

  global.db.transaction( (tx)=>
    {
      tx.executeSql(
        sqlQuery,
        argument,
        ( _,{ rows: { _array } } ) => 
          { 
            console.log('Success in',table_name,'table') 
            callBack( _array )
          },
        (_,err) => { console.log('Failure in ',table_name,' table - ',err) }
      )
    })
};

/*
 * CREDIT TABLE SECTION
 */

export function createCredit(){
  /* CREATING CREDIT TABLE */

  queryExecutor( credit.createCreditQuery,  
                 null, 
                 'Credit-C', 
                 (yo1)=>{} 
               )
}

/*
 * POCKET TABLE SECTION
 */


function insertPocket(){
  /* INSERT DEFAULT VALUE TO SOURCE
   * 
   * IGNORE - we mention 'UNIQUE' source_name in table 
   *          if it's exist then it's violates database since
   *          that makes query ignored.
   */

  queryExecutor( 'INSERT or IGNORE' + pocket.insertPocketQuery.slice(6), 
                 [1,0,0,0],  
                 'Pocket-I',
                 (yo1)=>{}
               )
}

export function createPocket(){
  /* CREATING POCKET TABLE */

  queryExecutor( pocket.createPocketQuery,  
                 null,
                 'Pocket-C',
                 (yo1)=>{ insertPocket() }
               )
}


/*
 * SOURCE TABLE SECTION
 */


function insertSource(){
  /* INSERT DEFAULT VALUE TO SOURCE
   * 
   * IGNORE - we mention 'UNIQUE' source_name in table 
   *          if it's exist then it's violates database since
   *          that makes query ignored.
   */

  queryExecutor( 'INSERT or IGNORE'+ source.insertSourceQuery.slice(6),
                 ['Others'],  
                 'Source-I',
                 (yo1)=>{}
               )
}

export function createSource(){
  /* CREATE TABLE IF NOT EXIST */

  queryExecutor( source.createSourceQuery, 
                  null, 
                  'Source-C',
                  (yo1)=>{ insertSource() }
                )
}


export default queryExecutor;








