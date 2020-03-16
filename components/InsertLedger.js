import React, { Component } from 'react'
import { Text, View, TextInput, FlatList, Picker, Alert } from "react-native"
import FabButton from './FabButton'
import { Color, style } from './Constants'
import db from '../db'

class InsertLedger extends Component {
  state = {
    expenseName: "",
    expenseAmount: 0,
    category: ['1', '2', '3', '4'],
    selectedCategory: '',
    notes: '',
    showCalender: false
  }

  handleOnSave = async () => {
    try {
      await db.table('ledger').insert(this.state)
      console.log("value saved")
      console.log(await db.table('ledger').find())
    } catch (e) {
      // saving error
    }
  }


  render() {
    return (
      <View style={style.paper}>


        <TextInput
          style={style.inputText}
          onChangeText={expenseName => this.setState({expenseName})}
          placeholder={'Expense'}
          // value={value}
        />
        <View style={{height: 20}}/>
        <TextInput
          style={style.inputText}
          onChangeText={expenseAmount => this.setState({expenseAmount})}
          placeholder={'0.00'}
          keyboardType={'numeric'}
          // value={value}
        />
        <View style={{height: 20}}/>
        <Picker
          selectedValue={this.state.selectedCategory}
          style={{height: 50}}
          onValueChange={selectedCategory => this.setState({selectedCategory})}>
          {
            this.state.category.map(a => <Picker.Item label={a} value={a} key={a}/>)
          }
        </Picker>

        <TextInput
          style={{borderWidth: 1}}
          multiline
          numberOfLines={16}
          onChangeText={notes => this.setState({notes})}
          editable
          maxLength={200}
        />

        <View>
          <Text>Date</Text>
        </View>

        <FabButton
          text="*"
          onPress={() => this.handleOnSave()}
        />
      </View>
    )
  }
}

export default InsertLedger