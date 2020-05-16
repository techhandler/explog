import React, { useEffect, useState } from 'react'
import { FlatList, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from "react-native"
import { Color, currentScreen, monthNames } from '../../Constants'
import FabButton from '../FabButton'
import { fetchAllLedger } from "./common"

const styles = StyleSheet.create({
  view: {flex: 1},
  panel: {
    flex: 1,
    backgroundColor: Color.white
  },
  item: {
    flexDirection: 'row',
    backgroundColor: Color.white,
    borderTopWidth: 1,
    borderColor: '#c9dbec',
    height: 64
  },
  title: {
    flex: 1
  }
})


export default function Ledger(props) {
  let [ledgerData, setLedgerData] = useState([])
  let dateOnBar = ''

  useEffect(() => {
    fetchAllLedger().then(({success, result = []}) => {
      if (success) {
        setLedgerData(result)
      } else {
        ToastAndroid.show('Something went wrong', ToastAndroid.SHORT)
      }
    })
  }, [props.state.currentScreen])

  return (
    <View style={styles.view}>
      <View style={styles.panel}>
        <FlatList
          data={ledgerData}
          renderItem={({item, index}) => (
            <View><Item
              id={item.l_id}
              data={item}
              index={index}
              onPress={() => props.setGlobalState({
                currentScreen: currentScreen.detailLedger,
                stack: [props.state.currentScreen, ...props.state.stack],
                childData: {ledger: item}
              })}
              showDateBar={() => {
                if (dateOnBar !== getFormattedDate(item.l_date) || index === 0) {
                  dateOnBar = getFormattedDate(item.l_date)
                  return true
                }
              }}
            />
              <View style={{height: 0, backgroundColor: Color.white}}/>
            </View>
          )}
          keyExtractor={item => item.l_id + ''}
          // extraData={selected}
        />
      </View>
      <FabButton
        text={'+'}
        onPress={() => props.setGlobalState({
          currentScreen: currentScreen.insertLedger,
          stack: [props.state.currentScreen, ...props.state.stack]
        })
        }
        textStyle={{fontSize: 40}}
      />
    </View>
  )
}

function Item({id, onPress, data: {l_name, l_amount, l_date, l_description}, index, showDateBar}) {
  l_date = new Date(l_date)
  return (
    <>
      {
        showDateBar() &&
        <View style={{backgroundColor: '#c9dbec'}}><Text style={{textAlign: 'center', fontSize:10}}>{getFormattedDate(l_date)}</Text></View>
      }
      <TouchableOpacity
        onPress={onPress}
        style={[styles.item]}>
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Text style={{fontSize: 18, color: '#4a6c8c'}}>{l_amount}</Text>
        </View>
        <View style={{width: 1, backgroundColor: '#c9dbec', height: '100%'}}>
          <View style={{
            backgroundColor: '#c9dbec',
            width: 12,
            height: 12,
            borderRadius: 26,
            position: 'absolute',
            top: -8,
            left: -6,
            borderWidth: 2,
            borderColor: '#4a6c8c'
          }}/>
        </View>
        <View style={{flex: 3, paddingLeft: 25, justifyContent: 'center', height: '100%'}}>
          <Text style={{fontSize: 16, color: '#4a6c8c'}}>{l_name}</Text>
          {l_description
            ? <Text style={{fontSize: 12, color: '#4a6c8c', paddingRight: 10}} numberOfLines={1}>{l_description}</Text>
            : <></>}
        </View>
      </TouchableOpacity>
    </>
  )
}

const getFormattedDate = (date) => {
  date = date ? new Date(date) : date
  return date ? `${monthNames[date.getMonth()] || "-"} ${date.getDate()}, ${date.getFullYear()}` : ""
}