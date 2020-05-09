import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { currentScreen } from "../Constants"

const Footer = (props) => {
  return (
    <View style={styles.footer}>
      <TouchableOpacity
        style={[styles.items, props.currentScreen === currentScreen.ledger ? {backgroundColor: '#c9dbec'} : null]}
        onPress={() => props.setGlobalState({currentScreen: currentScreen.ledger})}>
        <Text>Expenses</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.items, props.currentScreen === currentScreen.account ? {backgroundColor: '#c9dbec'} : null]}
        onPress={() => props.setGlobalState({currentScreen: currentScreen.account})}>
        <Text>Accounts</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.items, props.currentScreen === currentScreen.category ? {backgroundColor: '#c9dbec'} : null]}
        onPress={() => props.setGlobalState({currentScreen: currentScreen.category})}>
        <Text>Categories</Text>
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
    padding: 15
  }
})