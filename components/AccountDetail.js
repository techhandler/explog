import React, { Component } from 'react'
import { Text, View, TextInput, FlatList, Picker, Alert, ToastAndroid, TouchableOpacity } from "react-native"
import { currentScreen, style } from "../Constants"

class AccountDetail extends Component {

  state = {
    accountName: '',
    accountAmount: '',
    accountLogs: []
  }

  async componentDidMount() {
    let {account: {accountName, accountAmount, accountLogs}} = this.props.childData
    this.setState({accountName, accountAmount, accountLogs})
  }

  render() {
    return (
      <View style={{flex: 1, padding: 10}}>
        <View style={{flex: 3, backgroundColor: '#c9dbec', justifyContent: 'flex-end'}}>
          <Text
            style={styles.accountName}
            onChangeText={accountName => this.setState({accountName})}
          >{this.state.accountName}</Text>
        </View>
        <View style={{flex: 1, borderColor: '#c9dbec', borderWidth: 1, justifyContent: 'center'}}>
          <Text
            style={styles.accountAmount}
          >{this.state.accountAmount}</Text>
        </View>
        <View style={{flex: 6}}>
          <Text style={{
            paddingTop: 35,
            paddingBottom: 6,
            fontSize: 20,
            textAlign: 'center',
            color: '#4a6c8c'
          }}>History</Text>
          <View style={{flexDirection: 'row', padding: 5, borderBottomWidth: 1, borderColor: 'grey'}}>
            <Text style={styles.dateColumn}>Date</Text>
            <Text style={styles.creditColumn}>Credit</Text>
            <Text style={styles.withdrawColumn}>Withdraw</Text>
          </View>
          {
            this.state.accountLogs && this.state.accountLogs.map((a, i) => {
              return (
                <View key={i} style={{flexDirection: 'row', padding: 7, borderBottomWidth: 1, borderColor: '#c9dbec'}}>
                  <Text style={styles.dateColumn}>{new Date(a.d).toDateString()}</Text>
                  <Text style={styles.creditColumn}>{a.add || ""}</Text>
                  <Text style={styles.withdrawColumn}>{a.sub || ""}</Text>
                </View>)
            })
          }
        </View>
      </View>
    )
  }
}

export default AccountDetail

const styles = {
  accountName: {fontSize: 32, padding: 15, color: '#4a6c8c'},
  accountAmount: {fontSize: 24, textAlign: 'right', color: '#4a6c8c', paddingRight: 15},
  dateColumn: {flex: 3, color: '#4a6c8c', fontSize: 16},
  creditColumn: {flex: 1, color: '#4a6c8c', fontSize: 16},
  withdrawColumn: {flex: 1, textAlign: 'right', color: '#4a6c8c', fontSize: 16}
}