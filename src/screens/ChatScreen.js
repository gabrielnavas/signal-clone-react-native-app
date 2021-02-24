import React, { useEffect, useState, useLayoutEffect } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { Avatar } from 'react-native-elements'
import { AntDesign, FontAwesome, Ionicons } from '@expo/vector-icons'

import { getUserLocalStorage } from '../services/user/local-storage-user'
import { SafeAreaView } from 'react-native'
import { StatusBar } from 'react-native'
import { KeyboardAvoidingView } from 'react-native'

const HeaderTitleComponent = ({ chatName }) =>
  <View
    style={{
      flexDirection: 'row',
      alignItems: 'center',
      width: '100%',
      marginRight: '30%'
    }}
  >
    <Avatar
      rounded
      source={{
        uri: 'https://cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png'
      }}
    />
    <Text style={{ color: 'white', marginLeft: 10, fontWeight: '700' }}>{chatName}</Text>
  </View>

const HeaderLeftComponent = ({ navigation }) =>
  <TouchableOpacity
    onPress={navigation.goBack}
    style={{ marginLeft: 10 }}
  >
    <AntDesign name='arrowleft' size={24} color='#FFF' />
  </TouchableOpacity>

const HeaderRightComponent = () =>
  <View style={{
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 80,
    marginRight: 15,
  }}>
    <TouchableOpacity
      style={{ marginLeft: 10 }}
    >
      <FontAwesome name='video-camera' size={24} color='#FFF' />
    </TouchableOpacity>
    <TouchableOpacity
      style={{ marginLeft: 10 }}
    >
      <Ionicons name='call' size={24} color='#FFF' />
    </TouchableOpacity>
  </View>


const ChatScreen = ({ route, navigation }) => {

  const [idChat, setIdChat] = useState('')
  const [chatName, setChatName] = useState('')

  useEffect(() => {
    const { id, chatName } = route.params
    setIdChat(id)
    setChatName(chatName)
  }, [route.params])

  useLayoutEffect(() => {
    // userAsyncStorage.logoff().then()
    getUserLocalStorage()
      .then(({ user }) => !user && navigation.navigate('Login'))
  }, [])

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Chat',
      headerBackTitleVisible: true,
      headerTitleAlign: 'middle',
      headerTitle: () => <HeaderTitleComponent chatName={chatName} />,
      headerLeft: () => <HeaderLeftComponent navigation={navigation} />,
      headerRight: () => <HeaderRightComponent />,
    })
  })

  return (
    <SafeAreaView>
      <StatusBar style='light' />
      <KeyboardAvoidingView>
        
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default ChatScreen

const styles = StyleSheet.create({})
