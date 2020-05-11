import { ToastAndroid } from "react-native"
import { db, query } from "../../db"

const validate = (obj, key) => {
  if (obj.hasOwnProperty(key)) {
    const value = obj[key]
    if (typeof value === 'string' && !value.length) {
      return false
    } else if (typeof value === 'number' && !(value > 0))
      return false
    return true
  }
  return false
}


export const isValid = ({...params}) => {
  if (!validate(params, 'ledgerName')) {
    ToastAndroid.show('Expense Name is mandatory', ToastAndroid.SHORT)
    return false
  }
  if (!validate(params, 'ledgerAmount')) {
    ToastAndroid.show('Amount is mandatory', ToastAndroid.SHORT)
    return false
  }
  if (!validate(params, 'ledgerCategory')) {
    ToastAndroid.show('Category is mandatory', ToastAndroid.SHORT)
    return false
  }
  return true
}


export const insertLedger = async ({...params}) => {
  try {
    if (!params.ledgerName) return {success: false, errorMessage: 'Name is mandatory'}
    if (!params.ledgerAmount || !Number(params.ledgerAmount) > 0) return {
      success: false,
      errorMessage: 'Invalid Amount'
    }
    if (!params.ledgerNotes) params.ledgerNotes = null

    let result = await query(`INSERT INTO ledger(l_name, l_amount, l_description, c_id, a_id, l_date) VALUES ('${params.l_name}',${params.l_amount},'${params.l_description}','${params.c_id}','${params.a_id}', '${params.l_date || null}')`)
    return {success: true, result}
  } catch (error) {
    return {success: false, error}
  }
}

export const fetchAllLedger = async () => {
  try {
    let {raw = []} = await query(`SELECT * FROM ledger;`)
    return {success: true, result: raw}
  } catch (error) {
    return {success: false, error}
  }
}

export const fetchLedgerDetail = async ({l_id}) => {
  try {
    let {raw = []} = await query(`SELECT * FROM ledger WHERE l_id = ${l_id};`)
    return {success: true, result: raw && raw.length ? raw[0] : {}}
  } catch (error) {
    return {success: false, error}
  }
}

export const updateLedger = async ({l_id, l_name, l_amount, l_description, c_id, a_id}) => {
  try {
    let {raw: oldRecord = []} = await query(`SELECT * FROM ledger WHERE l_id = ${l_id}`)
    let query1, query2, query3
    oldRecord = oldRecord[0]
    if (Number(oldRecord.a_id) === Number(a_id)) {
      l_amount = l_amount - oldRecord.l_amount
      query1 = `UPDATE ledger SET l_name = '${l_name}', l_description = '${l_description}', c_id = ${c_id}, l_amount = l_amount + ${l_amount}  WHERE l_id = ${l_id}`
      query2 = `UPDATE account SET a_amount = a_amount - ${l_amount} WHERE a_id = ${a_id}`
      db.transaction(tx => {
        tx.executeSql(query1)
        tx.executeSql(query2)
      }, err => {throw err})
    } else if (Number(oldRecord.a_id) !== Number(a_id) && !isNaN(Number(a_id)) && !isNaN(Number(a_id))) {
      query1 = `UPDATE ledger SET l_name = '${l_name}', l_description = '${l_description}', c_id = ${c_id}, l_amount = ${l_amount}, a_id = ${a_id} WHERE l_id = ${l_id}`
      query2 = `UPDATE account SET a_amount = a_amount - ${l_amount} WHERE a_id = ${a_id}`
      query3 = `UPDATE account SET a_amount = a_amount + ${oldRecord.l_amount} WHERE a_id = ${oldRecord.a_id}`
      db.transaction(tx => {
        tx.executeSql(query1)
        tx.executeSql(query2)
        tx.executeSql(query3)
      }, err => {throw err})
    }
    return {success: true, result: {l_id}}
  } catch (error) {
    console.log("Errererereresaeas",error)
    return {success: false, error}
  }
}