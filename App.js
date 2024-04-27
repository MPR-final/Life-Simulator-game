import * as React from "react";
import { View, Text, Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useFonts } from "expo-font";
import HistoryScreen from "./screens/HistoryScreen";
import EndgameScreen from "./screens/EndgameScreen";

const Stack = createNativeStackNavigator();

const HomeScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <Button
        title="Go to History Screen"
        onPress={() => navigation.navigate('HistoryScreen')}
      />
      <Button
        title="Go to EndgameScreen"
        onPress={() => navigation.navigate('EndgameScreen')}
      />
    </View>
  );
};

const App = () => {
  const [hideSplashScreen, setHideSplashScreen] = React.useState(true);
  const [fontsLoaded, error] = useFonts({
    "Inter-Regular": require("./assets/fonts/Inter-Regular.ttf"),
    "Inter-Medium": require("./assets/fonts/Inter-Medium.ttf"),
    "Inter-SemiBold": require("./assets/fonts/Inter-SemiBold.ttf"),
    "Inter-Bold": require("./assets/fonts/Inter-Bold.ttf"),
    "ZenKurenaido-Regular": require("./assets/fonts/ZenKurenaido-Regular.ttf"),
    "NosiferCaps-Regular": require("./assets/fonts/NosiferCaps-Regular.ttf")
  });

  if (!fontsLoaded && !error) {
    return null;
  }

  return (
    <NavigationContainer>
      {hideSplashScreen ? (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen
            name="Home"
            component={HomeScreen}
          />
          <Stack.Screen
            name="HistoryScreen"
            component={HistoryScreen}
          />
          <Stack.Screen
            name="EndgameScreen"
            component={EndgameScreen}
          />
        </Stack.Navigator>
      ) : null}
    </NavigationContainer>
  );
};

export default App;
