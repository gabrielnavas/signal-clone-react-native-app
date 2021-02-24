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
  Keyboard
} from 'react-native'
import { Avatar } from 'react-native-elements'
import { AntDesign, FontAwesome, Ionicons } from '@expo/vector-icons'

import { getUserLocalStorage } from '../services/http/user/localStorageUser'
// import sendMessageSocket from '../services/socket/message/sendMessageSocket'
import { getSocket } from '../services/helpers/socket'


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

  useEffect(() => {
    socket = getSocket()
  }, [])

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
  }, [])

  const sendMessage = useCallback(() => {
    Keyboard.dismiss()
    console.log(messageInput);
    socket.emit('sendMessage', {messageInput: messageInput}, () => {
      // setMessageInput('')
      console.log('call back chamando');
    })
  }, [messageInput])

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
            <ScrollView></ScrollView>
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
