import React, { Component } from 'react'
import { Text, View, StyleSheet, FlatList, TouchableOpacity } from "react-native"
import { Color, currentScreen, monthNames } from '../Constants'
import FabButton from './FabButton'
import { fetchAllLedger } from "../db"


const styles = StyleSheet.create({
  view: {flex: 1},
  panel: {
    flex: 1
  },
  item: {
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 25,
    paddingRight: 25,
    fontSize: 16,
    flexDirection: 'row'
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
                data={item}
                onPress={() => this.props.setGlobalState({
                  currentScreen: currentScreen.detailLedger,
                  stack: [this.props.state.currentScreen, ...this.props.state.stack],
                  childData: {ledger: item}
                })}
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

function Item({id, onPress, data: {ledgerName, ledgerAmount, ledgerDate}}) {
  ledgerDate = new Date(ledgerDate)
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.item]}>

      <View style={{flex: 2}}>
        <Text style={{fontSize: 20}}>{ledgerName}</Text>
        <Text style={{fontSize: 12, color:Color.silver}}>{ledgerDate.getDate()}-{monthNames[ledgerDate.getMonth()]}</Text>
      </View>
      <View style={{flex: 1, alignItems: 'flex-end', justifyContent: 'center'}}>
        <Text style={{fontSize: 20, color:Color.red}}>₹ {ledgerAmount}</Text>
      </View>
    </TouchableOpacity>
  )
}