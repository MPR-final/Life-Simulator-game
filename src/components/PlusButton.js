import React from "react";
import { View, StyleSheet, TouchableOpacity, Image, Text } from "react-native";


const PlusButton = () => {
  return (
      <View style={styles.container}>
        <Image style={styles.plus} source={require("../assets/plus.png")} />
      </View>
  );
};


const styles = StyleSheet.create({
  container: {
    // borderRadius: 0.5,
    width: 90,
    height: 90,
    backgroundColor: "#F3ECDB",
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    // position: 'absolute',
    marginTop: -50,
    marginLeft: "38%",
    // marginBottom: 100
  },
  plus: {
    width: 75,
    height: 75,
  },
 


});
export default PlusButton;



