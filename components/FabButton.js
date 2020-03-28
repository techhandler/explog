import React, { Component } from 'react'
import { Text, TouchableOpacity } from "react-native"
import { Color } from '../Constants'

const styles = {
  button: {
    position: 'absolute',
    backgroundColor: '#4a6c8c',
    width: 60,
    height: 60,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    right: 30,
    bottom: 35,
    borderRadius: 50,
    borderBottomWidth: 2,
    borderRightWidth: 1,
    borderColor: '#c9dbec'
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