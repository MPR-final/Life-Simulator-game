import React, { useState, useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View, Animated } from "react-native";

const Timer = () => {
  const [isActive, setIsActive] = useState(false);
  const [progressValue, setProgressValue] = useState(0);
  const progress = new Animated.Value(progressValue);

  useEffect(() => {
    let animation = null;

    if (isActive) {
      animation = Animated.timing(progress, {
        toValue: 100,
        duration: 10000 * (1 - progressValue / 100),
        useNativeDriver: false,
      }).start(({ finished }) => {
        if (finished) {
          setProgressValue(0);
        }
      });
    } else {
      if (animation) {
        animation.stop();
      }
    }

    return () => {
      if (animation) {
        animation.stop();
      }
    };
  }, [isActive, progressValue]);

  const handleToggleTimer = () => {
    if (isActive) {
      progress.stopAnimation((value) => {
        setProgressValue(value);
        setIsActive(false);
      });
    } else {
      setIsActive(true);
    }
  };

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.bar,
          {
            width: progress.interpolate({
              inputRange: [0, 100],
              outputRange: ["0%", "100%"],
              extrapolate: "clamp",
            }),
          },
        ]}
      />
      <Text>{Math.floor(progressValue)}%</Text>
      <TouchableOpacity onPress={handleToggleTimer}>
        <Text>{isActive ? "Stop Timer" : "Start Timer"}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 20,
    backgroundColor: "#ccc",
    borderRadius: 10,
    margin: 10,
  },
  bar: {
    height: 20,
    backgroundColor: "#333",
    borderRadius: 10,
  },
});

export default Timer;
