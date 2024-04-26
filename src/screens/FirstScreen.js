// import { StatusBar } from "expo-status-bar";
// import React, { useState, useEffect, useContext, useRef } from "react";
// import {
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
//   Image,
//   ScrollView,
//   useWindowDimensions,
//   ImageBackground,
// } from "react-native";
// import FontAwesome from "@expo/vector-icons/FontAwesome";

// export default function FirstScreen({navigation}) {
  
//   return (
//     <View style={styles.container}>
//       <Text>first</Text>
//       <TouchableOpacity
//         style={styles.addExpenses}
//         activeOpacity={0.8}
//         onPress={() => {navigation.navigate('InstructionScreen');}}
//       >
//         <Text style={styles.text}>click me!</Text>
//       </TouchableOpacity>
//       <StatusBar style="auto" />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//   },
// });

import { StyleSheet, View, Text, useWindowDimensions } from "react-native";
import SubmitButton from "../components/SubmitButton";

function FirstScreen({ navigation }) {
  const { height } = useWindowDimensions();

  // Function handle navigation to Login Screen
  function handleLoginPress(){
    navigation.navigate("LoginScreen");
  }

    // Function handle navigation to SignUp Screen
    function handleSignUpPress(){
      navigation.navigate("SignupScreen");
    }
  return (
    <View style={styles.container}>
      <View style={styles.bigCir}></View>
      <View style={styles.mediumCir}></View>
      <View style={styles.botCir}></View>
      <View style={styles.smallCir}></View>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Life</Text>
        <Text style={styles.header}>Simulator</Text>
      </View>
      <View
        style={[
          styles.btnContainer,
          height < 450
            ? { flexDirection: "row", justifyContent: "space-around" }
            : null,
        ]}
      >
        <SubmitButton title="Login" onPress={handleLoginPress} />
        <SubmitButton title="Sign up" onPress={handleSignUpPress} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F6F1E3",
    alignItems: "center",
    justifyContent: "space-around",
  },
  headerContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  btnContainer: {
    height: "20%",
    width: "50%",
    justifyContent: "space-around",
    // borderWidth: 1
  },
  header: {
    fontSize: 70,
    fontWeight: "bold",
  },
  bigCir: {
    backgroundColor: "#F2C167",
    width: 300,
    height: 300,
    borderRadius: 150,
    position: "absolute",
    top: 200,
    right: -100,
  },
  mediumCir: {
    backgroundColor: "#F2C167",
    width: 200,
    height: 200,
    borderRadius: 100,
    position: "absolute",
    top: -70,
    left: -50,
  },
  botCir: {
    backgroundColor: "#F2C167",
    width: 200,
    height: 200,
    borderRadius: 100,
    position: "absolute",
    bottom: -90,
    left: -90,
  },
  smallCir:{
    backgroundColor: "#F2C167",
    width: 70,
    height: 70,
    borderRadius: 35,
    position: "absolute",
    top: 450,
    left: 90
  }
});

export default FirstScreen;
