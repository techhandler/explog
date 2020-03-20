import React, { Component } from "react"
import { Text, View, StyleSheet, BackHandler, Alert, Button } from "react-native"
import ViewPagerAndroid from '@react-native-community/viewpager'
import { Ledger, LedgerDetail, Accounts } from "./components"
import { Color, currentScreen } from "./Constants"
import { initiateDb } from './db'
import AsyncStorage from '@react-native-community/async-storage'


export default class App extends Component {
  state = {
    stack: ['Ledger'],
    currentScreen: currentScreen.insertLedger
  }

  setGlobalState = (obj) => {
    this.setState({...obj}, () => console.log(this.state))
  }

  backAction = () => {
    if (this.state.stack.length) {
      let [currentScreen, ...rest] = this.state.stack
      this.setGlobalState({currentScreen, stack: [...rest]})
    } else {
      Alert.alert("Exit App", "Are you sure you want to Exit?", [
        {
          text: "Cancel",
          onPress: () => null,
          style: "cancel"
        },
        {text: "Exit", onPress: () => BackHandler.exitApp()}
      ])
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
      <ViewPagerAndroid style={styles.viewPager} initialPage={1}>
        <View key="1">
          <Text style={styles.header}>CHATS</Text>
          <View style={{flex: 1}}>
            {this.state.currentScreen === 'Ledger' &&
            <Ledger setGlobalState={this.setGlobalState} state={this.state}/>}

            {this.state.currentScreen === currentScreen.insertLedger && <LedgerDetail/>}
          </View>
        </View>
        <View key="2">
          <Text style={styles.header}>ACC</Text>
          <Accounts/>
        </View>
        <View key="3">
          <Text>Dev Page</Text>
          <Button
            title="Remove All"
            onPress={async () => {
              await AsyncStorage.clear()
              console.log('removed all')
            }}/>
          <View style={{height: 20}}/>
          <Button
            title="Seed Ledger"
            onPress={async () => {
              await AsyncStorage.setItem('ledger', JSON.stringify([
                {lI: "1", lN: "L-4", lA: 400, lC: "1", lNo: "Testing 4", lD: 1584884861245, aI: "3"},
                {lI: "2", lN: "L-3", lA: 540, lC: "2", lNo: "Testing 3", lD: 1584884703808, aI: "1"},
                {lI: "3", lN: "L-2", lA: 200, lC: "3", lNo: "Testing 2", lD: 1584884528782, aI: "3"},
                {lI: "4", lN: "L-1", lA: 100, lC: "1", lNo: "Testing 1", lD: 1584884455243, aI: "2"}
              ]))
              await AsyncStorage.setItem('account', JSON.stringify([
                {aI: '1', aN: 'A-1', aA: 20000, d: false},
                {aI: '2', aN: 'A-2', aA: 40000, d: true},
                {aI: '3', aN: 'A-3', aA: 60000, d: false}
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
            title="Show Ledger"
            onPress={async () => {
              console.log('ledger>>', (await AsyncStorage.getItem('ledger')))
              console.log('account>>', JSON.parse(await AsyncStorage.getItem('account')))
            }}/>
        </View>
      </ViewPagerAndroid>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  text: {
    fontSize: 18,
    fontWeight: "bold"
  },
  viewPager: {
    flex: 1
  },
  pageStyle: {
    alignItems: 'center',
    padding: 20
  },
  header: {
    backgroundColor: Color.blue,
    fontSize: 24,
    padding: 15,
    textAlign: 'center',
    color: Color.white
  }
})