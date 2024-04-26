import React from "react";
import { View, StyleSheet } from "react-native";

// use percent, bgcolor, color of bar
const ProgressBar = ({ percentage, bgColor, color }) => {
  return (
    <View style={[styles.container, { backgroundColor: bgColor  }]}>
      <View
        style={[
          styles.progressBar,
          { width: `${percentage}%`, backgroundColor: color  },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 0.5,
    height: 10,
    width: 150,
    borderRadius: 5,
    overflow: "hidden",
  
  },
  progressBar: {
    height: "100%",
  },
});

export default ProgressBar;
