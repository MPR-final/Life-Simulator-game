import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect, useContext, useRef } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  useWindowDimensions,
} from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import ProgressBar from "../components/progressBar.js";
import CharacterData from "../components/getCharacterData.js";

export default function MainScreen() {
  const windowDimensions = useWindowDimensions();
  const width = windowDimensions.width;
  const height = windowDimensions.height;
  const isPortrait = height > width;
  console.log("height: " + height + " width: " + width);

  {
    /** set bg color & img for character */
  }
  const characterAge = 6;
  const gender = "female";
  const characterInfo = CharacterData({ characterAge, gender });
  console.log("character: " + characterInfo);
  const bgCharacter = characterInfo[1];


  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#F3ECDB",
      alignItems: "center",
      // justifyContent: "center",
    },
    header: {
      // borderWidth: 0.5,
      width: "90%",
      height: (1 / 6.5) * height,
      marginTop: 40,
    },
    pauseBox: {
      width: "100%",
      alignItems: "flex-end",
      justifyContent: "flex-end",
      marginBottom: -20,
    },
    pause: {
      width: 50,
      height: 50,
      alignItems: "flex-end",
      justifyContent: "flex-end",
      marginRight: -10,
    },
    textBox: {
      alignItems: "center",
      justifyContent: "center",
    },
    headText: {
      fontSize: 40,
      fontWeight: "600",
      color: "#2F2419",
    },
    lineBox: {
      alignItems: "center",
      justifyContent: "center",
    },
    line: {
      marginTop: 5,
      width: (2 / 2.5) * width,
      height: 3,
      backgroundColor: "#F8CA72",
    },

    character: {
      // borderWidth: 0.5,
      width: "100%",
      height: (1 / 2) * height,
      alignItems: "center",
    },
    characterBox: {
      // borderWidth: 0.5,
      width: "90%",
      height: "100%",
      backgroundColor: bgCharacter,
      position: "relative",
      marginTop: 30,
      
    },
    circleAge: {
      // borderWidth: 0.5,
      width: 80,
      height: 80,
      borderRadius: 40,
      backgroundColor: bgCharacter,
      alignItems: "center",
      // justifyContent: "center",
      position: "absolute",
      top: -40,
    },
    textAge: {
      marginTop: 5,
      fontSize: 30,
      fontWeight: "500",
    },
    timeline: {
      marginLeft: 70,
      marginBottom: -15,
    },
    characImg: {
      // borderWidth: 0.5,
      width: "67%",
      height: "100%",
      justifyContent: "center",
      alignItems: "center",
      marginLeft: "17.5%"
    },
    img: {
      // borderWidth: 0.5,
      width: "60%",
      height: "60%",
    },

    progressBars: {
      // borderWidth: 0.5,
      width: "90%",
      height: (1 / 4) * height,
      marginTop: 50,
    },
    Box: {
      // borderWidth: 0.5,
      height: "20%",
      marginBottom: 15,
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
    },
    icon: {
      width: 40,
      height: 40,
      marginRight: 25,
    },
    bar: {},
  });

  return (
    <View style={styles.container}>
      {/** header */}
      <View style={styles.header}>
        <View style={styles.pauseBox}>
          <Image style={styles.pause} source={require("../assets/pause.png")} />
        </View>

        <View style={styles.textBox}>
          <Text style={styles.headText}>Your Life</Text>
        </View>

        <View style={styles.lineBox}>
          <View style={styles.line}></View>
        </View>
      </View>

      {/** character */}
      <View style={styles.character}>
        <View style={styles.timeline}>
          <ProgressBar percentage={85} bgColor={"#F5F5F3"} color={"#6CC3E8"} />
        </View>

        <View style={styles.characterBox}>
          <View style={styles.circleAge}>
            <Text style={styles.textAge}>{characterAge}</Text>
          </View>
          <View style={styles.characImg}>
            {/* <Image style={styles.img} source={require("../assets/baby.png")} /> */}
            <Image style={styles.img} source={characterInfo[0]} />
          </View>
        </View>
      </View>

      {/** 4 chi so */}
      <View style={styles.progressBars}>
        <View style={styles.Box}>
          <Image style={styles.icon} source={require("../assets/health.png")} />
          <View style={styles.bar}>
            <ProgressBar
              percentage={50}
              bgColor={"#F5F5F3"}
              color={"#E15A6B"}
            />
          </View>
        </View>

        <View style={styles.Box}>
          <Image
            style={styles.icon}
            source={require("../assets/intelligent.png")}
          />
          <View style={styles.bar}>
            <ProgressBar
              percentage={70}
              bgColor={"#F5F5F3"}
              color={"#F8CA72"}
            />
          </View>
        </View>

        <View style={styles.Box}>
          <Image
            style={styles.icon}
            source={require("../assets/Relationship.png")}
          />
          <View style={styles.bar}>
            <ProgressBar
              percentage={60}
              bgColor={"#F5F5F3"}
              color={"#D394F9"}
            />
          </View>
        </View>

        <View style={styles.Box}>
          <Image style={styles.icon} source={require("../assets/salary.png")} />
          <View style={styles.bar}>
            <ProgressBar
              percentage={20}
              bgColor={"#F5F5F3"}
              color={"#94E86C"}
            />
          </View>
        </View>
      </View>

      <StatusBar style="auto" />
    </View>
  );
}
