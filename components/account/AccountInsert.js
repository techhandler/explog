import React, { useState } from 'react'
import { Text, View, TextInput, FlatList, CheckBox, ToastAndroid, TouchableOpacity, KeyboardAvoidingView } from "react-native"
import FabButton from '../FabButton'
import { insertAccount } from "./accountService"

const AccountInsert = (props) => {
  let [accountName, setAccountName] = useState('')
  let [accountAmount, setAccountAmount] = useState('')
  let [isDefault, setIsDefault] = useState(false)

  return (
    <View style={{flex: 1, padding: 10}}>
      <KeyboardAvoidingView style={{ backgroundColor: '#c9dbec', justifyContent: 'flex-end', height: 200}} behavior={'height'}>
        <TextInput
          style={styles.accountName} onChangeText={setAccountName}
          placeholder={'Account Name'} value={accountName}
          maxLength={35}
        />
      </KeyboardAvoidingView>
      <View style={{ borderColor: '#c9dbec', borderWidth: 1, justifyContent: 'center'}}>
        <TextInput
          style={styles.accountAmount} onChangeText={(tx)=> !isNaN(Number(tx))? setAccountAmount(tx) : null}
          placeholder={'Amount'} value={accountAmount}
          keyboardType={'decimal-pad'}
          maxLength={10}
        />
      </View>
      <View style={styles.checkBoxView}>
        <CheckBox value={isDefault} onValueChange={setIsDefault}/>
        <Text>Mark As Default Account</Text>
      </View>
      <FabButton
        text='&#10003;' textStyle={{fontSize: 35, color: '#4a6c8c'}}
        onPress={async () => {
          let {success, errorMessage} = await insertAccount({accountAmount, accountName, isDefault})
          if (success) {
            ToastAndroid.show('Account Saved', ToastAndroid.SHORT)
            props.goBack && props.goBack()
          }
          else if(!success && errorMessage)
            ToastAndroid.show(errorMessage, ToastAndroid.SHORT)
          else
            ToastAndroid.show('Something went wrong', ToastAndroid.SHORT)
        }
        }
        style={{backgroundColor: '#dfebf7', borderColor: '#4a6c8c'}}
      />
    </View>
  )
}

export default AccountInsert

const styles = {
  accountName: {fontSize: 32, padding: 15, color: '#4a6c8c'},
  accountAmount: {fontSize: 24, textAlign: 'right', color: '#4a6c8c', paddingRight: 15},
  dateColumn: {flex: 3, color: '#4a6c8c', fontSize: 16},
  creditColumn: {flex: 1, color: '#4a6c8c', fontSize: 16},
  withdrawColumn: {flex: 1, textAlign: 'right', color: '#4a6c8c', fontSize: 16},
  checkBoxView: {padding: 5, flexDirection: 'row', alignItems: 'center'}
}