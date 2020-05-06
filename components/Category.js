import React, { Component } from 'react'
import { Text, View, StyleSheet, FlatList, TouchableOpacity, TextInput, Button } from "react-native"
import { Color, currentScreen, monthNames, style } from '../Constants'
import FabButton from './FabButton'
import { fetchAllCategory } from "../db"


const styles = StyleSheet.create({
  view: {flex: 1},
  insertScreen: {
    flex: 1,
    borderTopWidth: 1,
    backgroundColor: '#4a6c8c88',
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  panel: {
    flex: 1,
    backgroundColor: Color.white
  },
  item: {},
  title: {
    flex: 1
  }
})


class Category extends Component {
  state = {categoryData: [], insertScreen: false, newCategory: ""}

  async componentDidMount() {
    console.log("eeeee")
    let {result: categoryData} = await fetchAllCategory()
    this.setState({categoryData})
  }

  render() {
    return (
      <View style={styles.view}>
        <View style={styles.panel}>

          <FlatList
            data={this.state.categoryData}
            renderItem={({item, index}) => (
              <View><Item
                id={item.categoryId}
                data={item}
                index={index}
              />
                <View style={{height: 0, backgroundColor: Color.white}}/>
              </View>
            )}
            keyExtractor={item => item.categoryId + ''}
            // extraData={selected}
          />

        </View>
        {
          this.props.state.currentScreen === currentScreen.insertCategory &&
          <View style={this.props.state.currentScreen === currentScreen.insertCategory ? styles.insertScreen : {}}>
            <View style={{height: 120, width: '90%', backgroundColor: 'white', padding: 20, borderRadius: 2}}>
              <Text style={{fontSize: 18, flex: 1, color: '#4a6c8c'}}>Add Category</Text>
              <TextInput
                style={{borderBottomWidth: 1, padding: 5, fontSize: 18}}
                onChangeText={newCategory => this.setState({newCategory})}
                placeholder={'Category Name'}
                value={this.state.newCategory}
              />
            </View>
          </View>
        }
        {this.props.state.currentScreen !== currentScreen.insertCategory && <FabButton
          text={'+'}
          onPress={() => this.props.setGlobalState({
            currentScreen: currentScreen.insertCategory,
            stack: [this.props.state.currentScreen, ...this.props.state.stack]
          })

          }
          textStyle={{fontSize: 40}}
        />}
        {this.props.state.currentScreen === currentScreen.insertCategory && <FabButton
          text='&#10003;'
          onPress={() => console.log("tick pressed")}
          textStyle={{fontSize: 35, color: '#4a6c8c'}}
          style={{backgroundColor: '#dfebf7', borderColor: '#4a6c8c'}}
        />}
      </View>
    )
  }
}

export default Category

function Item({id, onPress, data: {categoryName}}) {
  return (
    <View style={{borderBottomWidth: 1, borderColor: '#c9dbec', padding: 10}}>
      <Text style={{fontSize: 18, color: '#4a6c8c', paddingLeft: 15}}>{categoryName}</Text>
    </View>
  )
}