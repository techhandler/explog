import db, { initiateDb, query } from './db'
import { dataBase } from '../Constants'

export { initiateDb }

export const insertLedger = async ({...obj}) => {
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

export const fetchAllCategory = async () => {
  try {
    // let result = await db.table(dataBase.ledger).find()
    let result = [{cI: '1', cN: 'Other'}, {cI: '2', cN: 'C-2'}, {cI: '3', cN: 'C-3'}];
    result = result.map(a => ({
      categoryId: a[fields.categoryId],
      categoryName: a[fields.categoryName]
    }))
    return {success: true, result}
  } catch (error) {
    return {success: false, error}
  }
}

export const fetchAllLedger = async () => {
  try {
    let result = await db.table(dataBase.ledger).find()
    result = result.map(a => ({
      ledgerId: a[fields.ledgerId],
      ledgerName: a[fields.ledgerName],
      ledgerAmount: a[fields.ledgerAmount],
      ledgerDate: a[fields.ledgerDate],
      ledgerCategory: a[fields.ledgerCategory],
      ledgerNotes: a[fields.ledgerNotes] || "",
      accountId : a[fields.accountId]
    }))
    return {success: true, result}
  } catch (error) {
    return {success: false, error}
  }
}

export const fetchAllAccounts = async () => {
  try {
    let result = await db.table(dataBase.account).find()
    result = result.map(a => ({
      accountId: a[fields.accountId],
      accountName: a[fields.accountName],
      accountAmount: a[fields.accountAmount],
      accountLogs:a[fields.accountLogs],
      defaultAccount: a[fields.accountDefault]
    }))
    return {success: true, result}
  } catch (error) {
    return {success: false, error}
  }
}

export const fetchAllCategories = async () => {
  try {
    let result = await db.table(dataBase.category).find()
    result = result.map(a => ({
      categoryId: a[fields.categoryId],
      categoryName: a[fields.categoryName]
    }))
    return {success: true, result}
  } catch (error) {
    return {success: false, error}
  }
}


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
  accountDefault: 'd',
  accountLogs:'lg',
  categoryId: 'cI',
  categoryName: 'cN'
}