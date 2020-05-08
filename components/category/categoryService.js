import { query } from '../../db'


export const fetchAllCategory = async () => {
  try {
    let {raw = []} = await query(`SELECT * FROM category;`)
    console.log("all categiress", raw)
    // let result = [];
    // result = result.map(a => ({
    //   categoryId: a[fields.categoryId],
    //   categoryName: a[fields.categoryName]
    // }))
    return {success: true, result: raw}
  } catch (error) {
    return {success: false, error}
  }
}

export const insertCategory = async (data) => {
  try {
    console.log("new Category", data)
    let result = await query(`INSERT INTO category(c_name) VALUES ('${data}')`)
    console.log('result', result)
    // let result = await db.table(dataBase.ledger).find()
    // let result = [];
    // result = result.map(a => ({
    //   categoryId: a[fields.categoryId],
    //   categoryName: a[fields.categoryName]
    // }))
    return {success: true, result}
  } catch (error) {
    return {success: false, error}
  }
}