import React, { useState, useCallback } from 'react'
import { KeyboardAvoidingView, StyleSheet, View,Dimensions } from 'react-native'
import { Input, Button, Text } from 'react-native-elements'

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [imageUrl, setImageUrl] = useState('')

  const register = useCallback(() => {
   
  }, [])

  return (
    <KeyboardAvoidingView behavior='padding' style={styles.container}>
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
          value={imageUrl}
          onChangeText={text => setImageUrl(text)}
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
