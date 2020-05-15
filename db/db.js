import { openDatabase } from 'react-native-sqlite-storage'

let db1 = openDatabase({name: 'expenses.db'})

export const initiateDb = async () => {
  try {
    // await query('DROP TABLE IF EXISTS account');
    // await query('DROP TABLE IF EXISTS accountlogs');
    // await query('DROP TABLE IF EXISTS category');
    // await query('DROP TABLE IF EXISTS ledger');
    await query(`CREATE TABLE IF NOT EXISTS category(c_id INTEGER PRIMARY KEY AUTOINCREMENT, c_name VARCHAR(40) NOT NULL, is_default INT(4) DEFAULT 0)`)
    await query(`CREATE TABLE IF NOT EXISTS account(a_id INTEGER PRIMARY KEY AUTOINCREMENT, a_name VARCHAR(40) NOT NULL, a_amount INTEGER NOT NULL, is_default INT(4) DEFAULT 0)`)
    await query('CREATE TABLE IF NOT EXISTS ledger(l_id INTEGER PRIMARY KEY AUTOINCREMENT, l_name VARCHAR(60) NOT NULL, l_amount INTEGER NOT NULL, l_description VARCHAR(160), l_date DATETIME NOT NULL DEFAULT (datetime(current_timestamp,\'localtime\')), c_id INTEGER, a_id INTEGER, FOREIGN KEY (c_id) REFERENCES category (c_id), FOREIGN KEY (a_id) REFERENCES account (a_id))')
    await query('CREATE TABLE IF NOT EXISTS accountlogs(log_id INTEGER PRIMARY KEY AUTOINCREMENT, cr_amount INTEGER, dr_amount INTEGER, log_date DATETIME DEFAULT (datetime(current_timestamp,\'localtime\')), log_comments VARCHAR(100), a_id INTEGER NOT NULL, FOREIGN KEY (a_id) REFERENCES account (a_id))')
    await query(`INSERT INTO category (c_name) SELECT 'Other' WHERE NOT EXISTS (SELECT * FROM category)`)
  } catch (err) {
    console.log("cannot delete", err)
  }
}

export const query = function (sqlQuery, params = []) {
  return new Promise((resolve, reject) => {
    db1.transaction(trx => {
      trx.executeSql(sqlQuery, params, function (tx, response = {}) {
        let res = {...response}
        if (response.rows && response.rows.raw)
          res.raw = JSON.parse(JSON.stringify(response.rows.raw()))
        resolve({...res})
      }, function (err) {
        reject(err)
      })
    })
  })
}

export default db1;