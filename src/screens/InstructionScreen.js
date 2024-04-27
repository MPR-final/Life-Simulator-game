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
import ProgressBar from "../components/progressBar.js";

export default function InstructionScreen({navigation}) {
  const windowDimensions = useWindowDimensions();
  const width = windowDimensions.width;
  const height = windowDimensions.height;
  const isPortrait = height > width;
  console.log("height: " + height + " width: " + width);

  {
    /** set bg color for character */
  }
  const bgCharacter = "#F5ACE1";

  {
    /** instruction component */
  }
  const InstructionBox = ({ message, srcImg }) => {
    return (
      <View style={styles.overlay}>
        <View style={styles.messageBox}>
          <TouchableOpacity
            style={styles.exitBox}
            activeOpacity={0.8}
            onPress={() => {
              setShowPause(false),
                setShowAge(false),
                setShowCharacter(false),
                setShowHealth(false),
                setShowIntell(false),
                setShowMoney(false),
                setShowRelate(false),
                setShowTime(false);
            }}
          >
            <Image
              style={styles.exit}
              source={require("../assets/button.png")}
            />
          </TouchableOpacity>
          <Image style={styles.pauseIn} source={srcImg} />
          <View style={styles.textBoxin}>
            <Text style={styles.message}>{message}</Text>
          </View>
        </View>
      </View>
    );
  };

  {
    /** set show instruction for each elements */
  }
  const [showPause, setShowPause] = useState(false);
  const [showAge, setShowAge] = useState(false);
  const [showTime, setShowTime] = useState(false);
  const [showCharacter, setShowCharacter] = useState(false);
  const [showHealth, setShowHealth] = useState(false);
  const [showIntell, setShowIntell] = useState(false);
  const [showRelate, setShowRelate] = useState(false);
  const [showMoney, setShowMoney] = useState(false);
  // const [showInstruction, setShowInstruction] = useState(false);
  const [message, setMessage] = useState(false);
  {
    /** set message and show instruction */
  }

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
      // borderWidth: 0.5,
      width: "80%",
      alignItems: "flex-end",
      justifyContent: "flex-end",
      marginBottom: -20,
      marginLeft: 75
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
      width: "100%",
      height: "100%",
      justifyContent: "center",
      alignItems: "center",
    },
    img: {
      // borderWidth: 0.5,
      width: "75%",
      height: "75%",
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

    overlay: {
      position: "absolute",
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "rgba(0, 0, 0, 0.4)",
      zIndex: 1,
    },
    messageBox: {
      // borderWidth: 0.5,
      width: "80%",
      height: (1 / 4) * height,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "white",
      borderRadius: 10,
    },
    message: { fontSize: 20 },
    exitBox: {
      marginRight: "-95%",
    },
    exit: {
      width: 40,
      height: 40,
    },
    pauseIn: {
      width: 60,
      height: 60,
      marginTop: -15,
    },
    textBoxin: {
      // borderWidth: 0.5,
      width: "85%",
      height: "50%",
      marginBottom: 40,
      marginTop: 5,
      alignItems: "center",
      justifyContent: "center",
    },
  });

  return (
    <View style={styles.container}>
      {/** header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={{ marginBottom: -5 }}
          activeOpacity={0.8}
          onPress={() => {navigation.navigate('HomeScreen');}}
        >
          <Image
            style={{ width: 30, height: 30, marginBottom: -40, marginTop: 5 }}
            source={require("../assets/left-arrow.png")}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.pauseBox}
          activeOpacity={0.8}
          onPress={() => {
            setShowPause(true), setMessage("Pause");
          }}
        >
          <Image style={styles.pause} source={require("../assets/pause.png")} />
        </TouchableOpacity>

        <View style={styles.textBox}>
          <Text style={styles.headText}>Instruction</Text>
        </View>

        <View style={styles.lineBox}>
          <View style={styles.line}></View>
        </View>
      </View>

      {/** character */}
      <View style={styles.character}>
        <TouchableOpacity
          style={styles.timeline}
          activeOpacity={0.8}
          onPress={() => setShowTime(true)}
        >
          <ProgressBar percentage={85} bgColor={"#F5F5F3"} color={"#6CC3E8"} />
        </TouchableOpacity>

        <View style={styles.characterBox}>
          <TouchableOpacity
            style={styles.circleAge}
            activeOpacity={0.8}
            onPress={() => setShowAge(true)}
          >
            <Text style={styles.textAge}>2</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.characImg}
            activeOpacity={0.8}
            onPress={() => setShowCharacter(true)}
          >
            <Image style={styles.img} source={require("../assets/baby.png")} />
          </TouchableOpacity>
        </View>
      </View>

      {/** 4 chi so */}
      <View style={styles.progressBars}>
        <TouchableOpacity
          style={styles.Box}
          activeOpacity={0.8}
          onPress={() => setShowHealth(true)}
        >
          <Image style={styles.icon} source={require("../assets/health.png")} />
          <View style={styles.bar}>
            <ProgressBar
              percentage={50}
              bgColor={"#F5F5F3"}
              color={"#E15A6B"}
            />
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.Box}
          activeOpacity={0.8}
          onPress={() => setShowIntell(true)}
        >
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
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.Box}
          activeOpacity={0.8}
          onPress={() => setShowRelate(true)}
        >
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
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.Box}
          activeOpacity={0.8}
          onPress={() => setShowMoney(true)}
        >
          <Image style={styles.icon} source={require("../assets/salary.png")} />
          <View style={styles.bar}>
            <ProgressBar
              percentage={20}
              bgColor={"#F5F5F3"}
              color={"#94E86C"}
            />
          </View>
        </TouchableOpacity>
      </View>

      {showPause && (
        <InstructionBox
          message={
            "This is the pause button that helps you pause playing or exit to the main screen."
          }
          srcImg={require("../assets/pause.png")}
        />
      )}
      {showAge && (
        <InstructionBox
          message={"This is the current character's age."}
          srcImg={require("../assets/age.png")}
        />
      )}
      {showTime && (
        <InstructionBox
          message={
            "This is the character's 1 year time bar. Each year corresponds to 12 minutes in real life."
          }
          srcImg={require("../assets/timeline.png")}
        />
      )}
      {showCharacter && (
        <InstructionBox
          message={
            "This is your character's image, which will change depending on age."
          }
          srcImg={require("../assets/baby.png")}
        />
      )}
      {showHealth && (
        <InstructionBox
          message={
            "This is the character's health stat, which will be affected depending on your choices."
          }
          srcImg={require("../assets/health.png")}
        />
      )}
      {showIntell && (
        <InstructionBox
          message={
            "This is the character's intelligence stat, which will be affected depending on your choices."
          }
          srcImg={require("../assets/intelligent.png")}
        />
      )}
      {showRelate && (
        <InstructionBox
          message={
            "This is the character's relationship stat, which will be affected depending on your choices"
          }
          srcImg={require("../assets/Relationship.png")}
        />
      )}
      {showMoney && (
        <InstructionBox
          message={
            "This is the character's money stat, which will be affected depending on your choices"
          }
          srcImg={require("../assets/salary.png")}
        />
      )}

      <StatusBar style="auto" />
    </View>
  );
}
