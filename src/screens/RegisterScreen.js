import React, { useState, useCallback, useLayoutEffect, useEffect, ScrollView } from 'react'
import { Alert } from 'react-native'
import { KeyboardAvoidingView, StyleSheet, View, Dimensions } from 'react-native'
import { Input, Button, Text } from 'react-native-elements'

import * as localStorageUser from '../services/user/local-storage-user'
import registerUser from '../services/user/registerUserService'

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [imageURL, setImageURL] = useState('')

  useLayoutEffect(() => {
    localStorageUser
      .getUserLocalStorage()
      .then(({user}) => user && navigation.replace('Home'))
  }, [localStorageUser, navigation])

  useLayoutEffect(() => {
    navigation.setOptions({
      headerBackTitle: "Login"
    })
  }, [navigation])

  const register = useCallback(async () => {
    try {
      const registerParams = {
        name,
        email,
        password,
        imageURL
      }
      const { body, error } = await registerUser(registerParams)
      if (error) {
        Alert.alert('has error =(', error)
        return
      }
      localStorageUser
        .setUserLocalStorage(body.user, body.token)
        .then(() => navigation.replace('Home'))
        .catch()
    }
    catch (error) {
      console.error(error)
    }
  }, [name, email, password, imageURL, localStorageUser])

  return (
    <KeyboardAvoidingView behavior='height' style={styles.container}>
      <Text h3 style={{ marginBottom: 40 }}>
        Create a signal account
      </Text>

      <View style={styles.inputContainer}>
        <Input
          value={name}
          onChangeText={text => setName(text)}
          type='text'
          autoFocus
          placeholder='Full Name'
        />
        <Input
          value={email}
          onChangeText={text => setEmail(text)}
          type='email'
          placeholder='Email'
        />
        <Input
          value={password}
          onChangeText={text => setPassword(text)}
          type='text'
          secureTextEntry
          placeholder='Password'
        />
        <Input
          value={imageURL}
          onChangeText={text => setImageURL(text)}
          type='text'
          placeholder="Profile Picture URL (optional)"
          onSubmitEditing={register}
        />
      </View>

      <Button
        containerStyle={styles.button}
        onPress={register}
        title='Register'
        raised
      />
    </KeyboardAvoidingView>
  )
}

export default RegisterScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: 'white',
  },
  inputContainer: {
    width: Dimensions.get('window').width * 0.80,
  },
  button: {
    width: 200,
    marginTop: 10
  }
})
