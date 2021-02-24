import React, { useCallback, useLayoutEffect, useState } from 'react'
import { Alert } from 'react-native'
import { StyleSheet, View } from 'react-native'
import { Input, Button } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome'

import newChatService from '../services/http/chat/newChatService'
import { logoff, getUserLocalStorage } from '../services/http/user/localStorageUser'


const AddChatScreen = ({ navigation }) => {

  const [nameChat, setNameChat] = useState('')


  useLayoutEffect(() => {
    // logoff().then()
    getUserLocalStorage()
      .then(({ user }) => !user && navigation.replace('Login'))
  }, [])

  const createChat = useCallback(() => {
    getUserLocalStorage()
      .then(({ user, token }) => {
        newChatService({ token, nameChat })
          .then(({ error, body }) => {
            if (error) {
              return Alert.alert('xii, deu problema', error)
            }
            navigation.replace('Home')
          })
      })
      .catch(({ error }) => Alert.alert('xiii, teve problemas', error))
  }, [nameChat, getUserLocalStorage])

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Add a new chat',
      headerBackTitle: 'chats' //only IOS
    })
  }, [navigation])

  return (
    <View style={styles.container}>
      <Input
        autoFocus
        placeholder='Enter a chat name'
        value={nameChat}
        onChangeText={text => setNameChat(text)}
        leftIcon={
          <Icon name='wechat' type='antdesign' size={24} color='black' />
        }
        onSubmitEditing={createChat}
      />
      <Button
        onPress={createChat}
        title='Create new Chat'
      />
    </View>
  )
}

export default AddChatScreen

const styles = StyleSheet.create({
  container: {}
})
