import React, { useState } from 'react'
import { Picker, Text, TextInput, ToastAndroid, View } from "react-native"
import FabButton from '../FabButton'
import { style } from '../../Constants'
import { fetchAllAccounts, fetchAllCategories, insertLedger } from '../../db'
import { isValid } from "./common"

let initialState = {
  ledgerName: "",
  ledgerAmount: '',
  ledgerCategory: '',
  ledgerNotes: '',
  ledgerDate: '',
  accountId: ''
}

export default function LedgerDetail() {

  let [ledgerName, setLedgerName] = useState('')
  let [ledgerAmount, setLedgerAmount] = useState('')
  let [ledgerCategory, setLedgerCategory] = useState('')
  let [ledgerNotes, setLedgerNotes] = useState('')
  let [ledgerDate, setLedgerDate] = useState('')
  let [ledgerAccount, setLedgerAccount] = useState('')
  let [allAccounts, setAllAccount] = useState([])
  let [allCategories, setAllCategories] = useState([])
  let [editMode, setEditMode] = useState(false)

  // async
  // componentDidMount()
  // {
  //   const {result: accounts} = await fetchAllAccounts()
  //   let accountDefault = accounts.filter(a => a.defaultAccount)
  //   accountDefault = accountDefault && accountDefault[0] ? accountDefault[0] : accounts[0]
  //   const {result: category} = await fetchAllCategories()
  //
  //   if (this.props.childData && this.props.childData.ledger) {
  //     this.setState({accounts, category, ...this.props.childData.ledger})
  //   } else
  //     this.setState({...initialState, accounts, category, accountId: accountDefault.accountId})
  // }

  const handleOnSave = async () => {
    if (isValid({...this.state})) {
      const res = await insertLedger(this.state)
      if (res.success) {
        ToastAndroid.show('Expense Updated', ToastAndroid.SHORT)
        this.setState({...initialState, editMode: false})
      }
    }
  }


  return (
    <View style={style.paper}>
      <TextInput
        style={style.inputText}
        onChangeText={setLedgerName}
        placeholder={'Expense *'}
        value={ledgerName}
        editable={editMode}
      />
      <View style={{height: 20}}/>
      <TextInput
        style={style.inputText}
        onChangeText={setLedgerAmount}
        placeholder={'Amount *'}
        keyboardType={'decimal-pad'}
        value={ledgerAmount + ''}
        editable={editMode}
      />
      <View style={{height: 20}}/>
      <TextInput
        value={ledgerNotes + ''}
        style={style.inputText}
        placeholder={'Description (if any)'}
        multiline
        numberOfLines={1}
        onChangeText={setLedgerNotes}
        editable={editMode}
        maxLength={200}
      />
      <View style={{height: 20}}/>

      <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
        <Text style={{flex: 1, textAlignVertical: 'center'}}>Category</Text>
        <Picker
          enabled={this.state.editMode}
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
          enabled={this.state.editMode}
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

      {!editMode && <FabButton
        text="&#9998;"
        textStyle={{fontSize: 30}}
        onPress={() => setEditMode(true)}
      />}

      {editMode && <FabButton
        text="&#10003;"
        textStyle={{fontSize: 30}}
        onPress={() => handleOnSave()}
      />}
    </View>
  )
}