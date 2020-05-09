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
    if(data){
      let result = await query(`INSERT INTO category(c_name) VALUES ('${data}')`)
      return {success: true, result}
    }
    else
      return {success: false, errorMessage: 'Category Name is mandatory'}
  } catch (error) {
    return {success: false, error}
  }
}