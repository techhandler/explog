import React, { useEffect, useState } from 'react'
import { FlatList, Picker, Text, ToastAndroid, View } from "react-native"
import { monthNames } from '../../Constants'
import { fetchAllLedgerForReport } from "../Ledger/common"

const Report = () => {
  let [selectedMonth, setSelectedMonth] = useState(monthNames[new Date().getMonth()])
  let [reportData, setReportData] = useState([])


  useEffect(() => {
    let firstDay = new Date(new Date().getFullYear(), monthNames.indexOf(selectedMonth), 1).toISOString()
    let lastDay = new Date(new Date().getFullYear(), monthNames.indexOf(selectedMonth) + 1, 0).toISOString()
    fetchAllLedgerForReport(firstDay, lastDay).then(({success, result = []}) => {
      if (success) {
        setReportData(result)
      } else {
        ToastAndroid.show('Something went wrong', ToastAndroid.SHORT)
      }
    })
  }, [selectedMonth])

  return (
    <View style={{flex: 1}}>
      <View style={{height: 50, flexDirection: 'row', alignItems: 'center', padding: 15}}>
        <Text style={{flex: 2}}>Select Month : </Text>
        <Picker
          style={{flex: 3}}
          selectedValue={selectedMonth}
          onValueChange={a => setSelectedMonth(a)}>
          {monthNames.map(a => <Picker.Item label={a} value={a} key={a}/>)}
        </Picker>
      </View>
      <View>
        {/*<Text>{*/}
        {/*JSON.stringify(reportData)*/}
        {/*}</Text>*/}
        <Table data={reportData}/>
      </View>
    </View>
  )
}

export default Report


const Table = ({data}) => {
  let totalAmount = data && data.reduce((a, c) => a + Number(c.l_amount), 0)
  return (
    <View style={{padding: 15}}>
      <View style={{alignItems: 'center', flexDirection: 'row', borderBottomWidth:1}}>
        <Text style={{flex: 1}} numberOfLines={1}>Date</Text>
        <Text style={{flex: 2}} numberOfLines={1}>Expense</Text>
        <Text style={{flex: 2, textAlign:'right'}} numberOfLines={1}>Amount</Text>
      </View>
      <FlatList
        // style={styles.view}
        data={data}
        renderItem={({item}) => {
          return <View style={{alignItems: 'center', flexDirection: 'row'}}>
            <Text style={{flex: 1}} numberOfLines={1}>{new Date(item.l_date).getDate()}</Text>
            <Text style={{flex: 2}} numberOfLines={1}>{item.l_name}</Text>
            <Text style={{flex: 2, textAlign:'right'}} numberOfLines={1}>{item.l_amount}</Text>
          </View>
        }}
        keyExtractor={item => item.l_id + ''}
      />
      <Text/>
      <View style={{alignItems: 'center', flexDirection: 'row', borderTopWidth:1, borderBottomWidth:1}}>
        <Text style={{flex: 2}} numberOfLines={1}>Total</Text>
        <Text style={{flex: 2, textAlign:'right'}} numberOfLines={1}>{totalAmount}</Text>
      </View>
    </View>
  )
}