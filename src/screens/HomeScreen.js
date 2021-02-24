import React, { useEffect, useLayoutEffect, useState } from 'react'
import { SafeAreaView, StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native'
import { Avatar } from 'react-native-elements'
import { AntDesign, SimpleLineIcons } from '@expo/vector-icons'
import { Alert } from 'react-native'

import * as userAsyncStorage from '../services/user/local-storage-user'
import { getUserLocalStorage } from '../services/user/local-storage-user'

import CustomListItem from '../components/CustomListItem'
import getAllChatsService from '../services/chat/getAllChatsService'

const HomeScreen = ({ navigation }) => {

  const [chatsItems, setChatsItems] = useState([])
  const [user, setUser] = useState({})

  useEffect(() => {
    getUserLocalStorage()
      .then(({ user, token }) => {
        // console.log('asdasd')
        getAllChatsService({ token })
          .then(({ body, error }) => {
            if (error) {
              return Alert.alert('ops!', error)
            }
            setChatsItems(body)
          })
      })
  }, [])

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
    userAsyncStorage.getUserLocalStorage().then(afterGetUser)
  }, [])



  return (
    <SafeAreaView>
      <ScrollView>
        {
          chatsItems?.length > 0 && chatsItems.map(chat => (
            <CustomListItem
              key={chat.id}
              id={chat.id}
              chatName={chat.nameChat}
              enterChat='ultimas msgs'
            />)
          )
        }
      </ScrollView>
    </SafeAreaView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({})
