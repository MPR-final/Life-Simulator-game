import { View, Text, StyleSheet, ScrollView } from "react-native";
import InputCustom from "../components/InputCustom";
import SubmitButton from "../components/SubmitButton";
import { useNavigation } from "@react-navigation/native";

function LoginScreen() {
  const navigation = useNavigation();

  // function to navigate to SignUp Screen
  function handleSignUpPress(){
    navigation.navigate('SignupScreen');
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
            />
            <Text style={styles.pageText}>Password</Text>
            <InputCustom
              placeholder="Enter password again"
              secureTextEntry={true}
            />
          </View>
          <SubmitButton title="Login" />
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
    marginBottom: 40,
    marginTop: 120,
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
    marginBottom: 70,
  },
});
export default LoginScreen;
