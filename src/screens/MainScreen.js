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
import characterData from "../data/characterData";
import ProgressBar from "../components/progressBar.js";

export default function MainScreen() {
  const windowDimensions = useWindowDimensions();
  const width = windowDimensions.width;
  const height = windowDimensions.height;
  const isPortrait = height > width;

  const percentage = 30; // Phần trăm hiển thị của thanh chạy ngang
  return (
    <View style={styles.container}>
      {/** header */}
      <View>
        
      </View>

      {/** character */}
      <View></View>

      {/** 4 chi so */}
      <View>
        {/* <ProgressBar percentage={percentage} bgColor={"red"} color={"yellow"} /> */}
        {/* <ProgressBar percentage={percentage} bgColor={"red"} color={"yellow"} /> */}
        {/* <ProgressBar percentage={percentage} bgColor={"red"} color={"yellow"} /> */}
        {/* <ProgressBar percentage={percentage} bgColor={"red"} color={"yellow"} /> */}
      </View>

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
