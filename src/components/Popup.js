import React from "react";
import { View, StyleSheet, TouchableOpacity, Image, Text } from "react-native";

const Popup = ({ message, srcImg, HandleClose, height }) => {
  const styles = StyleSheet.create({
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
    <View style={styles.overlay}>
      <View style={styles.messageBox}>
        <TouchableOpacity
          style={styles.exitBox}
          activeOpacity={0.8}
          onPress={HandleClose}
        >
          <Image style={styles.exit} source={require("../assets/button.png")} />
        </TouchableOpacity>
        <Image style={styles.pauseIn} source={srcImg} />
        <View style={styles.textBoxin}>
          <Text style={styles.message}>{message}</Text>
        </View>
      </View>
    </View>
  );
};

export default Popup;

{
  /** HOW TO USE?? 
    <Popup message = "dasdasd" HandleClose={console.log("ook")} height={height}/> 
    ----height is height of screen-----
    */
}
