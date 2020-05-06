import React, { Component } from 'react'
import { Text, View, TextInput, FlatList, Picker, Alert, ToastAndroid } from "react-native"
import FabButton from '../FabButton'
import { Color, style } from '../../Constants'
import { insertLedger, fetchAllAccounts, fetchAllCategories } from '../../db'

let initialState = {
  ledgerName: "",
  ledgerAmount: '',
  ledgerCategory: '',
  ledgerNotes: '',
  ledgerDate: '',
  accountId: ''
}

class LedgerDetail extends Component {
  state = {
    category: [],
    accounts: [],
    showCalender: false
  }

  async componentDidMount() {
    const {result : accounts} = await fetchAllAccounts()
    let accountDefault = accounts.filter(a=>a.defaultAccount);
    accountDefault = accountDefault && accountDefault[0] ? accountDefault[0] : accounts[0];
    const {result : category} = await fetchAllCategories()

    if(this.props.childData && this.props.childData.ledger){
      this.setState({ accounts, category, ...this.props.childData.ledger});
    }
    else
      this.setState({...initialState, accounts, category, accountId:accountDefault.accountId})
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
    if (!validate(this.state, 'ledgerCategory')) {
      ToastAndroid.show('Category is mandatory', ToastAndroid.LONG)
      isError = true
    }
    if (!isError) {
      const res = await insertLedger(this.state)
      if (res.success) {
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
        <Picker
          selectedValue={this.state.ledgerCategory}
          style={{height: 50}}
          onValueChange={ledgerCategory => this.setState({ledgerCategory})}>
          {
            this.state.category.map(a => <Picker.Item label={a.categoryName} value={a.categoryId} key={a.categoryId}/>)
          }
        </Picker>

        <TextInput
          value={this.state.ledgerNotes + ''}
          style={{borderWidth: 1}}
          multiline
          numberOfLines={16}
          onChangeText={ledgerNotes => this.setState({ledgerNotes})}
          editable
          maxLength={200}
        />

        <Picker
          selectedValue={this.state.accountId}
          style={{height: 50}}
          onValueChange={accountId => this.setState({accountId})}>
          {
            this.state.accounts.map(a => <Picker.Item label={a.accountName} value={a.accountId} key={a.accountId}/>)
          }
        </Picker>

        <View>
          <Text>Date</Text>
        </View>

        <FabButton
          text="&#9998;"
          textStyle={{fontSize:30}}
          style={{}}
          onPress={() => this.handleOnSave()}
        />
      </View>
    )
  }
}

export default LedgerDetail


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