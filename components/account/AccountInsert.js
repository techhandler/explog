import React, { useState } from 'react'
import { Text, View, TextInput, FlatList, CheckBox, ToastAndroid, TouchableOpacity } from "react-native"
import FabButton from '../FabButton'
import { insertAccount } from "./accountService"

const AccountInsert = (props) => {
  let [accountName, setAccountName] = useState('')
  let [accountAmount, setAccountAmount] = useState('')
  let [isDefault, setIsDefault] = useState(false)

  return (
    <View style={{flex: 1, padding: 10}}>
      <View style={{flex: 3, backgroundColor: '#c9dbec', justifyContent: 'flex-end'}}>
        <TextInput
          style={styles.accountName}
          onChangeText={setAccountName}
          placeholder={'Account Name'}
          value={accountName}
        />
      </View>
      <View style={{flex: 1, borderColor: '#c9dbec', borderWidth: 1, justifyContent: 'center'}}>
        <TextInput
          style={styles.accountAmount}
          onChangeText={setAccountAmount}
          placeholder={'Amount'}
          value={accountAmount}
        />
      </View>
      <CheckBox value={isDefault} onValueChange={setIsDefault}/><Text>Mark As Default</Text>
      <View style={{flex: 6}}>
      </View>
      <FabButton
        text='&#10003;'
        onPress={async () => {
          let {success} = await insertAccount({accountAmount, accountName, isDefault})
          if (success) {
            ToastAndroid.show('Account Saved', ToastAndroid.SHORT)
            props.goBack && props.goBack()
          }
        }
        }
        textStyle={{fontSize: 35, color: '#4a6c8c'}}
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
  withdrawColumn: {flex: 1, textAlign: 'right', color: '#4a6c8c', fontSize: 16}
}