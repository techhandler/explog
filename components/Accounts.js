import React, { Component } from 'react'
import { Text, View, StyleSheet, FlatList, TouchableOpacity } from "react-native"
import { Color, currentScreen, style } from './Constants'
import FabButton from './FabButton'
import { fetchAllLedger } from "../db"


const styles = StyleSheet.create({
  view: {flex: 1},
  panel: {
    flex: 1,
    alignItems:'center'
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
  state = {
    data: [
      {accountName: 'A1', accountAmount: 10000},
      {accountName: 'A2', accountAmount: 40000},
      {accountName: 'A3', accountAmount: 60000}
    ]
  }
  //
  // async componentDidMount() {
  //   let {result: listData} = await fetchAllLedger()
  //   this.setState({listData})
  // }

  render() {
    return (
      <View style={styles.view}>
        <View style={styles.panel}>


          {this.state.data.map(a => <View style={{
            borderWidth: 1, width: '80%', height: 150
          }} key={a.accountName}>
            <Text>{a.accountName}</Text>
            <Text>{a.accountAmount}</Text>
          </View>)}


        </View>
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