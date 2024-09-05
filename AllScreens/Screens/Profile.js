import { StyleSheet, Text, View ,TouchableOpacity} from 'react-native'
import React from 'react'
import { useDispatch } from 'react-redux'
import { SafeAreaView } from 'react-native-safe-area-context'
import { setFalse } from '../../redux/LoginStatusSlice'
import AsyncStorage from '@react-native-async-storage/async-storage'

const Profile = ({navigation}) => {
    const dispatch=useDispatch()
    const handleLogout=async()=>{
        await AsyncStorage.removeItem('AccessToken')
        dispatch(setFalse())
        // navigation.navigate('SignIn')
    }

  return (
    <SafeAreaView>
      <TouchableOpacity onPress={handleLogout}><Text>Logout</Text></TouchableOpacity>
    </SafeAreaView>
  )
}

export default Profile

const styles = StyleSheet.create({})