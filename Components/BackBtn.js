import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { colors } from "../COLORS";
const BackBtn = ({onpress}) => {
  return (
    <TouchableOpacity onPress={onpress} style={styles.backBtn}>
      <MaterialCommunityIcons
        name="keyboard-backspace"
        size={24}
        color={colors.GRAY}
      />
    </TouchableOpacity>
  );
};

export default BackBtn;

const styles = StyleSheet.create({
    backBtn:{
        backgroundColor:colors.LIGHT,
        borderRadius:20,
        width:40,
        height:40,
        alignItems:"center",
        justifyContent:"center",

    }
});
