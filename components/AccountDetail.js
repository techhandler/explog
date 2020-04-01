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
    console.log("sldkjfaskldjfklsdf", JSON.stringify(this.props.childData))
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
          <Text style={{paddingTop: 15, paddingBottom: 6, fontSize: 18, textAlign: 'center'}}>History</Text>
          <View style={{flexDirection: 'row', padding: 5, borderBottomWidth: 2, borderColor: 'grey'}}>
            <Text style={{flex: 4}}>Date</Text>
            <Text style={{flex: 1}}>Credit</Text>
            <Text style={{flex: 1}}>Withdraw</Text>
          </View>
          {
            this.state.accountLogs && this.state.accountLogs.map((a, i) => {
              return (
                <View key={i} style={{flexDirection: 'row', padding: 7, borderBottomWidth: 1, borderColor: 'grey'}}>
                  <Text style={{flex: 4}}>{new Date(a.d).toDateString()}</Text>
                  <Text style={{flex: 1}}>{a.add || ""}</Text>
                  <Text style={{flex: 1, textAlign: 'right'}}>{a.sub || ""}</Text>
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
  accountName: {
    fontSize: 32,
    padding: 15,
    color: '#4a6c8c'
  },
  accountAmount: {
    fontSize: 24,
    textAlign: 'right',
    color: '#4a6c8c',
    paddingRight: 15
  }
}