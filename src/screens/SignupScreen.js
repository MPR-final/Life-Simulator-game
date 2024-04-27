import { View, StyleSheet, Text, ScrollView, Alert } from "react-native";
import InputCustom from "../components/InputCustom";
import SubmitButton from "../components/SubmitButton";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { createUser } from "../util/auth";
import LoadingOverLay from "../components/LoadingOverLay";

function SignupScreen() {
  const navigation = useNavigation();
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [enteredConfirmPassword, setEnteredConfirmPassword] = useState("");
  const [credentialsInvalid, setCredentialsInvalid] = useState({
    email: false,
    password: false,
    confirmedPassword: false,
  });

  // function to navigate to Login Screen
  function handleLoginPress() {
    navigation.navigate("LoginScreen");
  }

  // handling user input
  function handleInput(inputType, input) {
    switch (inputType) {
      case "email":
        setEnteredEmail(input);
        setCredentialsInvalid({
          email: false,
          password: false,
          confirmedPassword: false,
        });
        break;
      case "password":
        setEnteredPassword(input);
        setCredentialsInvalid({
          email: false,
          password: false,
          confirmedPassword: false,
        });

        break;
      case "confirmedPassword":
        setEnteredConfirmPassword(input);
        setCredentialsInvalid({
          email: false,
          password: false,
          confirmedPassword: false,
        });

        break;
    }
  }

  //validate user input and sign user up
  async function validateUserInput() {
    const email = enteredEmail.trim();
    const password = enteredPassword.trim();

    const emailIsValid = email.includes("@");
    const passwordIsValid = password.length > 6;
    const passwordsAreEqual = enteredPassword === enteredConfirmPassword;

    if (!emailIsValid || !passwordIsValid || !passwordsAreEqual) {
      setCredentialsInvalid({
        email: !emailIsValid,
        password: !passwordIsValid,
        confirmedPassword: !passwordIsValid || !passwordsAreEqual,
      });
      return;
    }
    setIsAuthenticating(true);
    try {
      await createUser(email, password);
    } catch (error) {
      Alert.alert('Sign Up Error', "Something went wrong, Please try again later.")
    }
    setIsAuthenticating(false);
    navigation.navigate("LoginScreen");
  }

  if (isAuthenticating) {
    return <LoadingOverLay message="Creating User..."></LoadingOverLay>;
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.yellowHalf}></View>
        <View style={styles.subContainer}>
          <Text style={styles.header}>Sign Up</Text>
          <View style={styles.formContainer}>
            <Text style={styles.pageText}>Email</Text>
            <InputCustom
              placeholder="Enter email"
              keyboardType="email-address"
              autoCapitalize="none"
              secureTextEntry={true}
              onChangeText={handleInput.bind(this, "email")}
            />
            {credentialsInvalid.email ? (
              <Text style={{ color: "red", marginBottom: 5 }}>
                * Invalid email
              </Text>
            ) : null}

            <Text style={styles.pageText}>Password</Text>
            <InputCustom
              placeholder="Enter password"
              secureTextEntry={true}
              onChangeText={handleInput.bind(this, "password")}
            />
            {credentialsInvalid.password ? (
              <Text style={{ color: "red" }}>* Invalid password</Text>
            ) : null}

            <Text style={styles.pageText}>Confirm Password</Text>
            <InputCustom
              placeholder="Enter password again"
              secureTextEntry={true}
              onChangeText={handleInput.bind(this, "confirmedPassword")}
            />
            {credentialsInvalid.confirmedPassword ? (
              <Text style={{ color: "red" }}>* Passwords don't match</Text>
            ) : null}
          </View>
          <SubmitButton title="Sign Up" onPress={validateUserInput} />
        </View>
        <View style={styles.questionContainer}>
          <Text style={styles.pageText}>
            Already have an account?{" "}
            <Text
              style={[styles.pageText, { color: "#D9A648" }]}
              onPress={handleLoginPress}
            >
              Login
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
    height: 620,
    borderRadius: 30,
    paddingHorizontal: 45,
    paddingVertical: 45,
    marginBottom: 40,
    marginTop: 120,
    elevation: 12,
  },
  header: {
    fontSize: 42,
    fontWeight: "bold",
    marginBottom: 42,
  },
  formContainer: {
    marginBottom: 10,
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

export default SignupScreen;
