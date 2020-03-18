import React, { Component } from 'react'
import { Text, View, StyleSheet, FlatList, TouchableOpacity } from "react-native"
import { Color, currentScreen, style } from './Constants'
import FabButton from './FabButton'
import { fetchAllLedger } from "../db"


const styles = StyleSheet.create({
  view: {flex: 1},
  panel: {
    flex: 1
  },
  item: {
    padding: 30,
    fontSize: 16
  },
  title: {
    flex: 1
  }
})


class Ledger extends Component {
  state = {listData: []}

  async componentDidMount() {
    let {result: listData} = await fetchAllLedger()
    this.setState({listData})
  }

  render() {
    return (
      <View style={styles.view}>
        <View style={styles.panel}>


          <FlatList
            data={this.state.listData}
            renderItem={({item}) => (
              <View><Item
                id={item.ledgerId}
                leftUpTitle={item.ledgerName}
                leftDownTitle={item.ledgerCategory}
                rightUpTitle={item.ledgerAmount}
                rightDownTitle={new Date(item.ledgerDate).toDateString()}

                // selected={!!selected.get(item.id)}
                // onSelect={onSelect}
              />
                <View style={{height: 1, backgroundColor: Color.gray}}/>
              </View>
            )}
            keyExtractor={item => item.ledgerId + ''}
            // extraData={selected}
          />


        </View>
        <FabButton
          text={'+'}
          onPress={() => this.props.setGlobalState({
            currentScreen: currentScreen.insertLedger,
            stack: [this.props.state.currentScreen, ...this.props.state.stack]
          })
          }
          textStyle={{fontSize: 40}}
        />
      </View>
    )
  }
}

export default Ledger

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