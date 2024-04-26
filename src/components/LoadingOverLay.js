import { ActivityIndicator, View, Text, StyleSheet } from "react-native";

function LoadingOverLay({ message }) {
  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <ActivityIndicator size='large' color="#FFB732" />
        <Text style={styles.text}>{message}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 200,
    height: 200,
    // borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F3ECDB",
    borderRadius: 25,
  },
  text: {
    marginTop: 10,
    fontWeight: "bold",
    color: "#FFB732",
    fontSize: 20,
  },
  wrapper:{
    flex: 1,
   alignItems: 'center',
   justifyContent: 'center' 
  }
});

export default LoadingOverLay;
