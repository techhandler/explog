import React, {Component} from 'react'
import {Text, View, StyleSheet, FlatList, TouchableOpacity} from "react-native"
import {Color, currentScreen, style} from './Constants';
import FabButton from './FabButton';


const styles = StyleSheet.create({
  view: {flex: 1},
  panel: {
    flex: 1,
  },
  item: {
    padding: 30,
    fontSize: 16,
  }
})


class Ledger extends Component {
  state = {
    data: [
      {id: '1', title: 'First Item'},
      {id: '2', title: 'Second Item'},
      {id: '3', title: 'Third Item'},
      {id: '4', title: 'Fourth Item'},
      {id: '5', title: 'Fifth Item'},
      {id: '6', title: 'Sixth Item'},
      {id: '7', title: 'Seventh Item'},
      {id: '8', title: 'Eighth Item'},
      {id: '9', title: 'Ninth Item'},
      {id: '10', title: 'Tenth Item'},
      {id: '11', title: 'Eleven Item'},
      {id: '12', title: 'Twelve Item'},
      {id: '13', title: 'Thirteen Item'},
      {id: '14', title: 'Fourteen Item'},
    ]
  }


  render() {
    return (
      <View style={styles.view}>
        <View style={styles.panel}>


          <FlatList
            data={this.state.data}
            renderItem={({item}) => (
              <View><Item
                id={item.id}
                title={item.title}
                // selected={!!selected.get(item.id)}
                // onSelect={onSelect}
              />
                <View style={{height: 1, backgroundColor: Color.gray}}/>
              </View>
            )}
            keyExtractor={item => item.id}
            // extraData={selected}
          />


        </View>
        <FabButton
          text={'+'}
          onPress={() => this.props.setGlobalState({
              currentScreen: currentScreen.insertLedger,
              stack: [this.props.state.currentScreen, ...this.props.state.stack]
            })
          }
          textStyle={{fontSize: 40}}
        />
      </View>
    )
  }
}

export default Ledger

function Item({id, title, selected, onSelect}) {
  return (
    <TouchableOpacity
      onPress={() => console.log(id)}
      style={[
        styles.item,
        // {backgroundColor: selected ? '#6e3b6e' : '#f9c2ff'}
      ]}
    >
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  )
}