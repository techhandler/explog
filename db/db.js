import AsyncStorage from '@react-native-community/async-storage'
import { dataBase } from '../Constants'

export const initiateDb = () => {
  AsyncStorage.getItem(dataBase.account).then(res => {
    if (!res || !res.length)
      AsyncStorage.setItem(dataBase.account, JSON.stringify([]))
  })
  AsyncStorage.getItem(dataBase.category).then(res => {
    if (!res || !res.length)
      AsyncStorage.setItem(dataBase.category, JSON.stringify([]))
  })
  AsyncStorage.getItem(dataBase.ledger).then(res => {
    if (!res || !res.length)
      AsyncStorage.setItem(dataBase.ledger, JSON.stringify([]))
  })
}

export default class db {
  constructor(t) {
    this.tableName = t
    return this
  }

  static table(t) {
    return new db(t)
  }

  async insert(obj) {
    let oldItems = await AsyncStorage.getItem(this.tableName)
    oldItems = JSON.parse(oldItems)
    await AsyncStorage.setItem(this.tableName, JSON.stringify([obj, ...oldItems]))
    return [obj]
  }

  async find(index) {
    let items = await AsyncStorage.getItem(this.tableName)
    if (typeof index === 'number')
      return JSON.parse(items)[index]
    return JSON.parse(items)
  }

  delete(index) {
    this._delete = index
    return this
  }

  update(index, obj) {
    this._updateIndex = index
    this._updateValue = obj
    return this
  }

  json() {
    console.log(this)
    return this
  }
}