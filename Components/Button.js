import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colors } from '../COLORS'
import { FONTS } from '../Fonts'
import { TouchableOpacity } from 'react-native-gesture-handler';
const screenWidth = Dimensions.get("window").width;
const Button = ({onPress,text}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.SignInButton}>
    <Text style={styles.SignInButtonText}>{text}</Text>
  </TouchableOpacity>
  )
}

export default Button

const styles = StyleSheet.create({
    SignInButton: {
        backgroundColor: colors.LIGHT_RED,
        width: screenWidth - 50,
        padding: 16,
        borderRadius: 100,
        alignItems: "center",
        marginTop: 20,
      },
      SignInButtonText: {
        color: colors.LIGHT,
        fontSize: 20,
        fontFamily: FONTS.Inter_Medium,
      },
})