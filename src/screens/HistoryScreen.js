import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,TouchableOpacity } from 'react-native';

export default function HistoryScreen({navigation}) {
  return (
    <View style={styles.container}>
      <Text>history</Text>
      <TouchableOpacity onPress={() =>{ navigation.navigate('HomeScreen')}}><Text>go to home screen!</Text></TouchableOpacity>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});