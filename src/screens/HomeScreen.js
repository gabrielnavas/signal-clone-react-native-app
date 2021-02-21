import React, { useCallback, useEffect, useLayoutEffect, useState } from 'react'
import { SafeAreaView, StyleSheet, Text, View, ScrollView } from 'react-native'
import { Avatar } from 'react-native-elements'


import * as userAsyncStorage from '../services/user/local-storage-user'

import CustomListItem from '../components/CustomListItem'

const HomeScreen = ({ navigation }) => {

  const [user, setUser] = useState({})

  useLayoutEffect(() => {
    userAsyncStorage
      .getUserLocalStorage()
      .then(({ user }) => !user && navigation.navigate('Login'))
  }, [])

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Signal",
      headerLeft: null,
      headerStyle: { backgroundColor: '#fff' },
      headerTitleStyle: { color: 'black' },
      headerTintColor: 'black',
      headerLeft: () => (
        <View style={{ marginLeft: 20 }}>
          <Avatar rounded source={{ uri: user.imageURL }} />
        </View>
      )
    })
  }, [])

  useEffect(() => {
    userAsyncStorage
      .getUserLocalStorage()
      .then(({ user }) => setUser(user))
  }, [user])

 

  return (
    <SafeAreaView>
      <ScrollView>
        <CustomListItem />
      </ScrollView>
    </SafeAreaView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({})
