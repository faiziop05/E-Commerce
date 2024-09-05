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
import Checkbox from "expo-checkbox";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState } from "react";
import { colors } from "../../COLORS";
import { Dimensions } from "react-native";
import { FONTS } from "../../Fonts";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Button from "../../Components/Button";
const screenWidth = Dimensions.get("window").width;

const Register = async (data) => {
  try {
    const response = await fetch("https://api.escuelajs.co/api/v1/users/", {
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
const ISAlreadyExsist = async (email) => {
  try {
    const response = await fetch(
      "https://api.escuelajs.co/api/v1/users/is-available",
      {
        method: "POST", // or 'PUT', 'PATCH', etc.
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(email), // Convert JavaScript object to JSON string
      }
    );
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(`Error: ${error.toString()}`);
  }
};

const SignUp = ({ navigation }) => {
  const [isChecked, setChecked] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    if (!isChecked) {
      alert("Please read and accept Terms and conditions");
    } else {
      const data = { name: name, email: email, password: password, avatar: "" };
      const mail = { email: email };
      const isAlreadyExistEmail = await ISAlreadyExsist(mail);
      console.log(isAlreadyExistEmail);

      if (isAlreadyExistEmail.isAvailable === false) {
        alert("Email Already Exist!!!");
      } else {
        const res = await Register(data);
        console.log(res);
        alert("Successfully created an account. Now please Login.");
        navigation.navigate("SignIn");
      }
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView style={{ backgroundColor: colors.WHITE }}>
        <View style={styles.contianer}>
          <View style={styles.signInWelcomeTxtWrapper}>
            <Text style={styles.SignInText}>Create Account</Text>
            <Text style={styles.welcomeText}>
              Fill your information below or register with your social account.
            </Text>
          </View>
          <KeyboardAvoidingView
            touch
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1 }}
          >
            <View style={styles.bothinputsWrapper}>
              <View style={styles.inputContianer}>
                <Text style={styles.inputHeading}>Name</Text>
                <TextInput
                  value={name}
                  onChangeText={(value) => setName(value)}
                  textContentType="name"
                  placeholder="Ex.Faizan Hanif"
                  style={styles.input}
                />
              </View>
              <View style={styles.inputContianer}>
                <Text style={styles.inputHeading}>Email</Text>
                <TextInput
                  value={email}
                  onChangeText={(value) => setEmail(value)}
                  textContentType="emailAddress"
                  placeholder="example@gmail.com"
                  style={styles.input}
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
              </View>
              <View style={styles.section}>
                <Checkbox
                  style={styles.checkbox}
                  value={isChecked}
                  onValueChange={setChecked}
                  color={isChecked ? colors.LIGHT_RED : undefined}
                />
                <Text style={styles.paragraph}>Agree With </Text>
                <TouchableOpacity style={styles.FotgetPasswordButton}>
                  <Text style={styles.FotgetPasswordButtonText}>
                    Terms and Conditions
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            <Button onPress={handleSubmit} text="Sign Up" />
          </KeyboardAvoidingView>
          <View style={styles.orSigninWithwrapper}>
            <View style={styles.horizintalLine}></View>
            <Text style={styles.orSigninWithtext}>Or Sign up with</Text>
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
            Already have an account?{" "}
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("SignIn");
              }}
            >
              <Text style={styles.signUpButton}>Sign In</Text>
            </TouchableOpacity>
          </Text>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default SignUp;

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
    marginTop: 40,
  },
  welcomeText: {
    fontFamily: FONTS.Inter_Light,
    width: screenWidth - 150,
    color: colors.BLACK,
    textAlign: "center",

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
    marginTop: 40,
  },
  signUpButton: {
    textDecorationLine: "underline",
    color: colors.LIGHT_RED,
    fontFamily: FONTS.Inter_Medium,
  },
  lasttext: {
    color: colors.BLACK,
    fontFamily: FONTS.Inter_Medium,
    marginBottom: 40,
    marginTop: 40,
  },
  section: {
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
  },
  checkbox: {
    margin: 8,
  },
  paragraph: {
    fontSize: 15,
  },
});
