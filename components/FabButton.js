import React, {Component} from 'react'
import {Text, TouchableOpacity} from "react-native"
import {Color} from './Constants';

const style = {
  button: {
    position: 'absolute',
    backgroundColor: Color.blue,
    width: 60,
    height: 60,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    right: 40,
    bottom: 40,
    borderRadius: 50,
    borderBottomWidth: 2,
    borderRightWidth: 1,
    borderColor: Color.gray
  },
  buttonText: {
    color: Color.white
  }
}

class Fab extends Component {
  render() {
    return (
      <>
      <TouchableOpacity
        style={style.button}
        onPress={this.props.onPress}
        {...this.props}
      >
        <Text style={{...style.buttonText,...this.props.textStyle}}> {this.props.text} </Text>
      </TouchableOpacity>
      </>
    );
  }
}

export default Fab;