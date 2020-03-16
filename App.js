import React, { Component } from "react"
import { Text, View, StyleSheet, BackHandler, Alert } from "react-native"
import ViewPagerAndroid from '@react-native-community/viewpager'
import { Ledger, InsertLedger } from "./components"
import { Color, currentScreen } from "./components/Constants"
import { initiateDb } from './db'

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