import { query } from '../../db'
import db from "../../db/db"
import { dataBase } from "../../Constants"


export const fetchAllAccounts = async () => {
  try {
    let {raw = []} = await query(`SELECT * FROM account;`)
    console.log("all accounts", raw)
    // let result = await db.table(dataBase.account).find()
    // result = result.map(a => ({
    //   accountId: a[fields.accountId],
    //   accountName: a[fields.accountName],
    //   accountAmount: a[fields.accountAmount],
    //   accountLogs:a[fields.accountLogs],
    //   defaultAccount: a[fields.accountDefault]
    // }))
    return {success: true, result: raw}
  } catch (error) {
    return {success: false, error}
  }
}

export const insertAccount = async ({accountAmount, accountName, isDefault}) => {
  try {
    let result = await query(`INSERT INTO account(a_name, a_amount, is_default) VALUES ('${accountName}','${accountAmount}','${isDefault}')`)
    console.log('result of account insertion', result)
    return {success: true, result: [{a_id: result.insertId}]}
  } catch (error) {
    return {success: false, error}
  }
}