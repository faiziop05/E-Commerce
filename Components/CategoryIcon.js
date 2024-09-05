import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { colors } from "../COLORS";
import { TouchableOpacity } from "react-native-gesture-handler";
import { FONTS } from "../Fonts";

const CategoryIcon = ({name,Icon,text}) => {
    
  return (
    <TouchableOpacity  style={styles.catogariesIconTetWrapper}>
      <View style={styles.catogariesiconWraper}>
        <Icon name={name} size={24} color={colors.LIGHT_RED} />
      </View>
      <Text style={styles.itemtitle}>{text}</Text>
    </TouchableOpacity>
  );
};

export default CategoryIcon;

const styles = StyleSheet.create({
    catogariesiconWraper: {
        padding: 15,
        borderRadius: 70,
        backgroundColor: colors.LIGHT,
        width: 70,
        height: 70,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 10,
      },
      catogariesIconTetWrapper: {
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
        marginHorizontal:10,
        marginVertical:10
      },
      itemtitle:{
        fontFamily:FONTS.Inter_Medium,
        color:colors.GRAY
      }

});
