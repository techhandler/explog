import React, { useEffect, useState } from 'react'
import { Text, View, TextInput, FlatList, Picker, Alert, ToastAndroid } from "react-native"
import FabButton from '../FabButton'
import { Color, style } from '../../Constants'
import { fetchAllAccounts } from '../account/accountService'
import { fetchAllCategory } from '../category/categoryService'
import { insertLedger } from './common'

export default LedgerInsert = ({state}) => {
  let [ledgerName, setLedgerName] = useState('')
  let [ledgerAmount, setLedgerAmount] = useState('')
  let [ledgerCategory, setLedgerCategory] = useState('')
  let [ledgerNotes, setLedgerNotes] = useState('')
  let [ledgerDate, setLedgerDate] = useState('')
  let [ledgerAccount, setLedgerAccount] = useState('')
  let [allAccounts, setAllAccount] = useState([])
  let [allCategories, setAllCategories] = useState([])


  useEffect(() => {
    fetchAllAccounts().then(({result = []}) => {
      setAllAccount(result)
      let accountDefault = result.filter(a => a.is_default)
      setLedgerAccount(accountDefault && accountDefault[0] ? accountDefault[0].a_id : result[0].a_id)
    })
    fetchAllCategory().then(({result}) => {
      setAllCategories(result)
      setLedgerCategory(result[0] ? result[0].c_id : "");
    })
  }, [state.currentScreen])

  const handleOnSave = async () => {
    const {success, errorMessage, result} = await insertLedger({
      ledgerAccount,
      ledgerAmount,
      ledgerName,
      ledgerNotes,
      ledgerCategory,
      ledgerDate
    })

    if (success) {
      ToastAndroid.show('Expense Saved', ToastAndroid.SHORT)
      setLedgerName('');
      setLedgerAmount('');
      setLedgerDate('');
      setLedgerNotes('');

    } else if (!success && errorMessage)
      ToastAndroid.show(errorMessage, ToastAndroid.SHORT)
    else
      ToastAndroid.show('Something went wrong', ToastAndroid.SHORT)


  }


  return (
    <View style={style.paper}>
      <TextInput
        style={style.inputText}
        onChangeText={setLedgerName}
        placeholder={'Expense'}
        value={ledgerName}
      />
      <View style={{height: 20}}/>
      <TextInput
        style={style.inputText}
        onChangeText={setLedgerAmount}
        placeholder={'0.00'}
        keyboardType={'decimal-pad'}
        value={ledgerAmount + ''}
      />
      <View style={{height: 20}}/>
      <TextInput
        value={ledgerNotes + ''}
        style={style.inputText}
        placeholder={'Description (if any)'}
        multiline
        numberOfLines={1}
        onChangeText={setLedgerNotes}
        editable
        maxLength={200}
      />
      <View style={{height: 20}}/>

      <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
        <Text style={{flex: 1, textAlignVertical: 'center'}}>Category</Text>
        <Picker
          style={{height: 40, flex: 2}}
          selectedValue={ledgerCategory}
          onValueChange={a => setLedgerCategory(a)}>
          {allCategories.map(a => <Picker.Item label={a.c_name} value={a.c_id} key={a.c_id}/>)}
        </Picker>
      </View>

      <View style={{height: 10}}/>
      <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
        <Text style={{flex: 1, textAlignVertical: 'center'}}>Account</Text>
        <Picker
          selectedValue={ledgerAccount}
          style={{height: 40, flex: 2}}
          onValueChange={a => setLedgerAccount(a)}>
          {allAccounts.map(a => <Picker.Item label={a.a_name} value={a.a_id} key={a.a_id}/>)}
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
        onPress={() => handleOnSave()}
      />
    </View>
  )
}