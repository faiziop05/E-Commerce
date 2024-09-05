import "./gesture-handler";

import React, { useCallback, useEffect, useState } from "react";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";
import { HomeScreen, SignIn, SignUp } from "./AllScreens";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
const { Screen, Navigator } = createStackNavigator();
import { StatusBar } from "expo-status-bar";
import BottomTabNav from "./AllScreens/Screens/BottomTabNav";
import Store from "./redux/Store";
import { Provider, useSelector } from "react-redux";
export function SecondApp() {
  const [appIsReady, setAppIsReady] = useState(false);
  const IsLoggedIn = useSelector((state) => state.loginStatus.IsLoggedIn);

  useEffect(() => {
    async function prepare() {
      try {
        // Keep the splash screen visible while fetching resources
        await SplashScreen.preventAutoHideAsync();

        // Load fonts
        await Font.loadAsync({
          Inter_Black: require("./assets/static/Inter_18pt-Black.ttf"),
          Inter_BlackItalic: require("./assets/static/Inter_18pt-BlackItalic.ttf"),
          Inter_Bold: require("./assets/static/Inter_18pt-Bold.ttf"),
          Inter_BoldItalic: require("./assets/static/Inter_18pt-BoldItalic.ttf"),
          Inter_ExtraBold: require("./assets/static/Inter_18pt-ExtraBold.ttf"),
          Inter_ExtraBoldItalic: require("./assets/static/Inter_18pt-ExtraBoldItalic.ttf"),
          Inter_ExtraLight: require("./assets/static/Inter_18pt-ExtraLight.ttf"),
          Inter_ExtraLightItalic: require("./assets/static/Inter_18pt-ExtraLightItalic.ttf"),
          Inter_Italic: require("./assets/static/Inter_18pt-Italic.ttf"),
          Inter_Light: require("./assets/static/Inter_18pt-Light.ttf"),
          Inter_LightItalic: require("./assets/static/Inter_18pt-LightItalic.ttf"),
          Inter_Medium: require("./assets/static/Inter_18pt-Medium.ttf"),
          Inter_MediumItalic: require("./assets/static/Inter_18pt-MediumItalic.ttf"),
          Inter_Regular: require("./assets/static/Inter_18pt-Regular.ttf"),
          Inter_SemiBold: require("./assets/static/Inter_18pt-SemiBold.ttf"),
          Inter_SemiBoldItalic: require("./assets/static/Inter_18pt-SemiBoldItalic.ttf"),
          Inter_Thin: require("./assets/static/Inter_18pt-Thin.ttf"),
          Inter_ThinItalic: require("./assets/static/Inter_18pt-ThinItalic.ttf"),
        });

        // Simulate a delay, remove this in production
        await new Promise((resolve) => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      // Hide the splash screen when the app is ready
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
<NavigationContainer onReady={onLayoutRootView}>
  <Navigator screenOptions={{ headerShown: false }}>
    {IsLoggedIn ? (
      <Screen name="BottomTabNav" component={BottomTabNav} />
    ) : (
      <>
        <Screen name="SignIn" component={SignIn} />
        <Screen name="SignUp" component={SignUp} />
      </>
    )}
  </Navigator>
  <StatusBar backgroundColor="#FFFFFF" />
</NavigationContainer>

  );
}

function App() {
  return (
    <Provider store={Store}>
      <SecondApp />
    </Provider>
  );
}

export default App;
