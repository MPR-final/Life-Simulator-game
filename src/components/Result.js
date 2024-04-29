import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import { Ionicons } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import { FONT_PATHS } from '../constants/constants';

const Result = ({ isVisible, onExit, result, points }) => {
  const [fontsLoaded] = useFonts(FONT_PATHS);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Modal isVisible={isVisible} backdropOpacity={0.7} style={styles.modal}>
      <View style={styles.container}>
        <Text style={styles.resultText}>Result</Text>
        <Text style={styles.descriptionText}>
          {result}
        </Text>
        <View style={styles.iconContainer}>
          {/* Health */}
          <View style={styles.iconItem}>
            <Ionicons name="heart" size={24} color="#F8CA72" />
            <Text style={[styles.iconValue, points.health >= 0 ? styles.positiveValue : styles.negativeValue]}>
              {points.health >= 0 ? `+${points.health}` : points.health}
            </Text>
          </View>

          {/* Intelligence */}
          <View style={styles.iconItem}>
            <Ionicons name="book" size={24} color="#F8CA72" />
            <Text style={[styles.iconValue, points.intel >= 0 ? styles.positiveValue : styles.negativeValue]}>
              {points.intel >= 0 ? `+${points.intel}` : points.intel}
            </Text>
          </View>

          {/* Money */}
          <View style={styles.iconItem}>
            <Ionicons name="cash" size={24} color="#F8CA72" />
            <Text style={[styles.iconValue, points.money >= 0 ? styles.positiveValue : styles.negativeValue]}>
              {points.money >= 0 ? `+${points.money}` : points.money}
            </Text>
          </View>
          
          {/* Relationship */}
          <View style={styles.iconItem}>
            <Ionicons name="people" size={24} color="#F8CA72" />
            <Text style={[styles.iconValue, points.relationship >= 0 ? styles.positiveValue : styles.negativeValue]}>
              {points.relationship >= 0 ? `+${points.relationship}` : points.relationship}
            </Text>
          </View>

        </View>
        <TouchableOpacity style={styles.closeButton} onPress={onExit}>
          <View style={styles.closeButtonBackground}>
            <Ionicons name="close" size={14} color="#fff" />
          </View>
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
    borderRadius: 10,
    borderWidth: 4,
    borderColor: '#B68AC6',
    position: 'relative',
  },
  resultText: {
    fontFamily: 'Inika-Bold',
    fontSize: 40,
    color: '#DD72F8',
    alignSelf: 'center',
    marginTop: -30,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
    zIndex: 10,
    top: -30,
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: 10,
  },
  iconItem: {
    alignItems: 'center',
  },
  iconValue: {
    fontFamily: 'Imprima-Regular',
    fontSize: 14,
    marginTop: 5,
  },
  positiveValue: {
    color: 'green',
  },
  negativeValue: {
    color: 'red',
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
    marginBottom: 40,
  },
});

export default Result;