import React, { useCallback, useState, useEffect } from 'react'
import { KeyboardAvoidingView } from 'react-native'
import { StatusBar, StyleSheet, View, Text } from 'react-native'
import { Button, Input, Image } from 'react-native-elements'
import * as localStorageUser from '../services/user/local-storage-user'

const LoginScreen = ({navigation}) => {

  const [email, setEmail] = useState()
  const [password, setPassword] = useState()

  useEffect(() => {
    localStorageUser
      .getUserLocalStorage()
      .then((user, token) => 
        user && token && navigation.replace('Home')
      )
  }, [localStorageUser, navigation])

  const signIn = useCallback(() => {
    alert('oi')
  }, [])

  return (
    <KeyboardAvoidingView behavior='height' style={styles.container}>
      <StatusBar style='light' />
      <Image source={{
        uri: 'https://blog.mozilla.org/internetcitizen/files/2018/08/signal-logo.png',
      }}
        style={styles.imageContainer}
      />
      <View style={styles.inputContainer}>
        <Input
          value={email}
          onChangeText={text => setEmail(text)}
          placeholder='Email'
          autoFocus
          type='email'
        />
        <Input
          value={password}
          onChangeText={text => setPassword(text)}
          secureTextEntry
          placeholder='Password'
          type='password'
        />
      </View>

      <Button 
        containerStyle={styles.button} 
        onPress={signIn} 
        title='Login' 
      />
      <Button 
        onPress={() => navigation.navigate('Register')} 
        containerStyle={styles.button} 
        type='outline' 
        title='Register' 
      />
    </KeyboardAvoidingView>
  )
}

export default LoginScreen


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10
  },
  imageContainer: {
    width: 200,
    height: 200
  },
  inputContainer: {
    width: 300,
  },
  button: {
    width: 200,
    marginTop: 10,
  }
})