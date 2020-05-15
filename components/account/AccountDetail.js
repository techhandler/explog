import React, { useEffect, useState } from 'react'
import { FlatList, Text, TextInput, ToastAndroid, TouchableOpacity, View } from "react-native"
import { currentScreen, monthNames } from "../../Constants"
import { amountTransaction, fetchAccountDetail } from './accountService'
import FabButton from "../FabButton"

export default function AccountDetail({childData = {account: {}}, setGlobalState, state: propsState, goBack}) {

  let [aId, setAId] = useState('')
  let [accountName, setAccountName] = useState('')
  let [accountAmount, setAccountAmount] = useState('')
  let [accountLogs, setAccountLogs] = useState([])
  let [isDefault, setIsDefault] = useState(false)
  let [flexScreenOption, setFlexScreenOption] = useState('')
  let logDate = ""

  const getFormattedDate = (date) => date && date.toString() !== 'Invalid Date' ? `${monthNames[date.getMonth()] || "-"} ${date.getDate()}, ${date.getFullYear()}` : ""

  useEffect(() => {
    fetchAccountDetail(childData.account).then(({success, result}) => {
      if (success) {
        setAId(result.a_id)
        setAccountName(result.a_name)
        setAccountAmount(result.a_amount)
        setAccountLogs(result.logs)
        setIsDefault(Boolean(result.is_default))
      }
    })
  }, [propsState.currentScreen])

  return (
    <>
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
          <Text style={styles.historyLabel}>History</Text>
          <View style={{flexDirection: 'row', padding: 5, borderBottomWidth: 1, borderColor: 'grey'}}>
            <Text style={styles.timeColumn}>Note</Text>
            <Text style={styles.creditColumn}>Deposit</Text>
            <Text style={styles.withdrawColumn}>Withdraw</Text>
          </View>
          <FlatList
            style={{flex: 1}}
            data={accountLogs}
            renderItem={({item, index}) => {
              let rowItem = [], lD = getFormattedDate(new Date(item.log_date))
              if (logDate !== lD || index === 0) {
                logDate = lD
                rowItem.push(<View key={lD} style={{backgroundColor: '#dfebf7'}}>
                  <Text style={styles.timeRow}>{lD}</Text>
                </View>)
              }
              rowItem.push(
                <View key={index}
                      style={{flexDirection: 'row', padding: 7, borderBottomWidth: 1, borderColor: '#c9dbec'}}>
                  <Text style={styles.timeColumn}>{item.log_comments || ""}</Text>
                  <Text style={styles.creditColumn}>{item.cr_amount || ""}</Text>
                  <Text style={styles.withdrawColumn}>{item.dr_amount || ""}</Text>
                </View>)
              return (<View>{rowItem}</View>)
            }}
            keyExtractor={item => '' + item.log_id}
          />
        </View>
      </View>
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.footerItems}
          onPress={() => {
            setGlobalState({
              currentScreen: currentScreen.amountTransactionInAccount,
              stack: [propsState.currentScreen, ...propsState.stack]
            })
            setFlexScreenOption('Deposit')
          }}><Text style={{textAlign: 'center', color: '#4a6c8c'}}>Deposit Money</Text></TouchableOpacity>
        <TouchableOpacity
          style={styles.footerItems}
          onPress={() => {
            setGlobalState({
              currentScreen: currentScreen.amountTransactionInAccount,
              stack: [propsState.currentScreen, ...propsState.stack]
            })
            setFlexScreenOption('Withdraw')
          }}><Text style={{textAlign: 'center', color: '#4a6c8c'}}>Withdraw Money</Text></TouchableOpacity>
      </View>
      {
        propsState.currentScreen === currentScreen.amountTransactionInAccount &&
        <FlexScreen
          screenLabel={flexScreenOption}
          onSubmit={async (params) => {
            let {success, errorMessage} = await amountTransaction(params, flexScreenOption, aId)
            if (success) {
              ToastAndroid.show('Saved', ToastAndroid.SHORT)
              goBack && goBack()
            } else if (!success && errorMessage)
              ToastAndroid.show(errorMessage, ToastAndroid.SHORT)
            else
              ToastAndroid.show('Something went wrong', ToastAndroid.SHORT)
          }}/>
      }</>
  )
}

const styles = {
  accountName: {fontSize: 32, padding: 15, color: '#4a6c8c'},
  accountStatus: {textAlign: 'right', padding: 10, color: '#4a6c8c'},
  accountAmount: {fontSize: 24, textAlign: 'right', color: '#4a6c8c', paddingRight: 15},
  historyLabel: {paddingTop: 35, paddingBottom: 6, fontSize: 20, textAlign: 'center', color: '#4a6c8c'},
  dateColumn: {flex: 3, color: '#4a6c8c', fontSize: 16},
  timeColumn: {flex: 2, textAlign: 'left', color: '#4a6c8c', fontSize: 16},
  creditColumn: {flex: 1, textAlign: 'right', color: '#4a6c8c', fontSize: 16},
  withdrawColumn: {flex: 1, textAlign: 'right', color: '#4a6c8c', fontSize: 16},
  footer: {backgroundColor: '#dfebf7', flexDirection: 'row', justifyContent: 'center'},
  footerItems: {flex: 1, alignItems: 'center', padding: 15},
  flexScreen: {
    flex: 1,
    borderTopWidth: 1,
    backgroundColor: '#4a6c8cbf',
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  timeRow: {color: '#4a6c8c', textAlign: 'center'}
}

const FlexScreen = ({screenLabel, onSubmit}) => {

  let [amount, setAmount] = useState('')
  let [remarks, setRemarks] = useState('')

  return (
    <>
      <View style={styles.flexScreen}>
        <View style={{height: 200, width: '90%', backgroundColor: 'white', padding: 20, borderRadius: 2}}>
          <Text style={{fontSize: 22, flex: 1, color: '#4a6c8c'}}>{screenLabel} Amount</Text>
          <TextInput
            style={{borderBottomWidth: 1, borderBottomColor: '#c9dbec', padding: 5, fontSize: 18}}
            onChangeText={(tx) => !isNaN(Number(tx)) ? setAmount(tx) : null}
            placeholder={'Amount *'} value={amount}
            keyboardType={'decimal-pad'}
            maxLength={10}
          />
          <Text style={{color: '#c9dbec', textAlign: 'right'}}>{screenLabel} Amount</Text>
          <TextInput
            style={{borderBottomWidth: 1, borderBottomColor: '#c9dbec', padding: 5, fontSize: 18}}
            onChangeText={setRemarks}
            placeholder={'Note'}
            value={remarks}
          />
          <Text style={{color: '#c9dbec', textAlign: 'right'}}>Note [If Any]</Text>
        </View>
      </View>
      <FabButton
        text='&#10003;'
        onPress={() => onSubmit({amount, remarks})}
        textStyle={{fontSize: 35, color: '#4a6c8c'}}
        style={{backgroundColor: '#dfebf7', borderColor: '#4a6c8c'}}
      />
    </>
  )
}