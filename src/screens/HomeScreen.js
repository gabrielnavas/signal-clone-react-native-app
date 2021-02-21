import React, { useCallback, useEffect, useLayoutEffect, useState } from 'react'
import { SafeAreaView } from 'react-native'
import { StyleSheet, Text, View, Button, ScrollView } from 'react-native'

import * as userAsyncStorage from '../services/user/local-storage-user'

import CustomListItem from '../components/CustomListItem'

const HomeScreen = ({ navigation }) => {

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Signal",
      headerLeft: null,
      headerStyle:{ backgroundColor: '#fff' }
    })
  }, [])

  useEffect(() => {
    userAsyncStorage
      .getUserLocalStorage()
      .then(user => !user && navigation.navigate('Login'))
  }, [])

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
