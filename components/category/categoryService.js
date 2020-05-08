import { query } from '../../db'


export const fetchAllCategory = async () => {
  try {
    let {raw = []} = await query(`SELECT * FROM category;`)
    return {success: true, result: raw}
  } catch (error) {
    return {success: false, error}
  }
}

export const insertCategory = async (data) => {
  try {
    let result = await query(`INSERT INTO category(c_name) VALUES ('${data}')`)
    return {success: true, result}
  } catch (error) {
    return {success: false, error}
  }
}