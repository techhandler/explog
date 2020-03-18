import db, { initiateDb } from './db'
import { dataBase } from '../components/Constants'


const insertLedger = async ({...obj}) => {
  let newObj = {
    [fields.ledgerId]: Date.now() + '',
    [fields.ledgerName]: obj.ledgerName,
    [fields.ledgerAmount]: Number(obj.ledgerAmount),
    [fields.ledgerCategory]: obj.selectedCategory,
    [fields.ledgerNotes]: obj.notes,
    [fields.ledgerDate]: (obj.selectedDate && new Date(obj.selectedDate).getTime()) || Date.now(),
    [fields.accountId]: obj.accountId
  }
  try {
    await db.table(dataBase.ledger).insert(newObj)
    return {success: true}
  } catch (err) {
    console.log(err)
    return {success: false}
  }
}

const fetchAllLedger = async () => {
  try {
    let result = await db.table(dataBase.ledger).find()
    result = result.map(a => ({
      ledgerId: a[fields.ledgerId],
      ledgerName: a[fields.ledgerName],
      ledgerAmount: a[fields.ledgerAmount],
      ledgerDate: a[fields.ledgerDate],
      ledgerCategory: a[fields.ledgerCategory]
    }))
    console.log("datatatatatt", result)
    return {success: true, result}
  } catch (error) {
    return {success: false, error}
  }
}

export { initiateDb, insertLedger, fetchAllLedger }


const fields = {
  ledgerId: 'lI',
  ledgerName: 'lN',
  ledgerAmount: 'lA',
  ledgerCategory: 'lC',
  ledgerNotes: 'lNo',
  ledgerDate: 'lD',
  accountId: 'aI',
  accountName: 'aN',
  accountAmount: 'aA',
  categoryId: 'cI',
  categoryName: 'cN'
}