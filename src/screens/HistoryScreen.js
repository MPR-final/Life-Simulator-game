import { StatusBar } from 'expo-status-bar';
import { useContext } from 'react';
import { StyleSheet, Text, View,TouchableOpacity } from 'react-native';
import { AuthContext } from '../store/AuthContext';

export default function HistoryScreen({navigation}) {
  const mainContext = useContext(AuthContext);
  console.log(mainContext.localID);
  console.log(mainContext.player);
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