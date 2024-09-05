import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Dimensions,
  FlatList,
} from "react-native";
import React, { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../../COLORS";
import { StatusBar } from "expo-status-bar";
// import { StatusBar } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Ionicons from "@expo/vector-icons/Ionicons";
import { SearchBar } from "react-native-screens";
const screenWidth = Dimensions.get("window").width;
import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { FONTS } from "../../Fonts";
import CategoryIcon from "../../Components/CategoryIcon";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
const fetchUserdata = async (url2, AccessToken) => {
  try {
    const response = await fetch(url2, {
      method: "GET", // or 'PUT', 'PATCH', etc.
      headers: {
        Authorization: `Bearer ${AccessToken}`,
      },
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(`Error: ${error.toString()}`);
  }
};
const Categories = [
  {
    icon: FontAwesome5,
    name: "tshirt",
    text:'Clothes'
  },
  {
    icon: FontAwesome6,
    name: "computer",
    text:'Electronics'
  },
  {
    icon: MaterialCommunityIcons,
    name: "shoe-sneaker",
    text:'Shoes'
  },
  {
    icon: MaterialIcons,
    name: "watch",
    text:'Watches'
  },
];
const HomeScreen = () => {
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // Fetch the access token from AsyncStorage
        const storedToken = await AsyncStorage.getItem("AccessToken");
        const AccessToken =
          storedToken != null ? JSON.parse(storedToken).access_token : null;

        if (AccessToken) {
          const uri2 = "https://api.escuelajs.co/api/v1/auth/profile";

          // Call the fetchUserdata function with the token
          const userdata = await fetchUserdata(uri2, AccessToken);

          console.log(userdata); // Logs the fetched user data
        } else {
          console.log("No Access Token found");
        }
      } catch (error) {
        console.log("Error fetching user data:", error);
      }
    };

    fetchProfile(); // Invoke the async function inside useEffect
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View>
        <View style={styles.toporangeContainer}>
          <SafeAreaView style={styles.locationNotificationWrapper}>
            <View>
              <Text style={styles.locationHeading}>Location</Text>
              <TouchableOpacity style={styles.locationIconTextWrapper}>
                <MaterialIcons name="location-on" size={24} color="#FFF" />
                <Text style={styles.locationCityText}>New York, USA </Text>
                <Entypo name="chevron-small-down" size={26} color="white" />
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.loctionIconWrapper}>
              <Ionicons name="notifications" size={24} color="white" />
            </TouchableOpacity>
          </SafeAreaView>
          <View style={styles.searchInputFilterWrapper}>
            <TextInput placeholder="Search" style={styles.searchInput} />
            <TouchableOpacity style={styles.SeachfilterButton}>
              <AntDesign name="filter" size={24} color={colors.LIGHT_RED} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.bottomContainer}>
          <View style={styles.CategoryHeadingSeeAlllWrapper}>
            <Text style={styles.CategoryHeading}>Category</Text>
            <TouchableOpacity>
              <Text style={styles.CategorySeeallButton}>See All</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={Categories}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={( data ) => (
              <CategoryIcon name={data.item.name} Icon={data.item.icon} text={data.item.text} />
            )}
          />
        </View>
      </View>
      <StatusBar style="light" />
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.WHITE,
  },
  toporangeContainer: {
    width: "100%",
    backgroundColor: colors.LIGHT_RED,
    height: 200,
    borderBottomRightRadius: 15,
    borderBottomLeftRadius: 15,
  },
  locationNotificationWrapper: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 15,
  },
  locationHeading: {
    fontFamily: FONTS.Inter_Light,
    color: colors.WHITE,
    fontSize: 16,
    marginBottom: 5,
    marginLeft: 5,
  },
  locationIconTextWrapper: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  locationCityText: {
    fontFamily: FONTS.Inter_Medium,
    color: colors.WHITE,
    fontSize: 18,
  },
  loctionIconWrapper: {
    backgroundColor: "#fff3",
    padding: 8,
    borderRadius: 10,
  },
  searchInput: {
    backgroundColor: colors.WHITE,
    width: screenWidth - 100,
    height: 50,
    padding: 10,
    fontSize: 18,
    fontFamily: FONTS.Inter_Light,
    borderRadius: 10,
  },
  SeachfilterButton: {
    backgroundColor: colors.WHITE,
    padding: 10,
    borderRadius: 15,
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  searchInputFilterWrapper: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 15,
  },

  CategorySeeallButton: {
    color: colors.LIGHT_RED,
    fontFamily: FONTS.Inter_Medium,
    fontSize: 15,
  },
  CategoryHeadingSeeAlllWrapper: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 15,
  },
  CategoryHeading: {
    fontSize: 26,
    fontFamily: FONTS.Inter_Medium,
  },
  bottomContainer:{
    marginTop:30,
    marginHorizontal:10
  }
});
