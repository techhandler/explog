import { ToastAndroid } from "react-native"

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