import React, { Component } from 'react'
import { Text, View, StyleSheet, FlatList, TouchableOpacity } from "react-native"
import { Color, currentScreen, monthNames } from '../Constants'
import FabButton from './FabButton'
import { fetchAllLedger } from "../db"


const styles = StyleSheet.create({
  view: {flex: 1},
  panel: {
    flex: 1,
    // padding:5,
    backgroundColor: Color.white
  },
  item: {
    paddingTop: 2,
    paddingBottom: 2,
    // paddingLeft: 25,
    // paddingRight: 25,
    // fontSize: 16,
    flexDirection: 'row',
    backgroundColor: Color.white,
    // borderLeftWidth : 1,
    borderTopWidth: 1,
    // borderBottomWidth : 1,
    // borderRightWidth : 1,
    borderColor: '#c9dbec'
    // borderRadius: 20,
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
            renderItem={({item,index}) => (
              <View><Item
                id={item.ledgerId}
                data={item}
                index={index}
                onPress={() => this.props.setGlobalState({
                  currentScreen: currentScreen.detailLedger,
                  stack: [this.props.state.currentScreen, ...this.props.state.stack],
                  childData: {ledger: item}
                })}
              />
                <View style={{height: 0, backgroundColor: Color.white}}/>
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

function Item({id, onPress, data: {ledgerName, ledgerAmount, ledgerDate}, index}) {
  ledgerDate = new Date(ledgerDate)
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.item]}>
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', paddingTop: 12, paddingBottom: 12}}>
        <Text style={{fontSize: 22, color: '#4a6c8c'}}>{ledgerAmount}</Text>
      </View>
      <View style={{width: 1, backgroundColor: '#c9dbec', height: '100%'}}>
        {index !==0 && <View style={{
          backgroundColor: '#c9dbec',
          width: 12,
          height: 12,
          borderRadius: 26,
          position:'absolute',
          top:-8,
          left:-6,
          borderWidth: 2,
          borderColor: '#4a6c8c'
        }}/>}
      </View>
      <View style={{flex: 3, paddingTop: 12, paddingBottom: 12, paddingLeft: 25}}>
        <Text style={{fontSize: 22, color: '#4a6c8c'}}>{ledgerName}</Text>
        <Text style={{fontSize: 14, color: '#4a6c8c'}}>{ledgerDate.getDate()}-{monthNames[ledgerDate.getMonth()]}</Text>
      </View>
    </TouchableOpacity>
  )
}