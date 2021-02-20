import React, { useState } from 'react'
import { KeyboardAvoidingView } from 'react-native'
import { StyleSheet, Text, View } from 'react-native'
import {Input} from 'react-native-elements'

const RegisterScreen = ({navigation}) => {
  const [name, setName] = useState()
  
  return (
    <KeyboardAvoidingView behavior='padding' style={styles.container}>
      <Text h1 style={{marginBottom: 50}}>
        I am Register Screen
      </Text>

      <View style={styles.inputContainer}>
        <Input 
          value={name}
          onChangeText={text => setName(text)}
          type='text'
          autoFocus
          placeholder='Full Name'
        />
      </View>
    </KeyboardAvoidingView>
  )
}

export default RegisterScreen

const styles = StyleSheet.create({
  container: {},
  inputContainer: {}
})
