import AsyncStorage from '@react-native-async-storage/async-storage';

import { makeUser } from '../../models/user'

const userDataKey = '@UserDataKey'
const userTokenKey = '@UserTokenKey'

const getUserLocalStorage = async () => {
  try {
    const user = await AsyncStorage.getItem(userDataKey)
    const token = await AsyncStorage.getItem(userTokenKey)
    if (!user) return undefined
    const userObj = JSON.parse(user)
    const tokenObj = JSON.parse(token)
    return {
      user: userObj,
      token: tokenObj
    }
  }
  catch (error) {
    console.error(error)
    return undefined
  }
}

const setUserLocalStorage = async (user, token) => {
  try {
    if(!user || !token) return 
    const userClearUndefinedNull = Object
      .entries(user)
      .reduce((objFinal, obj) => {
        if (obj[1]) {
          objFinal[obj[0]] = obj[1]
        }
        return objFinal
      }, {})
      const userString = JSON.stringify(userClearUndefinedNull)
      const tokenString = JSON.stringify(token)
      await AsyncStorage.setItem(userDataKey, userString)
      await AsyncStorage.setItem(userTokenKey, tokenString)
  }
  catch (error) {
    console.error(error)
  }
}

const logoff = async () => {
  try {
    await AsyncStorage.setItem(userDataKey, JSON.stringify(false))
    await AsyncStorage.setItem(userTokenKey, JSON.stringify(false))
  }
  catch (error) {
    console.error(error)
  }
}

export {
  getUserLocalStorage,
  setUserLocalStorage,
  logoff,
}