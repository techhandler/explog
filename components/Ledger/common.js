import { ToastAndroid } from "react-native"
import { query } from "../../db"

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

    let result = await query(`INSERT INTO ledger(l_name, l_amount, l_description, c_id, a_id) VALUES ('${params.ledgerName}',${params.ledgerAmount},'${params.ledgerNotes}','${params.ledgerCategory}','${params.ledgerAccount}')`)
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