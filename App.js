import { StyleSheet, Text, View, Image, ImageBackground } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

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

const Stack = createNativeStackNavigator();

function AuthScreens() {
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
  return (
    <AuthContextProvider>
      <Navigation></Navigation>
    </AuthContextProvider>
  );
}
