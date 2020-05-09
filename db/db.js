import AsyncStorage from '@react-native-community/async-storage'
import { openDatabase } from 'react-native-sqlite-storage'

var db1 = openDatabase({name: 'expenses.db'})
import { dataBase } from '../Constants'

// export const instantiateDb = () => {
//   db1.transaction(tx => {
//     tx.executeSql(
//       'CREATE TABLE IF NOT EXISTS accounts(a_id INTEGER PRIMARY KEY AUTOINCREMENT, a_name VARCHAR(40), a_amount INTEGER, is_default INT(4))',
//       [], async (tx, results) => {
//         console.log("table created!!!", results)
//         // tx.executeSql('INSERT INTO accounts (a_name, a_amount, is_default) VALUES (?,?,?)', ['A-4', 8000, 0], (tx, res) => {
//         //   console.log("record created", res)
//         let result = await query(tx, 'SELECT * from accounts')
//         // tx.executeSql('SELECT * from accounts', [], (tx, res1, err) => {
//         console.log("total records are>>", result.rows)
//         // for (let i = 0; i < res1.rows.length; i++) {
//         //   console.table(`Entries item >> ${i + 1} >>`, res1.rows.item(i))
//         console.table(result.rows.raw())
//         // }
//         // })
//         // })
//       })
//
//   })
// }

export const initiateDb = async () => {
  try {
    // await query('DROP TABLE IF EXISTS account');
    // await query('DROP TABLE IF EXISTS accountlogs');
    // await query('DROP TABLE IF EXISTS category');
    // await query('DROP TABLE IF EXISTS ledger');
    await query(`CREATE TABLE IF NOT EXISTS category(c_id INTEGER PRIMARY KEY AUTOINCREMENT, c_name VARCHAR(40), is_default INT(4) DEFAULT 0)`)
    await query(`CREATE TABLE IF NOT EXISTS account(a_id INTEGER PRIMARY KEY AUTOINCREMENT, a_name VARCHAR(40), a_amount INTEGER, is_default INT(4) DEFAULT 0)`)
    await query('CREATE TABLE IF NOT EXISTS ledger(l_id INTEGER PRIMARY KEY AUTOINCREMENT, l_name VARCHAR(60), l_amount INTEGER, l_description VARCHAR(160), l_date VARCHAR(14), c_id INTEGER, a_id INTEGER, FOREIGN KEY (c_id) REFERENCES category (c_id), FOREIGN KEY (a_id) REFERENCES account (a_id))')
    await query('CREATE TABLE IF NOT EXISTS accountlogs(log_id INTEGER PRIMARY KEY AUTOINCREMENT, cr_amount INTEGER, dr_amount INTEGER, log_date VARCHAR(14), a_id INTEGER, FOREIGN KEY (a_id) REFERENCES account (a_id))')
    let tables = await query('SELECT name FROM sqlite_master WHERE type=\'table\' ORDER BY name;')
    console.log("tables", tables.raw)
  } catch (err) {
    console.log("cannot delete", err)
  }
}

export default class db {
  constructor(t) {
    this.tableName = t
    return this
  }

  static table(t) {
    return new db(t)
  }

  async insert(obj) {
    let oldItems = await AsyncStorage.getItem(this.tableName)
    oldItems = JSON.parse(oldItems)
    await AsyncStorage.setItem(this.tableName, JSON.stringify([obj, ...oldItems]))
    return [obj]
  }

  async find(index) {
    let items = await AsyncStorage.getItem(this.tableName)
    if (typeof index === 'number')
      return JSON.parse(items)[index]
    return JSON.parse(items)
  }

  delete(index) {
    this._delete = index
    return this
  }

  update(index, obj) {
    this._updateIndex = index
    this._updateValue = obj
    return this
  }

  json() {
    console.log(this)
    return this
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