import React, { Component } from "react"
import { Text, View, StyleSheet, BackHandler, Alert, Button } from "react-native"
import ViewPagerAndroid from '@react-native-community/viewpager'
import { Ledger, InsertLedger } from "./components"
import { Color, currentScreen } from "./components/Constants"
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
      <ViewPagerAndroid style={styles.viewPager} initialPage={0}>
        <View key="1">
          <Text style={styles.header}>CHATS</Text>
          <View style={{flex: 1}}>
            {this.state.currentScreen === 'Ledger' &&
            <Ledger setGlobalState={this.setGlobalState} state={this.state}/>}

            {this.state.currentScreen === currentScreen.insertLedger && <InsertLedger/>}
          </View>
        </View>
        <View key="2">
          <Text>Second Page</Text>
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
                {lI: 1, lN: '1st Testing', lA: 10, lD: Date.now()-20000},
                {lI: 2, lN: '2nd Testing', lA: 20, lD: Date.now()-4000000},
                {lI: 3, lN: '3rd Testing', lA: 30, lD: Date.now()-1400000}
              ]))
              console.log("seeding done")
            }}/>
          <View style={{height: 20}}/>
          <Button
            title="Show Ledger"
            onPress={async () => {
              console.log('db>>', JSON.parse(await AsyncStorage.getItem('ledger')))
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