import React, { Component } from 'react'
import { Text, TouchableOpacity } from "react-native"
import { Color } from '../Constants'

const styles = {
  button: {
    position: 'absolute',
    backgroundColor: Color.blue,
    width: 60,
    height: 60,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    right: 50,
    bottom: 65,
    borderRadius: 50,
    borderBottomWidth: 2,
    borderRightWidth: 1,
    borderColor: Color.gray
  },
  buttonText: {
    color: Color.white
  }
}

const Fab = ({style, textStyle, text, onPress, ...rest}) => <>
  <TouchableOpacity
    style={{...styles.button, ...style}}
    onPress={onPress}
    {...rest}
  >
    <Text style={{...styles.buttonText, ...textStyle}}> {text} </Text>
  </TouchableOpacity>
</>


export default Fab