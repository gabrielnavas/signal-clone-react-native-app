import React, { useCallback, useEffect, useState } from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'

import * as userAsyncStorage from '../services/user/local-storage-user'

const HomeScreen = ({ navigation }) => {

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
    <View>
      <Button title='Logoff' onPress={logoff}></Button>
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({})
