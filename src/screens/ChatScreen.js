import React, { useEffect, useState, useLayoutEffect, useCallback } from 'react'
import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  Alert
} from 'react-native'
import { Avatar } from 'react-native-elements'
import { AntDesign, FontAwesome, Ionicons } from '@expo/vector-icons'

import { getUserLocalStorage, logoff } from '../services/http/user/localStorageUser'
import { getSocket } from '../services/helpers/socket'
import * as sendMessageSocket from '../services/socket/message/sendMessageSocket'
import { receiveMessageForAllSocket } from '../services/socket/message/receiveMessageForAllSocket'


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

let socket

const ChatScreen = ({ route, navigation }) => {

  const [idChat, setIdChat] = useState('')
  const [chatName, setChatName] = useState('')
  const [messageInput, setMessageInput] = useState('')
  const [user, setUser] = useState({})
  const [messages, setMessages] = useState([])

  useLayoutEffect(() => {
    const { id, chatName } = route.params
    setIdChat(id)
    setChatName(chatName)
  }, [])

  useLayoutEffect(() => {
    // logoff().then()
    getUserLocalStorage()
      .then(({ user }) => {
        if (!user) {
          navigation.navigate('Login')
        } else setUser(user)
      })
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
  }, [])

  useEffect(() => {
    socket = getSocket()
  }, [])

  useEffect(() => {
    socket.emit('joinChat', {
      idChat,
      user: { id: user.id, name: user.name }
    })
  }, [])

  useEffect(() => {
    socket.on('joinChat', user => {
      setMessages([{
        id: user.id,
        name: user.name,
        message: 'join in the room'
      },
      ...messages
      ])
    })
    socket.on('disconnectChat', user => {
      setMessages([{
        id: user.id,
        name: user.name,
        message: 'left...'
      },
      ...messages
      ])
    })
    return () => {
      socket.emit('disconnectChat', {
        idChat,
        user: { id: user.id, name: user.name }
      })
      socket.off()
    }
  }, [])

  const sendMessage = useCallback(() => {
    Keyboard.dismiss()
    const payload = { idChat, userId: user.id, messageText: messageInput }
    // const sendToAllClientsCallback = ({ body, error }) => {
    //   if (error) {
    //     Alert.alert('xiii', error)
    //     // sendMessageSocket.failure(socket)()
    //     return
    //   }
    //   sendMessageSocket.success(socket)(body)
    // }
    // sendMessageSocket.request(socket)(payload, sendToAllClientsCallback)
    // setMessageInput('')
  }, [Keyboard])

  return (
    <SafeAreaView>
      <StatusBar style='light' />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
        keyboardVerticalOffset={90}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <>
            <ScrollView>
              {
                messages.map(({ userId, messageText, id }, index) => (
                  <View key={index}>
                    <Text>{userId}</Text>
                    <Text>{messageText}</Text>
                  </View>
                ))
              }
            </ScrollView>
            <View style={styles.footer}>
              <TextInput
                style={styles.textInput}
                placeholder='Say something'
                value={messageInput}
                onChangeText={text => setMessageInput(text)}
                onSubmitEditing={sendMessage}
              />
              <TouchableOpacity
                onPress={sendMessage}
                activeOpacity={0.5}>
                <Ionicons name='send' size={24} color='#2b68e6' />
              </TouchableOpacity>
            </View>
          </>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default ChatScreen

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    height: '100%',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    padding: 15,
  },
  textInput: {
    bottom: 0,
    height: 40,
    flex: 1,
    marginRight: 15,
    borderColor: 'transparent',
    backgroundColor: '#ececec',
    borderWidth: 1,
    padding: 10,
    color: 'gray',
    borderRadius: 30,
  }
})
