import React, { Component } from "react"
import { Text, View, StyleSheet, BackHandler, Alert, Button, TouchableOpacity, ToastAndroid } from "react-native"
import { Ledger, LedgerDetail, Accounts, AccountDetail } from "./components"
import { Color, currentScreen } from "./Constants"
import { initiateDb } from './db'
import AsyncStorage from '@react-native-community/async-storage'


export default class App extends Component {
  state = {
    stack: [],
    currentScreen: currentScreen.account,
    childData: {}
  }

  doubleExit = 0

  setGlobalState = (obj) => {
    this.setState({...obj})
  }

  backAction = () => {
    if (this.state.stack.length) {
      let [currentScreen, ...rest] = this.state.stack
      this.setGlobalState({currentScreen, stack: [...rest]})
    } else {
      this.doubleExit += 1
      if (this.doubleExit === 1) {
        ToastAndroid.show('Press Back again to exit', ToastAndroid.SHORT)
        setTimeout(() => this.doubleExit = 0, 2200)
      } else if (this.doubleExit > 1) {
        BackHandler.exitApp()
      }
    }
    return true
  }

  componentDidMount() {
    initiateDb()
    this.backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      this.backAction
    )
  }

  componentWillUnmount() {
    this.backHandler.remove()
  }

  render() {
    return (
      <>
        <View style={styles.container}>
          <Text style={styles.header}>{headerTitle[this.state.currentScreen]}</Text>
          {this.state.currentScreen === currentScreen.ledger &&
          <Ledger setGlobalState={this.setGlobalState} state={this.state}/>}

          {this.state.currentScreen === currentScreen.insertLedger && <LedgerDetail insert={true}/>}

          {this.state.currentScreen === currentScreen.detailLedger &&
          <LedgerDetail childData={this.state.childData}/>}
          {this.state.currentScreen === currentScreen.account &&
          <Accounts setGlobalState={this.setGlobalState} state={this.state}/>}

          {this.state.currentScreen === currentScreen.insertAccount && <AccountDetail/>}

          {this.state.currentScreen === currentScreen.detailAccount &&
          <AccountDetail childData={this.state.childData}/>}
          {this.state.currentScreen === currentScreen.category &&
          <View>
            <Text>Dev Page</Text>
            <Button
              title="Remove All"
              onPress={async () => {
                await AsyncStorage.clear()
                console.log('removed all')
              }}/>
            <View style={{height: 20}}/>
            <Button
              title="Seed All Data"
              onPress={async () => {
                await AsyncStorage.setItem('ledger', JSON.stringify([
                  {lI: "1", lN: "L-4", lA: 400, lC: "1", lNo: "Testing 4", lD: 1584884861245, aI: "3"},
                  {lI: "2", lN: "L-3", lA: 540, lC: "2", lNo: "Testing 3", lD: 1584884703808, aI: "1"},
                  {lI: "3", lN: "L-2", lA: 200, lC: "3", lNo: "Testing 2", lD: 1584884528782, aI: "3"},
                  {lI: "4", lN: "L-1", lA: 100, lC: "1", lNo: "Testing 1", lD: 1584884455243, aI: "2"}
                ]))
                await AsyncStorage.setItem('account', JSON.stringify([
                  {aI: '1', aN: 'A-1', aA: 20000, d: false, lg: [{add: 5000}]},
                  {aI: '2', aN: 'A-2', aA: 40000, d: true, lg: [{add: 10000}]},
                  {aI: '3', aN: 'A-3', aA: 60000, d: false, lg: [{add: 30000}]}
                ]))
                await AsyncStorage.setItem('category', JSON.stringify([
                  {cI: '1', cN: 'Other'},
                  {cI: '2', cN: 'C-2'},
                  {cI: '3', cN: 'C-3'}
                ]))
                console.log("seeding done")
              }}/>
            <View style={{height: 20}}/>
            <Button
              title="Show Data"
              onPress={async () => {
                console.log('ledger>>', (await AsyncStorage.getItem('ledger')))
                console.log('account>>', JSON.parse(await AsyncStorage.getItem('account')))
              }}/>
          </View>
          }
          <View style={styles.footer}>
            <TouchableOpacity
              style={{flex: 1, alignItems: 'center'}}
              onPress={() => this.setState({currentScreen: currentScreen.ledger})}>
              <Text>Expense</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{flex: 1, alignItems: 'center'}}
              onPress={() => this.setState({currentScreen: currentScreen.account})}>
              <Text>Accounts</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{flex: 1, alignItems: 'center'}}
              onPress={() => this.setState({currentScreen: currentScreen.category})}>
              <Text>Categories</Text>
            </TouchableOpacity>
          </View>
        </View>
      </>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    color: '#f6fafd',
    fontSize: 24,
    padding: 20,
    textAlign: 'left',
    backgroundColor: '#4a6c8c'
  },
  footer: {
    color: '#4a6c8c',
    fontSize: 24,
    padding: 15,
    backgroundColor: '#c9dbec',
    flexDirection: 'row',
    justifyContent: 'center'
  }
})

const headerTitle = {
  ledger: 'Expense',
  account: 'Account',
  category: 'Dev',
  insertLedger: 'Add Expense',
  detailLedger: 'Detail',
  insertAccount: 'Add Account',
  detailAccount: 'Detail'
}