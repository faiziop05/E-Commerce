import {
  Dimensions,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import BackBtn from "../../Components/BackBtn";
import { colors } from "../../COLORS";
import PageTitle from "../../Components/PageTitle";
import { useSelector } from "react-redux";
import { FlatList } from "react-native-gesture-handler";
import Feather from "@expo/vector-icons/Feather";
import { FONTS } from "../../Fonts";
const screenWidth = Dimensions.get("screen").width;
const Cart = ({ navigation }) => {
  const cartItems = useSelector((state) => state.cartSlice.cartItems);
  const [Count, setCount] = useState(0);


const handlePlus=()=>{
  
  setCount(Count+1)
}
const handleMinus=()=>{
  setCount(Count-1)
}

  const RenderItems = ({ data }) => {
    return (
      <View style={styles.cardContainer}>
        <Image style={styles.image} source={{ uri: data.images[0] }} />
        <View style={styles.TextDeatiels}>
          <Text style={styles.Title}>{data.title}</Text>
          <Text style={styles.category}>{data.category.name}</Text>
          <Text style={styles.price}>${data.price}</Text>
        </View>
        <View style={styles.quantityParentConatiner}>
          <View style={styles.quantitiyConainer}>
            <TouchableOpacity onPress={()=>handleMinus()} style={styles.minusBtn}>
              <Feather name="minus" size={24} color="black" />
            </TouchableOpacity>
            <Text style={styles.countText}>{Count}</Text>
            <TouchableOpacity onPress={()=>handlePlus()} style={styles.plusBtn}>
              <Feather name="plus" size={24} color={colors.WHITE} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <SafeAreaView>
        <View style={styles.backCartHeadingContainer}>
          <BackBtn onpress={() => navigation.pop()} />
          <PageTitle Title="My Cart" />
        </View>
        <View style={styles.FlatListWrapper}>
          <FlatList
            data={cartItems}
            renderItem={(data) => <RenderItems data={data.item} />}
            keyExtractor={(item) => item.id.toString()}
          />
        </View>
      </SafeAreaView>
    </View>
  );
};

export default Cart;

const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: colors.WHITE,
  },
  plusBtn: {
    backgroundColor: colors.LIGHT_RED,
    borderRadius: 20,
    width: 30,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  FlatListWrapper: {
    marginVertical: 10,
    height: "96%",
  },
  minusBtn: {
    backgroundColor: colors.LIGHT,
    borderRadius: 20,
    width: 30,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  quantitiyConainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: screenWidth / 3.8,
  },
  countText: {
    marginHorizontal: 10,
    fontFamily: FONTS.Inter_Medium,
    fontSize: 22,
  },
  cardContainer: {
    display: "flex",
    flexDirection: "row",
    // marginVertical: 10,
    width: screenWidth - 5,
    marginHorizontal: 5,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.LIGHT,
  },
  image: {
    width: screenWidth / 4,
    height: screenWidth / 4,
    resizeMode: "contain",
    backgroundColor: "#00000018",
    marginRight: "1.8%",
    borderRadius: 10,
  },
  TextDeatiels: {
    width: screenWidth / 2.3,
    marginRight: "1..7%",
  },
  Title: {
    fontFamily: FONTS.Inter_Medium,
    fontSize: 17,
    color: colors.BLACK,
    marginBottom: 5,
  },
  category: {
    fontFamily: FONTS.Inter_Light,
    fontSize: 15,
    color: colors.GRAY,
    marginBottom: 5,
  },
  price: {
    fontFamily: FONTS.Inter_Bold,
    fontSize: 17,
    color: colors.BLACK,
  },
  quantityParentConatiner: {
    justifyContent: "flex-end",
    marginBottom: 8,
  },
  backCartHeadingContainer:{
    paddingHorizontal:13
  }
});
