import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import { Ionicons } from '@expo/vector-icons';
import { useFonts } from 'expo-font';

const EventNoChoice = ({ isVisible, onExit }) => {
  const [fontsLoaded] = useFonts({
    'Inika-Regular': require('../assets/fonts/Inika-Regular.ttf'),
    'Inika-Bold': require('../assets/fonts/Inika-Bold.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Modal isVisible={isVisible} backdropOpacity={0.7} style={styles.modal}>
      <View style={styles.container}>
        <TouchableOpacity style={styles.closeButton} onPress={onExit}>
          <View style={styles.closeButtonBackground}>
            <Ionicons name="close" size={14} color="#fff" />
          </View>
        </TouchableOpacity>
        <Text style={styles.descriptionText}>
          You are taking your first steps. You are wobbling and uncoordinated, but you are determined to get somewhere.
        </Text>
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
    borderRadius: 10,
    borderWidth: 4,
    borderColor: '#B3AEA5',
    position: 'relative',
  },
  closeButton: {
    position: 'absolute',
    top: -18,
    left: -18,
    zIndex: 1,
  },
  closeButtonBackground: {
    backgroundColor: 'red',
    borderRadius: 10,
    padding: 8,
  },
  descriptionText: {
    fontFamily: 'Inika-Regular',
    fontSize: 16,
    color: '#000000',
    marginVertical: 10,
    textAlign: 'center',
  },
});

export default EventNoChoice;