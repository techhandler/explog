import { query, sqlBatch } from '../../db'

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
      let {raw : logs = []} = await query(`SELECT * FROM accountlogs WHERE a_id = ${a_id};`)
      if (raw && raw[0] && raw[0].is_default)
        raw[0].is_default = raw[0].is_default==='true'
      return {success: true, result: {...raw[0],logs}};
    }
  } catch (error) {
    return {success: false, error}
  }
}

export const insertAccount = async ({accountAmount, accountName, isDefault}) => {
  try {
    let result = await query(`INSERT INTO account(a_name, a_amount, is_default) VALUES ('${accountName}','${accountAmount}','${isDefault}')`)
    let aId = result.insertId;
    await query(`INSERT INTO accountlogs(a_id, cr_amount, log_date) VALUES ('${aId}','${accountAmount}','${Date.now()}')`)
    return {success: true, result: [{a_id: aId}]}
  } catch (error) {
    return {success: false, error}
  }
}