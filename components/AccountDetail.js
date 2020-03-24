import React, { Component } from 'react'
import { Text, View, TextInput, FlatList, Picker, Alert, ToastAndroid } from "react-native"

class AccountDetail extends Component {

  async componentDidMount(){

  }

  render() {
    return (
        <View style={{backgroundColor:'red', flex:1}}>
          <Text>{JSON.stringify(this.props.childData)}</Text>
        </View>
    )
  }
}

export default AccountDetail