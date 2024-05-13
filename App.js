import { StyleSheet, Text, View, Image, ImageBackground } from "react-native";
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useFonts } from "expo-font";
import HomeScreen from "./src/screens/HomeScreen.js";
import EndgameScreen from "./src/screens/EndgameScreen.js";
import FirstScreen from "./src/screens/FirstScreen.js";
import HistoryScreen from "./src/screens/HistoryScreen.js";
import InstructionScreen from "./src/screens/InstructionScreen.js";
import LoginScreen from "./src/screens/LoginScreen.js";
import MainScreen from "./src/screens/MainScreen.js";
import SignupScreen from "./src/screens/SignupScreen.js";
import LoadingOverLay from "./src/components/LoadingOverLay.js";
import Popup from "./src/components/Popup.js";
import AuthContextProvider, { AuthContext } from "./src/store/AuthContext.js";
import { useContext } from "react";
import InforLife from "./src/components/InforLife.js";

const Stack = createNativeStackNavigator();

function AuthScreens() {
  
  const [hideSplashScreen, setHideSplashScreen] = React.useState(true);
  
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="FirstScreen" component={FirstScreen} />
      <Stack.Screen name="SignupScreen" component={SignupScreen} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
    </Stack.Navigator>
  );
}
function GameScreens() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="InforLife" component={InforLife} />
      <Stack.Screen name="InstructionScreen" component={InstructionScreen} />
      <Stack.Screen name="HistoryScreen" component={HistoryScreen} />
      <Stack.Screen name="MainScreen" component={MainScreen} />
      <Stack.Screen name="EndgameScreen" component={EndgameScreen} />
    </Stack.Navigator>
  );
}

function Navigation() {
  const authCtx = useContext(AuthContext);
  return (
    <NavigationContainer>
      {!authCtx.isLogin && <AuthScreens></AuthScreens>}
      {authCtx.isLogin && <GameScreens></GameScreens>}
    </NavigationContainer>
  );
}

export default function App() {
  const [hideSplashScreen, setHideSplashScreen] = React.useState(true);
  const [fontsLoaded, error] = useFonts({
    "Inter-Regular": require("./src/assets/fonts/Inter-Regular.ttf"),
    "Inter-Medium": require("./src/assets/fonts/Inter-Medium.ttf"),
    "Inter-SemiBold": require("./src/assets/fonts/Inter-SemiBold.ttf"),
    "Inter-Bold": require("./src/assets/fonts/Inter-Bold.ttf"),
    "ZenKurenaido-Regular": require("./src/assets/fonts/ZenKurenaido-Regular.ttf"),
    "NosiferCaps-Regular": require("./src/assets/fonts/NosiferCaps-Regular.ttf")
  });

  return (
    <AuthContextProvider>
      <Navigation></Navigation>
    </AuthContextProvider>
  );
}
