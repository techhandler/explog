import React, { Component } from 'react'
import { Text, View, StyleSheet, FlatList, TouchableOpacity } from "react-native"
import { Color, currentScreen, style } from '../../Constants'
import FabButton from '../FabButton'
import { fetchAllAccounts } from "./accountService"


const styles = StyleSheet.create({
  view: {flex: 1},
  title: {
    flex: 1
  },
  card: {
    width: '80%',
    height: 150,
    marginTop: 30,
    marginBottom: 10,
    borderRadius: 10
  },
  cardHeader: {
    height: '65%',
    fontSize: 32,
    backgroundColor: '#c9dbec',
    padding: 15,
    color: '#4a6c8c'
  },
  cardAmount: {
    fontSize: 24,
    textAlign: 'right',
    padding: 15,
    borderColor: '#c9dbec',
    borderWidth: 1,
    color: '#4a6c8c'
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
        <FlatList
          style={styles.view}
          data={this.state.accountsData}
          renderItem={({item}) => (
            <View style={{alignItems: 'center'}}>
              <TouchableOpacity
                style={styles.card} key={item.a_id}
                onPress={() => this.props.setGlobalState({
                  currentScreen: currentScreen.detailAccount,
                  stack: [this.props.state.currentScreen, ...this.props.state.stack],
                  childData: {account: item}
                })}>
                <Text style={styles.cardHeader}>{item.a_name}</Text>
                <Text style={styles.cardAmount}>{item.a_amount}</Text>
              </TouchableOpacity>
            </View>
          )}
          keyExtractor={item => item.a_id+''}
        />
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