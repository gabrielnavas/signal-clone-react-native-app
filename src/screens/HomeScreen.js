import React, { useEffect, useLayoutEffect, useState } from 'react'
import { SafeAreaView, StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native'
import { Avatar } from 'react-native-elements'
import { AntDesign, SimpleLineIcons } from '@expo/vector-icons'

import * as userAsyncStorage from '../services/user/local-storage-user'

import CustomListItem from '../components/CustomListItem'

const HomeScreen = ({ navigation }) => {

  const [user, setUser] = useState({})

  useLayoutEffect(() => {
    // userAsyncStorage.logoff().then()
    userAsyncStorage
      .getUserLocalStorage()
      .then(({ user }) => !user && navigation.navigate('Login'))
  }, [])

  useLayoutEffect(() => {
    const afterGetUser = ({ user }) => {
      setUser(user)
      navigation.setOptions({
        title: "Signal",
        headerLeft: null,
        headerStyle: { backgroundColor: '#fff' },
        headerTitleStyle: { color: 'black' },
        headerTintColor: 'black',
        headerLeft: () => (
          <View style={{ marginLeft: 20 }}>
            <TouchableOpacity activeOpacity={0.5} >
              <Avatar rounded source={{ uri: user.imageURL }} />
            </TouchableOpacity>
          </View>
        ),
        headerRight: () => (
          <View style={{
            flexDirection: 'row', 
            justifyContent: 'space-between',
            width: 80,
            marginRight: 20
          }}>
            <TouchableOpacity activeOpacity={0.5}>
              <AntDesign
                name='camerao'
                size={24}
                color='black'
              />
            </TouchableOpacity>
            <TouchableOpacity 
              onPress={() => navigation.navigate('AddChat')}  
              activeOpacity={0.5}>
              <SimpleLineIcons
                name='pencil'
                size={24}
                color='black'
              />
            </TouchableOpacity>
          </View>
        )
      })
    }
    userAsyncStorage
      .getUserLocalStorage()
      .then(afterGetUser)
  }, [])

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
