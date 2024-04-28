import { useState, useContext, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  useWindowDimensions,
  Pressable,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import { AuthContext } from "../store/AuthContext";
import Popup from "../components/Popup";

export default function HomeScreen({ navigation }) {
  const mainContext = useContext(AuthContext);
  const { height } = useWindowDimensions();
  const [isGiftPress, setIsGiftPress] = useState(false);

  const [pickedStatus, setPickedStatus] = useState("");
  const [bonusPoint, setBonusPoint] = useState(0);
  const [photoSrc, setPhotoSrc] = useState();
  const [isRevceiedGift, setIsReceiveGift] = useState(false);

  console.log(mainContext.player);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsReceiveGift(false);
    }, 24 * 60 * 60 * 1000);

    return () => clearTimeout(timer);
  }, [isGiftPress]);

  useEffect(() => {
    switch (pickedStatus) {
      case "health":
        setPhotoSrc(require("../assets/health.png"));
        break;
      case "intel":
        setPhotoSrc(require("../assets/intelligent.png"));
        break;
      case "relationship":
        setPhotoSrc(require("../assets/Relationship.png"));
        break;
      case "money":
        setPhotoSrc(require("../assets/salary.png"));
        break;
    }
  }, [pickedStatus]);

  function closeGiftBox() {
    setIsGiftPress(false);
    setIsReceiveGift(true);
  }


  // function to handle present press
  function handleGiftPress() {
    if (Object.keys(mainContext.player).length === 0) {
      Alert.alert("Gift Warning", "You have to create an user in game first.");
    } else {
      const options = ["health", "money", "relationship", "intel"];
      const randomOption = options[Math.floor(Math.random() * options.length)];
      const bonusScore = Math.floor(Math.random() * 101);
      const updateObj = { ...mainContext.player };
      const updatedSatus = { ...updateObj.status };

      switch (randomOption) {
        case "health":
          updatedSatus.health += bonusScore;
          break;
        case "money":
          updatedSatus.money += bonusScore;
          break;
        case "intel":
          updatedSatus.intel += bonusScore;
          break;
        case "relationship":
          updatedSatus.relationship += bonusScore;
          break;
      }

      updateObj.status = updatedSatus;
      mainContext.addPlayer(updateObj);
      setPickedStatus(randomOption);
      setBonusPoint(bonusScore);
      setIsGiftPress(true);
    }
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
      {!isRevceiedGift && (
        <View>
          <TouchableOpacity
            style={styles.giftContainer}
            onPress={handleGiftPress}
          >
            <Image
              style={styles.img}
              source={require("../assets/gift-box.png")}
            ></Image>
          </TouchableOpacity>
        </View>
      )}
      {isGiftPress && (
        <Popup
          srcImg={photoSrc}
          height={700}
          HandleClose={closeGiftBox}
          message={`You have ${bonusPoint} bonus points which is added to your "${pickedStatus}" status!!!`}
        ></Popup>
      )}
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
        {Object.keys(mainContext.player).length === 0 ||
        mainContext.player.reasonOfDeath.length !== 0 ? (
          <Pressable
            onPress={() => {
              navigation.navigate("InforLife");
            }}
            style={({ pressed }) => [
              styles.startBtn,
              pressed ? { opacity: 0.9 } : null,
            ]}
          >
            <Text style={{ color: "white", fontSize: 40, fontWeight: "bold" }}>
              Start
            </Text>
          </Pressable>
        ) : (
          <Pressable
            onPress={() => {
              navigation.navigate("InstructionScreen");
            }}
            style={({ pressed }) => [
              styles.startBtn,
              pressed ? { opacity: 0.9 } : null,
            ]}
          >
            <Text style={{ color: "white", fontSize: 40, fontWeight: "bold" }}>
              Continue
            </Text>
          </Pressable>
        )}
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
    // borderWidth: 1
  },
  headerContainer: {
    alignItems: "center",
    justifyContent: "center",
    // borderWidth: 1,
    marginVertical: -70,
  },
  btnContainer: {
    height: "35%",
    width: "50%",
    justifyContent: "space-around",
    alignItems: "center",
    // borderWidth: 1,
    marginBottom: 80,
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
    top: -5,
    right: -180,
    marginTop: -40,
    zIndex: 99,
  },
  img: {
    width: 60,
    height: 60,
  },
});
