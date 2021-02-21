import 'react-native-gesture-handler';
import React from 'react';

import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import HomeScreen from './src/screens/HomeScreen';

const Stack = createStackNavigator()
const globalScreenOptions = {
  headerStyle: { backgroundColor: '#2c6bed' },
  headerTitleStyle: { color: 'white' },
  headerTintColor: 'white',
  headerTitleAlign: 'center'
}

export default function App() {
  return (
    <NavigationContainer >
      <Stack.Navigator 
        initialRouteName='Home' 
        screenOptions={globalScreenOptions}>
        <Stack.Screen
          name='Login'
          component={LoginScreen} />
        <Stack.Screen
          name='Register'
          component={RegisterScreen}
        />
        <Stack.Screen
          name='Home'
          component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
