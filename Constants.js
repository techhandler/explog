export { Color, currentScreen, style, dataBase, monthNames }

const Color = {
  violet: '#957bfb',
  indigo: '#4477fa',
  blue: '#2a9dfb',
  cyan: '#57f9fa',
  aqua: '#68ea8e',
  green: '#6de427',
  yellow: '#fce939',
  orange: '#f98b30',
  red: '#f43e2b',
  pink: '#ed83fd',
  magenta: '#e3538c',
  white: '#ffffff',
  gray: '#eeeeee',
  silver: '#888888',
  black: '#000000'
}

const dataBase = {
  ledger: 'ledger',
  category: 'category',
  account: 'account'
}

const currentScreen = {
  ledger:'ledger',
  account:'account',
  category:'category',
  insertLedger: 'insertLedger',
  detailLedger: 'detailLedger',
  insertAccount: 'insertAccount',
  detailAccount: 'detailAccount',
  insertCategory: 'insertCategory',
  amountTransactionInAccount: 'amountTransactionInAccount',
}

const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const style = {
  paper: {
    flex: 1,
    padding: 20
  },
  inputText: {
    borderBottomWidth: 1,
    padding: 5,
    fontSize: 18
  }
}
