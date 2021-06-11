/*
 * Sql Queries 
 * as per Table
 */

export const credit = {

    createCreditQuery : 'CREATE TABLE IF NOT EXISTS "Credit" ( '+
                        '"id" integer NOT NULL PRIMARY KEY AUTOINCREMENT, '+
                        '"credit_amount" integer unsigned NOT NULL CHECK ("credit_amount" >= 0), '+
                        '"credit_description" varchar(40) NOT NULL, '+
                        '"credit_type" varchar(6) NOT NULL, '+
                        '"is_credit" bool NOT NULL, '+
                        '"remain_bal" integer unsigned NOT NULL CHECK ("remain_bal" >= 0), '+
                        '"source_name_id" integer NOT NULL REFERENCES "Source" ("id") DEFERRABLE INITIALLY DEFERRED);',

    insertCreditQuery : 'INSERT INTO Credit( credit_amount, credit_description, credit_type, is_credit, remain_bal, source_name_id ) '+
                        'VALUES(?,?,?,?,?,?);',

    deleteCreditQuery : 'DELETE FROM CREDIT WHERE id=?;',

    // JOINING TABLE
    readCreditQuery   : 'SELECT CREDIT.ID,credit_amount,credit_description,'+
                        'credit_type,is_credit,remain_bal,source_name '+
                        'FROM CREDIT JOIN SOURCE ON '+
                        'CREDIT.source_name_id=SOURCE.id WHERE is_credit!=',
    addOrdering       : ' ORDER BY CREDIT.ID DESC',
}

export const source = {
    
  createSourceQuery : 'CREATE TABLE IF NOT EXISTS "Source" ( '+
                      '"id" integer NOT NULL PRIMARY KEY AUTOINCREMENT, '+
                      '"source_name" varchar(20) NOT NULL UNIQUE );',

  insertSourceQuery : 'INSERT INTO Source( source_name ) VALUES(?);',

  updateSourceQuery : 'UPDATE Source SET source_name=? WHERE id=?;',

  readSourceQuery   : 'SELECT * FROM SOURCE ORDER BY id DESC;',

  deleteSourceQuery : 'DELETE FROM SOURCE WHERE id=?;',

}

export const pocket = {

  createPocketQuery : 'CREATE TABLE IF NOT EXISTS "Pocket" '+
                      '("id" integer NOT NULL PRIMARY KEY AUTOINCREMENT, '+
                      '"currentBal" integer unsigned NOT NULL CHECK ("currentBal" >= 0), '+
                      '"cashBal" integer unsigned NOT NULL CHECK ("cashBal" >= 0), '+
                      '"onlineBal" integer unsigned NOT NULL CHECK ("onlineBal" >= 0) );',

  insertPocketQuery : 'INSERT INTO Pocket ( id, currentBal, cashBal, onlineBal ) VALUES(?,?,?,?);',

  readPocketQuery   : 'SELECT * FROM Pocket;',

  updatePocketQuery : 'REPLACE INTO Pocket(id,currentBal, cashBal, onlineBal ) VALUES(1,?,?,?);'

}




