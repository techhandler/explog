import AsyncStorage from '@react-native-community/async-storage'
import { dataBase } from '../components/Constants'

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