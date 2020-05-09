import React, { useEffect, useState } from 'react'
import { Text, View, StyleSheet, FlatList, TouchableOpacity, ToastAndroid } from "react-native"
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
    paddingTop: 2,
    paddingBottom: 2,
    flexDirection: 'row',
    backgroundColor: Color.white,
    borderTopWidth: 1,
    borderColor: '#c9dbec'
  },
  title: {
    flex: 1
  }
})


export default function Ledger(props) {
  let [ledgerData, setLedgerData] = useState([])

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

function Item({id, onPress, data: {l_name, l_amount, l_date}, index}) {
  l_date = new Date(l_date)
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.item]}>
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', paddingTop: 12, paddingBottom: 12}}>
        <Text style={{fontSize: 22, color: '#4a6c8c'}}>{l_amount}</Text>
      </View>
      <View style={{width: 1, backgroundColor: '#c9dbec', height: '100%'}}>
        {index !== 0 && <View style={{
          backgroundColor: '#c9dbec',
          width: 12,
          height: 12,
          borderRadius: 26,
          position: 'absolute',
          top: -8,
          left: -6,
          borderWidth: 2,
          borderColor: '#4a6c8c'
        }}/>}
      </View>
      <View style={{flex: 3, paddingTop: 12, paddingBottom: 12, paddingLeft: 25}}>
        <Text style={{fontSize: 22, color: '#4a6c8c'}}>{l_name}</Text>
        <Text style={{fontSize: 14, color: '#4a6c8c'}}>{l_date.getDate()}-{monthNames[l_date.getMonth()]}</Text>
      </View>
    </TouchableOpacity>
  )
}