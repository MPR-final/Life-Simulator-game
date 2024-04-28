import { StyleSheet, View, Text, useWindowDimensions } from "react-native";
import SubmitButton from "../components/SubmitButton";

export default function HomeScreen({ navigation }) {
  const { height } = useWindowDimensions();

   // Function handle navigation to InforLife component
  function handleInforLife(){
    navigation.navigate("MainScreen");
  }

  // Function handle navigation to InstructionScreen
  function handleInstruction(){
    navigation.navigate("InstructionScreen");
  }

  // Function handle navigation to HistoryScreen
  function handleHistory(){
    navigation.navigate("HistoryScreen");
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
        <SubmitButton
            title="Start"
            onPress={handleInforLife}
        />
        <SubmitButton
            title="Instruction"
            onPress={handleInstruction}
        />
        <SubmitButton
            title="History"
            onPress={handleHistory}
        />
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
