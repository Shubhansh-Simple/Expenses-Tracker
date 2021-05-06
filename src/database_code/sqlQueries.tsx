/*
 * Sql Queries 
 * as per Table
 */

export const credit = {

    createCreditQuery : 'CREATE TABLE IF NOT EXISTS "Credit" '+
                        '("id" integer NOT NULL PRIMARY KEY AUTOINCREMENT, '+
                        '"credit_amount" smallint unsigned NOT NULL CHECK ("credit_amount" >= 0), '+
                        '"credit_description" varchar(40) NOT NULL);',
}

export const pocket = {

  createPocketQuery : 'CREATE TABLE IF NOT EXISTS "Pocket" '+
                      '("id" integer NOT NULL PRIMARY KEY AUTOINCREMENT, '+
                      '"currentBal" smallint unsigned NOT NULL CHECK ("currentBal" >= 0));',

  insertPocketQuery : 'INSERT INTO Pocket (id,currentBal) VALUES(?,?);',

  readPocketQuery   : 'SELECT * FROM Pocket;',

}




