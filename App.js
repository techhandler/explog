import React, { Component } from "react"
import { Text, View, StyleSheet, BackHandler, Alert, Button, TouchableOpacity, ToastAndroid } from "react-native"
import { Ledger, Accounts, AccountDetail, Category, Footer, LedgerInsert, AccountInsert } from "./components"
import { Color, currentScreen } from "./Constants"
import SplashScreen from 'react-native-splash-screen'
import { initiateDb } from './db'

export default class App extends Component {
  state = {
    stack: [],
    currentScreen: currentScreen.ledger,
    childData: {}
  }

  doubleExit = 0

  setGlobalState = (obj) => {
    this.setState({...obj})
  }

  renderScreen = () => {
    switch (this.state.currentScreen) {
      case currentScreen.ledger:
        return <Ledger setGlobalState={this.setGlobalState} state={this.state}/>
      case currentScreen.insertLedger:
        return <LedgerInsert setGlobalState={this.setGlobalState} state={this.state}/>
      case currentScreen.detailLedger:
        return <LedgerInsert setGlobalState={this.setGlobalState} detailMode={true} childData={this.state.childData} state={this.state}/>
      case currentScreen.account:
        return <Accounts setGlobalState={this.setGlobalState} state={this.state}/>
      case currentScreen.insertAccount:
        return <AccountInsert goBack={this.goBack} />
      case currentScreen.detailAccount:
      case currentScreen.amountTransactionInAccount:
        return <AccountDetail childData={this.state.childData} setGlobalState={this.setGlobalState} state={this.state}  goBack={this.goBack} />
    }
  }

  goBack = ()=>{
    let [currentScreen, ...rest] = this.state.stack
    this.setGlobalState({currentScreen, stack: [...rest]})
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
    SplashScreen.hide();
  }

  componentWillUnmount() {
    this.backHandler.remove()
  }

  render() {
    return (
      <>
        <View style={styles.container}>
          <Text style={styles.header}>{headerObject[this.state.currentScreen].title}</Text>
          {this.renderScreen()}

          {((this.state.currentScreen === currentScreen.category) || (this.state.currentScreen === currentScreen.insertCategory)) &&
          <View style={{flex: 1}}>
            <Category setGlobalState={this.setGlobalState} state={this.state} goBack={this.goBack}/>
          </View>
          }
          {
            headerObject[this.state.currentScreen].home &&
            <Footer currentScreen={this.state.currentScreen} setGlobalState={this.setGlobalState}/>
          }
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
    backgroundColor: '#dfebf7',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  footerItems: {}
})

const headerObject = {
  ledger: {title: 'Expense', home: true},
  account: {title: 'Account', home: true},
  category: {title: 'Category', home: true},
  insertLedger: {title: 'Add Expense'},
  detailLedger: {title: 'Detail'},
  insertAccount: {title: 'Add Account'},
  detailAccount: {title: 'Detail'},
  amountTransactionInAccount: {title: 'Amount Transaction'},
  insertCategory: {title: 'Add Category'}
}