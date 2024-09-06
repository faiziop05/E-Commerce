import { StyleSheet, Text, View, Image, Dimensions } from 'react-native';
import React from 'react';
import { FONTS } from '../../Fonts';
import { colors } from '../../COLORS';
const screenWidth = Dimensions.get("window").width;
const ItemCard = ({ products }) => {
  return (
    <View style={styles.cardContainer}>
      <Image 
        source={{ uri: products.images[0] }} 
        style={styles.image}  // Apply styling for the image size
      />
      <Text numberOfLines={1} ellipsizeMode='tail' style={styles.title}>{products.title}</Text>
      <Text style={styles.price}>{products.price}$</Text>
    </View>
  );
};

export default ItemCard;

const styles = StyleSheet.create({
  image: {
    width: screenWidth/2.4,  // Adjust width as per your requirement
    height: screenWidth/2.4, // Adjust height as per your requirement
    resizeMode: 'cover', // Optional: control how the image fits in the container
    borderRadius:10,
  },
  title:{
    width:screenWidth/3.5,
    fontFamily:FONTS.Inter_Light,
    fontSize:17
  },
  price:{
    fontFamily:FONTS.Inter_Medium,
    fontSize:18
  },
  cardContainer:{
    marginBottom:10,
    backgroundColor:colors.LIGHT,
    padding:5,
    borderRadius:8
  }
});
