import { View, Text, StyleSheet, ScrollView, Alert } from "react-native";
import InputCustom from "../components/InputCustom";
import SubmitButton from "../components/SubmitButton";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { login } from "../util/auth";
import LoadingOverLay from "../components/LoadingOverLay";
import Popup from "../components/Popup";

function LoginScreen() {
  const navigation = useNavigation();
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [isError, setIsError] = useState(false);
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");

  //function to handle user input
  function handleUserInput(inputType, input) {
    if (inputType === "email") {
      setEnteredEmail(input);
    }
    if (inputType === "password") {
      setEnteredPassword(input);
    }
  }

  // function to navigate to SignUp Screen
  function handleSignUpPress() {
    navigation.navigate("SignupScreen");
  }

  // function to log user in
  async function loginUser() {
    setIsAuthenticating(true);
    try {
      const response = await login(enteredEmail, enteredPassword);
      console.log(response.data);
      setIsAuthenticating(false);
      setEnteredEmail('');
      setEnteredPassword('');
    } catch (error) {
      setIsError(true);
      console.log('error')
    }
  }

  if (isAuthenticating) {
    if (isError) {
      return (
        <Popup
          message="Fail to log you in - Please check your email or password again."
          srcImg={require("../assets/error.png")}
          height={850}
          HandleClose={() => {
            setIsAuthenticating(false);
            setIsError(false)
          }}
        ></Popup>
      );
    }
    return <LoadingOverLay message="Logging in..."></LoadingOverLay>;
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.yellowHalf}></View>
        <View style={styles.subContainer}>
          <Text style={styles.header}>Login</Text>
          <View style={styles.formContainer}>
            <Text style={styles.pageText}>Email</Text>
            <InputCustom
              placeholder="Enter email"
              keyboardType="email-address"
              autoCapitalize="none"
              secureTextEntry={true}
              onChangeText={handleUserInput.bind(this, "email")}
            />
            <Text style={styles.pageText}>Password</Text>
            <InputCustom
              placeholder="Enter password"
              secureTextEntry={true}
              onChangeText={handleUserInput.bind(this, "password")}
            />
          </View>
          <SubmitButton title="Login" onPress={loginUser} />
        </View>
        <View style={styles.questionContainer}>
          <Text style={styles.pageText}>
            Don't have an account?{" "}
            <Text
              style={[styles.pageText, { color: "#D9A648" }]}
              onPress={handleSignUpPress}
            >
              Sign Up
            </Text>
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3ECDB",
    justifyContent: "center",
    alignItems: "center",
  },
  subContainer: {
    backgroundColor: "#ffffff",
    width: "87%",
    height: 594,
    borderRadius: 30,
    paddingHorizontal: 45,
    paddingVertical: 50,
    marginBottom: 60,
    marginTop: 120,
    elevation: 12,
  },
  header: {
    fontSize: 42,
    fontWeight: "bold",
    marginBottom: 42,
  },
  formContainer: {
    marginBottom: 60,
  },
  pageText: {
    fontSize: 20,
    fontWeight: "600",
  },
  yellowHalf: {
    width: 1000,
    height: 300,
    backgroundColor: "#FFB732",
    position: "absolute",
    top: -85,
  },
  questionContainer: {
    marginBottom: 90,
  },
});
export default LoginScreen;
