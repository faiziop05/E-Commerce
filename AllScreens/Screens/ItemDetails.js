import {
    Dimensions,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
  } from "react-native";
  import React, { useState } from "react";
  import { StatusBar } from "expo-status-bar";
  import { FlatList } from "react-native-gesture-handler";
  import Octicons from "@expo/vector-icons/Octicons";
  import BackBtn from "../../Components/BackBtn";
  import { colors } from "../../COLORS";
  import PageTitle from "../../Components/PageTitle";
  import { FONTS } from "../../Fonts";
  
  const screenWidth = Dimensions.get("window").width;
  
  const ItemDetails = ({ route, navigation }) => {
    const { data } = route.params;
    const [selectedImage, setSelectedImage] = useState(data.images[0]);
  
    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <View style={styles.backBtnHeadingHeartWrapper}>
            <BackBtn onpress={() => navigation.pop()} />
            <PageTitle Title="Product Details" />
            <TouchableOpacity style={styles.heart}>
              <Octicons name="heart-fill" size={24} color="red" />
            </TouchableOpacity>
          </View>
  
          <View>
            <View style={styles.AllImageWrapper}>
              <View style={styles.ImageWrapper}>
                <Image style={styles.bigImage} source={{ uri: selectedImage }} />
              </View>
              <FlatList
                data={data.images}
                renderItem={(data) => (
                  <TouchableOpacity onPress={() => setSelectedImage(data.item)}>
                    <Image style={styles.smlImage} source={{ uri: data.item }} />
                  </TouchableOpacity>
                )}
                horizontal
              />
            </View>
            <View style={styles.detaeilsWrapper}>
              <Text style={styles.categoryName}>{data.category.name}</Text>
              <Text style={styles.ItemTitle}>{data.title}</Text>
              <Text style={styles.ProductDetaeilsHeading}>Product Details</Text>
              <Text style={styles.productDescription}>{data.description}</Text>
            </View>
          </View>
        </ScrollView>
  
        {/* Fixed footer */}
        <View style={styles.priceCartWrapper}>
          <View style={styles.TotalPriceWrapper}>
            <Text style={styles.TotalPriceHeading}>Total Price</Text>
            <Text style={styles.TotalPrice}>${data.price}</Text>
          </View>
          <TouchableOpacity style={styles.AddtoCartButton}>
            <Text style={styles.AddtoCartButtonText}>Add to Cart</Text>
          </TouchableOpacity>
        </View>
  
        <StatusBar style="auto" />
      </View>
    );
  };
  
  export default ItemDetails;
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.WHITE,
    },
    scrollViewContent: {
      paddingBottom: 100, // Ensure enough space at the bottom so content doesn't overlap with footer
    },
    backBtnHeadingHeartWrapper: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      marginHorizontal: 20,
      marginBottom: 20,
      marginTop: 40,
      alignItems: "center",
    },
    heart: {
      backgroundColor: colors.LIGHT,
      borderRadius: 20,
      width: 40,
      height: 40,
      alignItems: "center",
      justifyContent: "center",
    },
    AllImageWrapper: {
      backgroundColor: "#00000018",
      padding: 5,
      borderRadius: 4,
    },
    ImageWrapper: {
      height: 350,
      marginBottom: 4,
    },
    bigImage: {
      width: screenWidth - 12,
      alignSelf: "center",
      height: "100%",
      resizeMode: "stretch",
      borderRadius: 4,
    },
    smlImage: {
      width: 70,
      height: 70,
      resizeMode: "cover",
      marginRight: 5,
      borderRadius: 4,
    },
    detaeilsWrapper: {
      marginHorizontal: 12,
    },
    categoryName: {
      fontFamily: FONTS.Inter_Light,
      fontSize: 20,
      color: colors.BLACK,
      marginBottom: 10,
      marginTop: 7,
    },
    ItemTitle: {
      fontFamily: FONTS.Inter_Medium,
      fontSize: 25,
      color: colors.BLACK,
      marginBottom: 10,
    },
    ProductDetaeilsHeading: {
      fontSize: 20,
      fontFamily: FONTS.Inter_Medium,
      color: colors.LIGHT_RED,
    },
    productDescription: {
      fontFamily: FONTS.Inter_Light,
      fontSize: 16,
      paddingBottom:50
    },
    priceCartWrapper: {
      position: "absolute", // Fix at the bottom of the screen
      bottom: 0,
      width: "100%",
      paddingHorizontal: 20,
      paddingBottom:30,
      paddingTop:10,
      backgroundColor: "#fff",
      borderTopWidth: 0.5,
      borderTopColor: "#eee", // Optional border for separation
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    TotalPriceWrapper: {
      flexDirection: "column",
    },
    TotalPriceHeading:{
        fontSize:20,
        fontFamily:FONTS.Inter_Light,
        color:colors.GRAY
    },
    TotalPrice:{
        fontSize:22,
        fontFamily:FONTS. Inter_Medium,
        color:colors.BLACK
    },
    AddtoCartButton:{
        width:200,
        alignItems:"center",justifyContent:"center",
        backgroundColor:colors.LIGHT_RED,
        height:50,
        borderRadius:50
    },
    AddtoCartButtonText:{
        fontFamily:FONTS.Inter_Medium,
        fontSize:20,
        color:colors.WHITE
    }
  });
  