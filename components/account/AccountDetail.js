import React, { useEffect, useState } from 'react'
import { Text, View, TextInput, FlatList, Picker, Alert, ToastAndroid, TouchableOpacity } from "react-native"
import { currentScreen, style } from "../../Constants"
import { fetchAccountDetail } from './accountService'

export default function AccountDetail({childData = {}}) {

  let [accountName, setAccountName] = useState('')
  let [accountAmount, setAccountAmount] = useState('')
  let [accountLogs, setAccountLogs] = useState([])
  let [isDefault, setIsDefault] = useState(false)

  useEffect(() => {
    fetchAccountDetail(childData.account).then(({success, result}) => {
      if (success) {
        setAccountName(result.a_name)
        setAccountAmount(result.a_amount)
        setAccountLogs(result.logs);
        setIsDefault(Boolean(result.is_default));
      } else
        console.log("catch-----", err)
    })
  }, [childData.id])

  return (
    <View style={{flex: 1, padding: 10}}>
      <View style={{flex: 3, backgroundColor: '#c9dbec', justifyContent: 'space-between'}}>
        <Text style={styles.accountStatus}>{isDefault ? 'Default Account' : ''}</Text>
        <Text
          style={styles.accountName}
        >{accountName}</Text>
      </View>
      <View style={{flex: 1, borderColor: '#c9dbec', borderWidth: 1, justifyContent: 'center'}}>
        <Text
          style={styles.accountAmount}
        >{accountAmount}</Text>
      </View>
      <View style={{flex: 6}}>
        <Text style={{
          paddingTop: 35,
          paddingBottom: 6,
          fontSize: 20,
          textAlign: 'center',
          color: '#4a6c8c'
        }}>History</Text>
        <View style={{flexDirection: 'row', padding: 5, borderBottomWidth: 1, borderColor: 'grey'}}>
          <Text style={styles.dateColumn}>Date</Text>
          <Text style={styles.creditColumn}>Credit</Text>
          <Text style={styles.withdrawColumn}>Withdraw</Text>
        </View>
        {
          accountLogs.map((a, i) => {
            return (
              <View key={i} style={{flexDirection: 'row', padding: 7, borderBottomWidth: 1, borderColor: '#c9dbec'}}>
                <Text style={styles.dateColumn}>{new Date(Number(a.log_date)).toDateString()}</Text>
                <Text style={styles.creditColumn}>{a.cr_amount || ""}</Text>
                <Text style={styles.withdrawColumn}>{a.dr_amount || ""}</Text>
              </View>)
          })
        }
      </View>
    </View>
  )
}

const styles = {
  accountName: {fontSize: 32, padding: 15, color: '#4a6c8c'},
  accountStatus: { textAlign:'right', padding: 10, color: '#4a6c8c'},
  accountAmount: {fontSize: 24, textAlign: 'right', color: '#4a6c8c', paddingRight: 15},
  dateColumn: {flex: 3, color: '#4a6c8c', fontSize: 16},
  creditColumn: {flex: 1, color: '#4a6c8c', fontSize: 16},
  withdrawColumn: {flex: 1, textAlign: 'right', color: '#4a6c8c', fontSize: 16}
}