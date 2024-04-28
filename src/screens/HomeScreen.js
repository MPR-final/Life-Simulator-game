import { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  useWindowDimensions,
  Pressable,
  Image,
  TouchableOpacity,
} from "react-native";
import InforLife from "../components/InforLife";

export default function HomeScreen({ navigation }) {
  const { height } = useWindowDimensions();
  const [isCreatingPlayer, setIsCreatingPlayer] = useState(false);

  // Function handle navigation to InforLife component
  function handleInforLife() {
    setIsCreatingPlayer(!isCreatingPlayer);
  }

  if (isCreatingPlayer) {
    return <InforLife closePress={handleInforLife}></InforLife>;
  }

  // Function handle navigation to InstructionScreen
  function handleInstruction() {
    navigation.navigate("InstructionScreen");
  }

  // Function handle navigation to HistoryScreen
  function handleHistory() {
    navigation.navigate("HistoryScreen");
  }

  return (
    <View style={styles.container}>
      <View>
        <TouchableOpacity style={styles.giftContainer}>
          <Image
            style={styles.img}
            source={require("../assets/gift-box.png")}
          ></Image>
        </TouchableOpacity>
      </View>
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
        <Pressable
          onPress={handleInforLife}
          style={({ pressed }) => [
            styles.startBtn,
            pressed ? { opacity: 0.9 } : null,
          ]}
        >
          <Text style={{ color: "white", fontSize: 40, fontWeight: "bold" }}>
            Start
          </Text>
        </Pressable>
        <Pressable
          onPress={handleInstruction}
          style={({ pressed }) => [
            styles.subBtn,
            pressed ? { opacity: 0.9 } : null,
          ]}
        >
          <Text style={{ color: "white", fontSize: 17, fontWeight: "bold" }}>
            INSTRUCTION
          </Text>
        </Pressable>
        <Pressable
          onPress={handleHistory}
          style={({ pressed }) => [
            styles.subBtn,
            pressed ? { opacity: 0.9 } : null,
          ]}
        >
          <Text style={{ color: "white", fontSize: 17, fontWeight: "bold" }}>
            HISTORY
          </Text>
        </Pressable>
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
    height: "35%",
    width: "50%",
    justifyContent: "space-around",
    alignItems: "center",
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
  smallCir: {
    backgroundColor: "#F2C167",
    width: 70,
    height: 70,
    borderRadius: 35,
    position: "absolute",
    top: 450,
    left: 90,
  },
  startBtn: {
    justifyContent: "center",
    alignItems: "center",
    height: "33%",
    backgroundColor: "#EDA41D",
    borderRadius: 7,
    borderBottomWidth: 5,
    borderBottomColor: "#B27605",
    elevation: 4,
    marginBottom: 40,
    width: "100%",
  },
  subBtn: {
    height: "20%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#EDA41D",
    borderRadius: 7,
    borderBottomWidth: 5,
    borderBottomColor: "#B27605",
    elevation: 4,
    marginBottom: 30,
    width: "90%",
  },
  giftContainer: {
    position: "absolute",
    top: 5,
    right: -180,
    zIndex: 99,
  },
  img: {
    width: 60,
    height: 60,
  },
});
