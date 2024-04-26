import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import { useFonts } from 'expo-font';

const PauseOverlay = ({ isVisible, onContinue, onEndGame, onHome }) => {
  const [fontsLoaded] = useFonts({
    'Inika-Bold': require('../assets/fonts/Inika-Bold.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Modal isVisible={isVisible} backdropOpacity={0.7} style={styles.modal}>
      <View style={styles.container}>
      <Text style={styles.pauseText}>Pause</Text>
        <TouchableOpacity style={styles.button} onPress={onContinue}>
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={onEndGame}>
          <Text style={styles.buttonText}>End Game</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={onHome}>
          <Text style={styles.buttonText}>Home</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: '#ffffff',
    padding: 20,
    paddingHorizontal: 50,
    borderRadius: 10,
    borderWidth: 4,
    borderColor: '#F8CA72',
  },
  pauseText: {
    fontFamily: 'Inika-Bold',
    fontSize: 40,
    color: '#F8CA72',
    alignSelf: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
    top: -20,
    zIndex: 10,
    marginTop: -40,
  },
  button: {
    backgroundColor: '#281F1F',
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 10,
    marginVertical: 10,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontFamily: 'Inika-Bold',
    textAlign: 'center',
  },
});

export default PauseOverlay;