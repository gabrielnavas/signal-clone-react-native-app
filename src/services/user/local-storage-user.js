import AsyncStorage from '@react-native-async-storage/async-storage';

import { makeUserWithToken, makeUser } from '../../models/user'

const userKeyName = '@UserKey'

const getUserLocalStorage = async () => {
  try {
    const userString = await AsyncStorage.getItem(userKeyName)
    const user = JSON.parse(userString)
    if (!user) return undefined
    return makeUserWithToken(user)
  }
  catch (error) {
    console.error(error)
    return undefined
  }
}

const setUserLocalStorage = async user => {
  try {
    const userClearUndefinedNull = Object
      .entries(user)
      .reduce((objFinal, obj) => {
        if (obj[1]) {
          objFinal[obj[0]] = obj[1]
        }
        return objFinal
      }, {})
    const userString = JSON.stringify(userClearUndefinedNull)
    await AsyncStorage.setItem(userKeyName, userString)
  }
  catch (error) {
    console.error(error)
  }
}

const logoff = async () => {
  try {
    await AsyncStorage.setItem(userKeyName, JSON.stringify(false))
  }
  catch (error) {
    console.error(error)
  }
}

export {
  getUserLocalStorage,
  setUserLocalStorage,
  logoff
}