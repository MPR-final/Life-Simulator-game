import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

export default function FirstScreen({navigation}) {
  return (
    <View style={styles.container}>
      <Text>first</Text>
      <TouchableOpacity
        style={styles.addExpenses}
        activeOpacity={0.8}
        onPress={() => {navigation.navigate('HomeScreen');}}
      >
        <Text style={styles.text}>click me!</Text>
      </TouchableOpacity>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
