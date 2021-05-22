/*
 * Sql Queries 
 * as per Table
 */

export const credit = {

    createCreditQuery : 'CREATE TABLE IF NOT EXISTS "Credit" ( '+
                        '"id" integer NOT NULL PRIMARY KEY AUTOINCREMENT, '+
                        '"credit_amount" smallint unsigned NOT NULL CHECK ("credit_amount" >= 0), '+
                        '"credit_description" varchar(40) NOT NULL, '+
                        '"credit_type" varchar(6) NOT NULL );',

    insertCreditQuery : 'INSERT INTO Credit( credit_amount, credit_description, credit_type ) '+
                        'VALUES(?,?,?);',
}

export const source = {
    
  createSourceQuery : 'CREATE TABLE IF NOT EXISTS "Source" ( '+
                      '"id" integer NOT NULL PRIMARY KEY AUTOINCREMENT, '+
                      '"source_name" varchar(20) NOT NULL );',

  insertSourceQuery : 'INSERT INTO Source( source_name ) VALUES(?);',

  updateSourceQuery : 'UPDATE Source SET source_name=? WHERE id=?',

  readSourceQuery   : 'SELECT * FROM SOURCE;',

  deleteSourceQuery : 'DELETE FROM SOURCE WHERE id=?;',

}

export const pocket = {

  createPocketQuery : 'CREATE TABLE IF NOT EXISTS "Pocket" '+
                      '("id" integer NOT NULL PRIMARY KEY AUTOINCREMENT, '+
                      '"currentBal" smallint unsigned NOT NULL CHECK ("currentBal" >= 0));',

  insertPocketQuery : 'INSERT INTO Pocket (id,currentBal) VALUES(?,?);',

  readPocketQuery   : 'SELECT * FROM Pocket;',

  updatePocketQuery : 'REPLACE INTO Pocket(id,currentBal) VALUES(1,?)'

}




