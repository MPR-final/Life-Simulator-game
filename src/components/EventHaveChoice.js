import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import { useFonts } from 'expo-font';

const EventHaveChoice = ({ isVisible, onChoice1, onChoice2, onChoice3, onChoice4, detail, choice1, choice2, choice3, choice4 }) => {
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
        <Text style={styles.eventText}>Event</Text>
        <Text style={styles.descriptionText}>{detail}</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={onChoice1}>
            <Text style={styles.buttonText}>{choice1.choiceDetail}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={onChoice2}>
            <Text style={styles.buttonText}>{choice2.choiceDetail}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={onChoice3}>
            <Text style={styles.buttonText}>{choice3.choiceDetail}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={onChoice4}>
            <Text style={styles.buttonText}>{choice4.choiceDetail}</Text>
          </TouchableOpacity>
        </View>
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
  borderRadius: 10,
  borderWidth: 4,
  borderColor: '#F8CA72',
  width: '90%',
  },
  eventText: {
  fontFamily: 'Inika-Bold',
  fontSize: 40,
  color: '#F8CA72',
  alignSelf: 'center',
  marginTop: -30,
  marginBottom: 20,
  textShadowColor: 'rgba(0, 0, 0, 0.5)',
  textShadowOffset: { width: 0, height: 2 },
  textShadowRadius: 4,
  zIndex: 10,
  top: -11,
  },
  buttonContainer: {
  flexDirection: 'row',
  justifyContent: 'center',
  marginTop: 10,
  paddingHorizontal: 10,
  },
  button: {
  width: '65 %',
  textAlign: 'center',
  justifyContent: 'center',
  aspectRatio: 1.5,
  backgroundColor: '#F2B84B',
  borderRadius: 20,
  marginTop: 5,
  marginHorizontal: 5,
  elevation: 5,
  shadowColor: '#00000',
  shadowOffset: { width: -2, height: 4 },
  shadowOpacity: 0.9,
  shadowRadius: 10,
  borderColor: '#CC8C11',
  borderBottomWidth: 6,
  borderRightWidth: 0.01,
  borderLeftWidth: 0.01,
  },
  buttonText: {
  textAlign: 'center',
  fontFamily: 'Inika-Bold',
  color: '#000000',
  fontSize: 16,
  },
  descriptionText: {
  fontFamily: 'Inika-Regular',
  fontSize: 16,
  color: '#000000',
  marginBottom: 30,
  textAlign: 'center',
  },
  });
  
  

export default EventHaveChoice;
