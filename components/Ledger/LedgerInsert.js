import React, { useEffect, useState } from 'react'
import { Picker, Text, TextInput, ToastAndroid, TouchableOpacity, View } from "react-native"
import DateTimePicker from '@react-native-community/datetimepicker'
import FabButton from '../FabButton'
import { monthNames, style } from '../../Constants'
import { fetchAllAccounts } from '../account/accountService'
import { fetchAllCategory } from '../category/categoryService'
import { fetchLedgerDetail, insertLedger, updateLedger } from './common'

export default function LedgerInsert({state, detailMode = false, childData = {ledger: {}}}) {

  let [ledgerId, setLedgerId] = useState('')
  let [ledgerName, setLedgerName] = useState('')
  let [ledgerAmount, setLedgerAmount] = useState('')
  let [ledgerCategory, setLedgerCategory] = useState('')
  let [ledgerNotes, setLedgerNotes] = useState('')
  let [ledgerDate, setLedgerDate] = useState(new Date())
  let [ledgerAccount, setLedgerAccount] = useState('')
  let [allAccounts, setAllAccount] = useState([])
  let [allCategories, setAllCategories] = useState([])
  let [editMode, setEditMode] = useState(!detailMode)
  let [datePickerVisibility, setDatePickerVisibility] = useState(false)

  useEffect(() => {

    if (detailMode) {
      fetchLedgerDetail(childData.ledger).then(({result}) => {
        let {l_id = undefined, l_name = "", l_amount = "", l_description = "", l_date = "", c_id = "", a_id = ""} = result
        setLedgerId(l_id)
        setLedgerName(l_name)
        setLedgerAmount(l_amount)
        setLedgerNotes(l_description)
        setLedgerCategory(c_id)
        setLedgerAccount(a_id)
        setLedgerDate(new Date(l_date))
      })
    }

    fetchAllAccounts().then(({result = []}) => {
      setAllAccount(result)
      if (!detailMode) {
        let accountDefault = result.filter(a => a.is_default)
        setLedgerAccount(accountDefault && accountDefault[0] ? accountDefault[0].a_id : result[0].a_id)
      }
    })
    fetchAllCategory().then(({result}) => {
      setAllCategories(result)
      if (!detailMode) {
        setLedgerCategory(result[0] ? result[0].c_id : "")
      }
    })
  }, [state.currentScreen])

  const handleOnSave = async () => {
    let params = {
      a_id: ledgerAccount,
      l_amount: ledgerAmount,
      l_name: ledgerName,
      l_description: ledgerNotes,
      c_id: ledgerCategory,
      l_date: ledgerDate,
      l_id: ledgerId
    }
    const {success, errorMessage, error} = !detailMode ? await insertLedger(params) : await updateLedger(params)

    console.log('error', error)
    console.log('errorMessage', errorMessage)
    console.log('success in inininii', success)
    if (success) {
      ToastAndroid.show('Expense Saved', ToastAndroid.SHORT)
      if (!detailMode) {
        setLedgerName('')
        setLedgerAmount('')
        setLedgerDate('')
        setLedgerNotes('')
      } else {
        setEditMode(false)
      }
    } else if (!success && errorMessage)
      ToastAndroid.show(errorMessage, ToastAndroid.SHORT)
    else
      ToastAndroid.show('Something went wrong111', ToastAndroid.SHORT)
  }

  const handleDateChange = (e, data) => {
    setDatePickerVisibility(false);
    if(data) setLedgerDate(data)
  }

  const getFormattedDate = (date) => `${monthNames[date.getMonth()] || "-"} ${date.getDate()}, ${date.getFullYear()}`;

  return (
    <View style={style.paper}>
      <TextInput
        style={style.inputText}
        onChangeText={setLedgerName}
        placeholder={'Expense *'}
        value={ledgerName}
        editable={editMode}
      />
      <Text style={{color: '#c9dbec', textAlign: 'right'}}>Expense Name</Text>
      <View style={{height: 20}}/>
      <TextInput
        style={style.inputText}
        onChangeText={t => !isNaN(Number(t)) ? setLedgerAmount(t) : null}
        placeholder={'Amount *'}
        keyboardType={'decimal-pad'}
        editable={editMode}
        value={ledgerAmount + ''}
      />
      <Text style={{color: '#c9dbec', textAlign: 'right'}}>Expense Amount</Text>
      <View style={{height: 20}}/>
      <TextInput
        value={ledgerNotes + ''}
        style={style.inputText}
        placeholder={'Note'}
        multiline
        numberOfLines={1}
        onChangeText={setLedgerNotes}
        editable={editMode}
        maxLength={200}
      />
      <Text style={{color: '#c9dbec', textAlign: 'right'}}>Description [If Any]</Text>
      <View style={{height: 20}}/>

      <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
        <Text style={{flex: 1, textAlignVertical: 'center'}}>Date</Text>
        <TouchableOpacity
          style={{flex: 2}}
          disabled={!editMode}
          onPress={()=>setDatePickerVisibility(true)}>
          <Text>{getFormattedDate(ledgerDate)}</Text>
        </TouchableOpacity>
        {datePickerVisibility && <DateTimePicker
          value={ledgerDate}
          mode='default'
          display='default'
          onChange={handleDateChange}/>}
      </View>

      <View style={{height: 20}}/>



      <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
        <Text style={{flex: 1, textAlignVertical: 'center'}}>Category</Text>
        <Picker
          enabled={editMode}
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
          enabled={editMode}
          selectedValue={ledgerAccount}
          style={{height: 40, flex: 2}}
          onValueChange={a => setLedgerAccount(a)}>
          {allAccounts.map(a => <Picker.Item label={a.a_name} value={a.a_id} key={a.a_id}/>)}
        </Picker>
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
        style={{}}
        onPress={() => handleOnSave()}
      />}
    </View>
  )
}