import React, { Component } from 'react'
import { Text, View, TextInput, FlatList, Picker, Alert, ToastAndroid } from "react-native"
import FabButton from '../FabButton'
import { Color, style } from '../../Constants'
import { insertLedger, fetchAllAccounts, fetchAllCategories } from '../../db'
import { isValid } from './common'

let initialState = {
  ledgerName: "",
  ledgerAmount: '',
  ledgerCategory: '',
  ledgerNotes: '',
  ledgerDate: '',
  accountId: ''
}

class LedgerInsert extends Component {
  state = {
    category: [],
    accounts: [],
    showCalender: false
  }

  async componentDidMount() {
    const {result: accounts} = await fetchAllAccounts()
    let accountDefault = accounts.filter(a => a.defaultAccount)
    accountDefault = accountDefault && accountDefault[0] ? accountDefault[0] : accounts[0]
    const {result: category} = await fetchAllCategories()

    if (this.props.childData && this.props.childData.ledger) {
      this.setState({accounts, category, ...this.props.childData.ledger})
    } else
      this.setState({...initialState, accounts, category, accountId: accountDefault.accountId})
  }

  handleOnSave = async () => {
    if (isValid({...this.state})) {
      const res = await insertLedger(this.state)
      if (res.success) {
        ToastAndroid.show('Expense Saved', ToastAndroid.SHORT)
        this.setState({...initialState})
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
        <TextInput
          value={this.state.ledgerNotes + ''}
          style={style.inputText}
          placeholder={'Description (if any)'}
          multiline
          numberOfLines={1}
          onChangeText={ledgerNotes => this.setState({ledgerNotes})}
          editable
          maxLength={200}
        />
        <View style={{height: 20}}/>

        <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
          <Text style={{flex: 1, textAlignVertical: 'center'}}>Category</Text>
          <Picker
            style={{height: 40, flex: 2}}
            selectedValue={this.state.ledgerCategory}
            onValueChange={ledgerCategory => this.setState({ledgerCategory})}>
            {
              this.state.category.map(a => <Picker.Item label={a.categoryName} value={a.categoryId}
                                                        key={a.categoryId}/>)
            }
          </Picker>
        </View>

        <View style={{height: 10}}/>
        <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
          <Text style={{flex: 1, textAlignVertical: 'center'}}>Account</Text>
          <Picker
            selectedValue={this.state.accountId}
            style={{height: 40, flex: 2}}
            onValueChange={accountId => this.setState({accountId})}>
            {
              this.state.accounts.map(a => <Picker.Item label={a.accountName} value={a.accountId} key={a.accountId}/>)
            }
          </Picker>
        </View>
        <View style={{height: 20}}/>
        <View>
          <Text>Date</Text>
        </View>

        <View style={{height: 20}}/>

        <FabButton
          text="&#10003;"
          textStyle={{fontSize: 30}}
          style={{}}
          onPress={() => this.handleOnSave()}
        />
      </View>
    )
  }
}

export default LedgerInsert