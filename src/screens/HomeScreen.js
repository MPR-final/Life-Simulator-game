import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function HomeScreen({navigation}) {
  return (
    <View style={styles.container}>
      <Text>home</Text>
      <TouchableOpacity onPress={() => {navigation.navigate('InstructionScreen')}}><Text>go to instruction screen!</Text></TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('HistoryScreen')}><Text>go to history screen!</Text></TouchableOpacity>
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