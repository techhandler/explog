import React, { useState, useEffect } from 'react'
import { Text, View, StyleSheet, FlatList, TouchableOpacity, TextInput, Button, ToastAndroid } from "react-native"
import { Color, currentScreen, monthNames, style } from '../../Constants'
import FabButton from '../FabButton'
import { fetchAllCategory, insertCategory } from "./categoryService"

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

export default Category = (props) => {
  let [newCategory, setNewCategory] = useState('');
  let [categoryData, setCategoryData] = useState([]);

  useEffect(()=>{
    fetchAllCategory().then(({result=[]})=>{
      setCategoryData(result)
    }).catch((err)=>{console.log("Errrrincat",err)})
  },[props.state.currentScreen]);

    return (
      <View style={styles.view}>
        <View style={styles.panel}>
          <FlatList
            data={categoryData}
            renderItem={({item, index}) => (
              <View><Item
                id={item.c_id}
                data={item}
                index={index}
              />
                <View style={{height: 0, backgroundColor: Color.white}}/>
              </View>
            )}
            keyExtractor={item => item.c_id + ''}
            // extraData={selected}
          />

        </View>
        {
          props.state.currentScreen === currentScreen.insertCategory &&
          <View style={props.state.currentScreen === currentScreen.insertCategory ? styles.insertScreen : {}}>
            <View style={{height: 120, width: '90%', backgroundColor: 'white', padding: 20, borderRadius: 2}}>
              <Text style={{fontSize: 18, flex: 1, color: '#4a6c8c'}}>Add Category</Text>
              <TextInput
                style={{borderBottomWidth: 1, padding: 5, fontSize: 18}}
                onChangeText={setNewCategory}
                placeholder={'Category Name'}
                value={newCategory}
              />
            </View>
          </View>
        }
        {props.state.currentScreen !== currentScreen.insertCategory && <FabButton
          text={'+'}
          onPress={() => props.setGlobalState({
            currentScreen: currentScreen.insertCategory,
            stack: [props.state.currentScreen, ...props.state.stack]
          })

          }
          textStyle={{fontSize: 40}}
        />}
        {props.state.currentScreen === currentScreen.insertCategory && <FabButton
          text='&#10003;'
          onPress={async () => {
            let {success} = await insertCategory(newCategory)
            if (success) {
              ToastAndroid.show('Expense Saved', ToastAndroid.SHORT)
              let [currentScreen, ...rest] = props.state.stack
              props.setGlobalState({currentScreen, stack: [...rest]})
            }
          }
          }
          textStyle={{fontSize: 35, color: '#4a6c8c'}}
          style={{backgroundColor: '#dfebf7', borderColor: '#4a6c8c'}}
        />}
      </View>
    )
}

function Item({id, onPress, data: {c_name}}) {
  return (
    <View style={{borderBottomWidth: 1, borderColor: '#c9dbec', padding: 10}}>
      <Text style={{fontSize: 18, color: '#4a6c8c', paddingLeft: 15}}>{c_name}</Text>
    </View>
  )
}