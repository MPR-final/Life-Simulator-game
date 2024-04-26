import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect, useContext, useRef } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  ScrollView,
  useWindowDimensions,
  ImageBackground,
} from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";

export default function FirstScreen({navigation}) {
  
  return (
    <View style={styles.container}>
      <Text>first</Text>
      <TouchableOpacity
        style={styles.addExpenses}
        activeOpacity={0.8}
        onPress={() => {navigation.navigate('InstructionScreen');}}
      >
        <Text style={styles.text}>click me!</Text>
      </TouchableOpacity>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
