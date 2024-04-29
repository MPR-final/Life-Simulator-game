import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Image,
  Pressable,
} from "react-native";
import InputCustom from "./InputCustom";
import SubmitButton from "./SubmitButton";
import { useContext, useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../store/AuthContext";
function InforLife() {
  const navigation = useNavigation();
  const [malePress, setMalePress] = useState(false);
  const [femalePress, setFemalePress] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [location, setLocation] = useState("");
  const [player, setPlayer] = useState({});
  const [playerIsCreated, setPlayerIsCreated] = useState(false);
  const mainContext = useContext(AuthContext);

  useEffect(() => {
    mainContext.addPlayer(player);
  }, [playerIsCreated]);

  function startGameHandler() {
    if (
      firstName !== "" &&
      lastName !== "" &&
      location !== "" &&
      (malePress !== false || femalePress !== false)
    ) {
      if (malePress) {
        setPlayer({
          name: firstName + " " + lastName,
          location: location,
          gender: "male",
          age: 0,
          progress: 0,
          reasonOfDeath: "",
          currentEventNum: 0,
          img: 0,
          status: {
            health: 250,
            intel: 250,
            relationship: 250,
            money: 250,
          },
        });
      }
      if (femalePress) {
        setPlayer({
          name: firstName + lastName,
          location: location,
          gender: "female",
          age: 0,
          progress: 0,
          reasonOfDeath: "",
          currentEventNum: 0,
          img: 0,
          lifeRoad: "",
          status: {
            health: 250,
            intel: 250,
            relationship: 250,
            money: 250,
          },
        });
      }
      setPlayerIsCreated(!playerIsCreated);
      setFirstName("");
      setLastName("");
      setLocation("");
      setFemalePress(false);
      setMalePress(false);
      navigation.navigate("HistoryScreen");
    }
  }

  function handleInput(inputType, inputText) {
    switch (inputType) {
      case "firstName":
        setFirstName(inputText);
        break;
      case "lastName":
        setLastName(inputText);
        break;
      case "location":
        setLocation(inputText);
        break;
    }
  }

  function touchPress_1() {
    if (!femalePress) {
      setMalePress(!malePress);
    } else {
      setFemalePress(!femalePress);
      setMalePress(!malePress);
    }
  }
  function touchPress_2() {
    if (!malePress) {
      setFemalePress(!femalePress);
    } else {
      setMalePress(!malePress);
      setFemalePress(!femalePress);
    }
  }
  return (
    <KeyboardAvoidingView behavior="position">
      <View style={styles.container}>
        <Pressable
          onPress={() => {
            navigation.navigate("HomeScreen");
          }}
          style={({ pressed }) => [
            styles.closeBtn,
            pressed ? { opacity: 0.75 } : null,
          ]}
        >
          <Image
            source={require("../assets/button.png")}
            style={styles.img}
          ></Image>
        </Pressable>

        <View style={styles.formContainer}>
          <View style={styles.headerContainer}>
            <Text style={styles.header}>CUSTOM LIFE</Text>
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.textInform}>First Name</Text>
            <InputCustom
              value={firstName}
              placeholder="Enter your first name"
              onChangeText={handleInput.bind(this, "firstName")}
            ></InputCustom>
            <Text style={styles.textInform}>Last Name</Text>
            <InputCustom
              value={lastName}
              placeholder="Enter your last name"
              onChangeText={handleInput.bind(this, "lastName")}
            ></InputCustom>
            <Text style={styles.textInform}>Location</Text>
            <InputCustom
              value={location}
              placeholder="Enter your country"
              onChangeText={handleInput.bind(this, "location")}
            ></InputCustom>
            <Text style={styles.textInform}>Gender</Text>
            <View style={styles.genderContainer}>
              <View style={styles.genderChoice}>
                <TouchableOpacity
                  onPress={touchPress_1}
                  style={[
                    styles.radiusBtn,
                    malePress ? { backgroundColor: "#403D3A" } : null,
                  ]}
                ></TouchableOpacity>
                <Text style={{ marginLeft: 5 }}>Male</Text>
              </View>
              <View style={styles.genderChoice}>
                <TouchableOpacity
                  onPress={touchPress_2}
                  style={[
                    styles.radiusBtn,
                    femalePress ? { backgroundColor: "#403D3A" } : null,
                  ]}
                ></TouchableOpacity>
                <Text style={{ marginLeft: 5 }}>Female</Text>
              </View>
            </View>
            <SubmitButton
              title="Begin Life"
              onPress={startGameHandler}
            ></SubmitButton>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F6F1E3",
    height: "100%",
  },
  formContainer: {
    backgroundColor: "white",
    width: "90%",
    height: 620,
    borderWidth: 3,
    borderColor: "#F9C631",
    borderRadius: 10,
    marginBottom: 60,
  },
  headerContainer: {
    borderWidth: 1,
    height: "15%",
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#F9C631",
  },
  header: {
    color: "red",
    fontSize: 30,
    fontWeight: "bold",
  },
  inputContainer: {
    borderWidth: 1,
    height: "85%",
    borderColor: "#F9C631",
    padding: 30,
  },
  textInform: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#403D3A",
  },
  radiusBtn: {
    height: 20,
    width: 20,
    borderWidth: 1,
    borderRadius: 10,
  },
  genderContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    margin: 18,
  },
  genderChoice: {
    flexDirection: "row",
  },
  closeBtn: {
    width: 40,
    height: 40,
    position: "relative",
    zIndex: 99,
    top: 25,
    right: -175,
  },
  img: {
    width: 40,
    height: 40,
  },
});

export default InforLife;
