import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { FONTS } from "../Fonts";
import { colors } from "../COLORS";

const PageTitle = ({ Title }) => {
  return <Text style={styles.title}>{Title}</Text>;
};

export default PageTitle;

const styles = StyleSheet.create({
title:{
    fontFamily:FONTS.Inter_Medium,
    fontSize:20,
    color:colors.GRAY,
    alignSelf:"center"
}
});
