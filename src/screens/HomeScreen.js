import React, { useCallback, useEffect, useLayoutEffect, useState } from 'react'
import { SafeAreaView, StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native'
import { Avatar } from 'react-native-elements'
import { AntDesign, SimpleLineIcons } from '@expo/vector-icons'
import { Alert } from 'react-native'

import { getUserLocalStorage, logoff } from '../services/http/user/localStorageUser'

import CustomListItem from '../components/CustomListItem'
import getAllChatsService from '../services/http/chat/getAllChatsService'


const HomeScreen = ({ navigation }) => {
  const [chatsItems, setChatsItems] = useState([])
  const [user, setUser] = useState({})

  useEffect(() => {
    getUserLocalStorage()
      .then(({ user, token }) => {
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
    // logoff().then()
    getUserLocalStorage()
      .then(({ user }) => !user && navigation.navigate('Login'))
  }, [])

  useLayoutEffect(() => {
    const afterGetUser = ({ user }) => {
      setUser(user)
      navigation.setOptions({
        title: "Home",
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
    getUserLocalStorage().then(afterGetUser)
  }, [])


  const handleEnterChat = useCallback((id, chatName) => {
    navigation.navigate('ChatScreen', {
      id,
      chatName
    })
  })


  return (
    <SafeAreaView>
      <ScrollView style={styles.container}>
        {
          chatsItems?.length > 0 && chatsItems.map(chat => (
            <CustomListItem
              key={chat.id}
              enterChat={handleEnterChat}
              id={chat.id}
              chatName={chat.nameChat}
            />)
          )
        }
      </ScrollView>
    </SafeAreaView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    height: '100%',
  }
})
