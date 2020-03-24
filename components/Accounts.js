import React, { Component } from 'react'
import { Text, View, StyleSheet, FlatList, TouchableOpacity } from "react-native"
import { Color, currentScreen, style } from '../Constants'
import FabButton from './FabButton'
import { fetchAllAccounts } from "../db"


const styles = StyleSheet.create({
  view: {flex: 1},
  panel: {
    flex: 1,
    alignItems: 'center'
  },
  item: {
    padding: 30,
    fontSize: 16
  },
  title: {
    flex: 1
  }
})


class Accounts extends Component {
  state = {accountsData: []}

  async componentDidMount() {
    let {result: accountsData} = await fetchAllAccounts()
    this.setState({accountsData})
  }

  render() {
    return (
      <View style={styles.view}>
        <View style={styles.panel}>

          {this.state.accountsData.map(a => <TouchableOpacity style={{
            borderWidth: 1, width: '80%', height: 150
          }} key={a.accountId} onPress={() => this.props.setGlobalState({
            currentScreen: currentScreen.detailAccount,
            stack: [this.props.state.currentScreen, ...this.props.state.stack],
            childData: {account : a}
          })}>
            <Text>{a.accountName}</Text>
            <Text>{a.accountAmount}</Text>
          </TouchableOpacity>)}

        </View>
        <FabButton
          text={'+'}
          onPress={() => this.props.setGlobalState({
            currentScreen: currentScreen.insertAccount,
            stack: [this.props.state.currentScreen, ...this.props.state.stack]
          })
          }
          textStyle={{fontSize: 40}}
        />
      </View>
    )
  }
}

export default Accounts

function Item({id, leftUpTitle, rightDownTitle, rightUpTitle, leftDownTitle, selected, onSelect}) {
  return (
    <TouchableOpacity
      onPress={() => console.log(id)}
      style={[
        styles.item
        // {backgroundColor: selected ? '#6e3b6e' : '#f9c2ff'}
      ]}
    >
      <Text>{leftUpTitle}</Text>
      <Text>{leftDownTitle}</Text>
      <Text>{rightUpTitle}</Text>
      <Text>{rightDownTitle}</Text>
    </TouchableOpacity>
  )
}