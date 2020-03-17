import db, { initiateDb } from './db'
import { dataBase } from '../components/Constants'


const insertLedger = async ({...obj}) => {
  let newObj = {
    [fields.ledgerId]: Date.now(),
    [fields.ledgerName]: obj.ledgerName,
    [fields.ledgerAmount]: Number(obj.ledgerAmount),
    [fields.ledgerCategory]: obj.selectedCategory,
    [fields.ledgerNotes]: obj.notes,
    [fields.ledgerDate]: (obj.selectedDate && new Date(obj.selectedDate).getTime()) || Date.now(),
    [fields.accountId]: obj.accountId
  }
  try {
    await db.table(dataBase.ledger).insert(newObj)
    return true
  } catch (err) {
    console.log(err)
    return false
  }
}

export { initiateDb, insertLedger }


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