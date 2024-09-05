import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useEffect, useState } from "react";
import { colors } from "../../COLORS";
import { Dimensions } from "react-native";
import { FONTS } from "../../Fonts";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Button from "../../Components/Button";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";
import { setTrue } from "../../redux/LoginStatusSlice";
const screenWidth = Dimensions.get("window").width;


const fetchUser = async (url, data) => {
    try {
      const response = await fetch(url, {
        method: "POST", // or 'PUT', 'PATCH', etc.
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data), // Convert JavaScript object to JSON string
      });
      const result = await response.json();
      return result;
    } catch (error) {
      console.log(`Error: ${error.toString()}`);
    }
  };

const SignIn = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  
  const dispatch = useDispatch()

  useEffect(() => {
    const checkAccessToken = async () => {
      try {
        const result = await AsyncStorage.getItem('AccessToken');
        const accessToken = result != null ? JSON.parse(result) : null;
        
        console.log(accessToken);  // Correctly logs the access token
        
        if (accessToken && accessToken.access_token) {
          dispatch(setTrue());
          navigation.navigate('BottomTabNav', { screen: 'Home' });
        }
      } catch (error) {
        console.log('Error fetching token:', error);
      }
    };
  
    checkAccessToken();
  }, []);
  

  const handleSignIn = async () => {
    const url = "https://api.escuelajs.co/api/v1/auth/login";
    const data = {
      email: email,
      password: password,
    };
    const result = await fetchUser(url, data);
    const AccessToken = result.access_token;
    
    if(result.access_token){
        await AsyncStorage.setItem('AccessToken',JSON.stringify(result))
        dispatch(setTrue())
        navigation.navigate('BottomTabNav')
    }
    else{
        console.log('No user found');  
    }


  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <KeyboardAvoidingView
        touch
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <SafeAreaView style={{ backgroundColor: colors.WHITE }}>
          <View style={styles.contianer}>
            <View style={styles.signInWelcomeTxtWrapper}>
              <Text style={styles.SignInText}>Sign In</Text>
              <Text style={styles.welcomeText}>
                Hii Welcome back, you've been missed
              </Text>
            </View>
            <View style={styles.bothinputsWrapper}>
              <View style={styles.inputContianer}>
                <Text style={styles.inputHeading}>Email</Text>
                <TextInput
                  textContentType="emailAddress"
                  placeholder="example@gmail.com"
                  style={styles.input}
                  value={email}
                  onChangeText={(value) => setEmail(value)}
                />
              </View>
              <View style={styles.inputContianer}>
                <Text style={styles.inputHeading}>Password</Text>
                <TextInput
                  value={password}
                  onChangeText={(value) => setPassword(value)}
                  secureTextEntry
                  textContentType="password"
                  style={styles.input}
                />
                <TouchableOpacity style={styles.FotgetPasswordButton}>
                  <Text style={styles.FotgetPasswordButtonText}>
                    Forget Password?
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <Button onPress={handleSignIn} text="Sign In" />
            <View style={styles.orSigninWithwrapper}>
              <View style={styles.horizintalLine}></View>
              <Text style={styles.orSigninWithtext}>Or Sign in with</Text>
              <View style={styles.horizintalLine}></View>
            </View>
            <View style={styles.iconsContainer}>
              <TouchableOpacity style={styles.icons}>
                <AntDesign name="apple1" size={24} color="black" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.icons}>
                <AntDesign name="google" size={24} color="black" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.icons}>
                <FontAwesome name="facebook-f" size={24} color="black" />
              </TouchableOpacity>
            </View>
            <Text style={styles.lasttext}>
              Don't have an account?{" "}
              <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
                <Text style={styles.signUpButton}>Sign Up</Text>
              </TouchableOpacity>
            </Text>
          </View>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  contianer: {
    height: "100%",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-around",
  },
  signInWelcomeTxtWrapper: {
    alignItems: "center",
  },
  SignInText: {
    fontFamily: FONTS.Inter_Medium,
    fontSize: 30,
    color: colors.BLACK,
    marginBottom: 15,
    // marginTop:40
  },

  input: {
    backgroundColor: colors.LIGHT,
    width: screenWidth - 50,
    padding: 13,
    fontFamily: FONTS.Inter_Medium,
    borderRadius: 10,
    marginBottom: 5,
  },
  inputHeading: {
    color: colors.BLACK,
    fontFamily: FONTS.Inter_Medium,
    marginTop: 15,
  },
  FotgetPasswordButton: {
    alignItems: "flex-end",
  },
  FotgetPasswordButtonText: {
    textDecorationLine: "underline",
    color: colors.LIGHT_RED,
    fontFamily: FONTS.Inter_Medium,
  },
  SignInButton: {
    backgroundColor: colors.LIGHT_RED,
    width: screenWidth - 50,
    padding: 16,
    borderRadius: 100,
    alignItems: "center",
  },
  SignInButtonText: {
    color: colors.LIGHT,
    fontSize: 20,
    fontFamily: FONTS.Inter_Medium,
  },
  orSigninWithwrapper: {
    display: "flex",
    flexDirection: "row",
  },

  horizintalLine: {
    backgroundColor: colors.GRAY,
    width: 70,
    height: 0.5,
    alignSelf: "center",
    marginHorizontal: 10,
  },
  orSigninWithtext: {
    color: colors.GRAY,
    fontFamily: FONTS.Inter_Medium,
  },
  iconsContainer: {
    display: "flex",
    flexDirection: "row",
  },
  icons: {
    width: 50,
    height: 50,
    borderWidth: 0.5,
    borderColor: colors.GRAY,
    borderRadius: "25",
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 5,
  },
  signUpButton: {
    textDecorationLine: "underline",
    color: colors.LIGHT_RED,
    fontFamily: FONTS.Inter_Medium,
  },
  lasttext: {
    color: colors.BLACK,
    fontFamily: FONTS.Inter_Medium,
  },
});
