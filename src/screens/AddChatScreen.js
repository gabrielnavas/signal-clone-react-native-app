import React, { useCallback, useLayoutEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import {Input, Button} from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome'

const AddChatScreen = ({navigation}) => {

  const [input, setInput] = useState('')

  const createChat = useCallback(() => {
  }, [])

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Add a new chat',
      headerBackTitle: 'chats' //only IOS
    })
  }, [navigation])

  return (
    <View style={styles.container}>
      <Input 
        placeholder='Enter a chat name'
        value={input}
        onChangeText={text => setInput(text)}
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
