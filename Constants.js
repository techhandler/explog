export { Color, currentScreen, style, dataBase }

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
  gray: '#dddddd',
  silver: '#888888',
  black: '#000000'
}

const dataBase = {
  ledger: 'ledger',
  category: 'category',
  account: 'account'
}

const currentScreen = {
  insertLedger: 'insertLedger',
  detailLedger: 'detailLedger',
}

const style = {
  paper: {
    flex: 1,
    padding: 20
  },
  inputText: {
    borderBottomWidth: 1,
    padding: 5,
    fontSize: 20
  }
}
