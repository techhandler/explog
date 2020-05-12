import { query, sqlBatch } from '../../db'
import { ToastAndroid } from "react-native"

export const fetchAllAccounts = async () => {
  try {
    let {raw = []} = await query(`SELECT * FROM account;`)
    return {success: true, result: raw}
  } catch (error) {
    return {success: false, error}
  }
}

export const fetchAccountDetail = async ({a_id}) => {
  try {
    if (a_id) {
      let {raw = []} = await query(`SELECT * FROM account WHERE a_id = ${a_id};`)
      let {raw: logs = []} = await query(`SELECT * FROM accountlogs WHERE a_id = ${a_id} ORDER BY log_id DESC;`)
      if (raw && raw[0] && raw[0].is_default)
        raw[0].is_default = raw[0].is_default === 'true'
      return {success: true, result: {...raw[0], logs}}
    }
  } catch (error) {
    return {success: false, error}
  }
}

export const insertAccount = async ({accountAmount, accountName, isDefault}) => {
  try {
    if (!accountName || !accountName.length)
      return {success: false, errorMessage: 'Account Name is mandatory'}
    if (!accountAmount || !Number(accountAmount) > 0)
      return {success: false, errorMessage: 'Invalid Amount'}
    let result = await query(`INSERT INTO account(a_name, a_amount, is_default) VALUES ('${accountName}','${accountAmount}','${isDefault}')`)
    let aId = result.insertId
    await query(`INSERT INTO accountlogs(a_id, cr_amount) VALUES ('${aId}','${accountAmount}')`)
    return {success: true, result: [{a_id: aId}]}
  } catch (error) {
    return {success: false, error, errorMessage: "Something went wrong"}
  }
}

export const amountTransaction = async ({amount,remarks=null}, process='', aId) => {
  try {
    if (!aId) return {success: false}
    if (!amount || !Number(amount) > 0) return {success: false, errorMessage: 'Invalid Amount'}
    await query(`UPDATE account SET a_amount = a_amount + ${process.toLowerCase()==="withdraw" ? (amount * (-1)) : amount} WHERE a_id = ${aId}`)
    await query(`INSERT INTO accountlogs(a_id, ${process.toLowerCase()==="withdraw" ? 'dr_amount' :' cr_amount'}, log_comments) VALUES ('${aId}','${amount}','${remarks}')`)
    return {success: true, result: [{a_id: aId}]}
  } catch (error) {
    return {success: false, error, errorMessage: "Something went wrong1"}
  }
}