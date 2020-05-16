import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { currentScreen } from "../Constants"

const Footer = (props) => {
  return (
    <View style={styles.footer}>
      <TouchableOpacity
        style={[styles.items, props.currentScreen === currentScreen.ledger ? {backgroundColor: '#c9dbec'} : null]}
        onPress={() => props.setGlobalState({currentScreen: currentScreen.ledger})}>
        <Text>Expense</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.items, props.currentScreen === currentScreen.account ? {backgroundColor: '#c9dbec'} : null]}
        onPress={() => props.setGlobalState({currentScreen: currentScreen.account})}>
        <Text>Account</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.items, props.currentScreen === currentScreen.category ? {backgroundColor: '#c9dbec'} : null]}
        onPress={() => props.setGlobalState({currentScreen: currentScreen.category})}>
        <Text>Category</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.items, props.currentScreen === currentScreen.report ? {backgroundColor: '#c9dbec'} : null]}
        onPress={() => props.setGlobalState({currentScreen: currentScreen.report})}>
        <Text>Report</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Footer

const styles = StyleSheet.create({
  footer: {
    backgroundColor: '#dfebf7',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  items: {
    flex: 1,
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 15,
    paddingTop: 15
  }
})