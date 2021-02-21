import React, { useCallback, useEffect, useLayoutEffect, useState } from 'react'
import { SafeAreaView, StyleSheet, Text, View, ScrollView } from 'react-native'
import {Avatar} from 'react-native-elements'


import * as userAsyncStorage from '../services/user/local-storage-user'

import CustomListItem from '../components/CustomListItem'

const HomeScreen = ({ navigation }) => {

  const [user, setUser] = useState({}) 

  useLayoutEffect(() => {
    // userAsyncStorage.clearAll()

    userAsyncStorage
      .getUserLocalStorage()
      .then(user => !user && navigation.navigate('Login'))

    userAsyncStorage
      .getUserLocalStorage()
      .then(user => {
        console.log(user);
      })
    
    navigation.setOptions({
      title: "Signal",
      headerLeft: null,
      headerStyle:{ backgroundColor: '#fff' },
      headerTitleStyle: {color: 'black'},
      headerTintColor: 'black',
      headerLeft: () => (
        <View style={{flex: 1, marginLeft: 20}}>
          <Avatar rounded souce={{uri: user.imageURL}} />
        </View>
      )
    })
  }, [user])

  const logoff = useCallback(() => {
    userAsyncStorage.logoff().then()
    navigation.navigate('Login')
  }, [])

  return (
    <SafeAreaView>
      <ScrollView>
        <CustomListItem

        />
        {/* <Button title='Logoff' onPress={logoff}></Button> */}
      </ScrollView>
    </SafeAreaView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({})
