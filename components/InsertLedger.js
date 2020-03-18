import React, { Component } from 'react'
import { Text, View, TextInput, FlatList, Picker, Alert, ToastAndroid } from "react-native"
import FabButton from './FabButton'
import { Color, style } from './Constants'
import { insertLedger } from '../db'

class InsertLedger extends Component {
  state = {
    ledgerName: "",
    ledgerAmount: '',
    category: ['1', '2', '3', '4'],
    selectedCategory: '',
    notes: '',
    selectedDate: '',
    accountId: '',
    showCalender: false
  }

  handleOnSave = async () => {
    let isError = false
    if (!validate(this.state, 'ledgerName')) {
      ToastAndroid.show('Name is mandatory', ToastAndroid.SHORT)
      isError = true
    }
    if (!validate(this.state, 'ledgerAmount')) {
      ToastAndroid.show('Amount is mandatory', ToastAndroid.LONG)
      isError = true
    }
    if (!validate(this.state, 'selectedCategory')) {
      ToastAndroid.show('Category is mandatory', ToastAndroid.LONG)
      isError = true
    }
    if (!isError) {
      const res = await insertLedger(this.state)
      console.log('resrser', res)
      if (res.success) {
        this.setState({
          ledgerName: "",
          ledgerAmount: '',
          selectedCategory: '',
          notes: '',
          selectedDate: '',
          accountId: ''
        })
      }
    }
  }


  render() {
    return (
      <View style={style.paper}>

        <TextInput
          style={style.inputText}
          onChangeText={ledgerName => this.setState({ledgerName})}
          placeholder={'Expense'}
          value={this.state.ledgerName}
        />
        <View style={{height: 20}}/>
        <TextInput
          style={style.inputText}
          onChangeText={ledgerAmount => this.setState({ledgerAmount})}
          placeholder={'0.00'}
          keyboardType={'decimal-pad'}
          value={this.state.ledgerAmount + ''}
        />
        <View style={{height: 20}}/>
        <Picker
          selectedValue={this.state.selectedCategory}
          style={{height: 50}}
          onValueChange={selectedCategory => this.setState({selectedCategory})}>
          {
            this.state.category.map(a => <Picker.Item label={a} value={a} key={a}/>)
          }
        </Picker>

        <TextInput
          style={{borderWidth: 1}}
          multiline
          numberOfLines={16}
          onChangeText={notes => this.setState({notes})}
          editable
          maxLength={200}
        />

        <View>
          <Text>Date</Text>
        </View>

        <FabButton
          text="*"
          onPress={() => this.handleOnSave()}
          // style={{backgroundColor: Color.blue}}
        />
      </View>
    )
  }
}

export default InsertLedger


const validate = (obj, key) => {
  if (obj.hasOwnProperty(key)) {
    const value = obj[key]
    if (typeof value === 'string' && !value.length) {
      return false
    } else if (typeof value === 'number' && !(value > 0))
      return false
    return true
  }
  return false
}