import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import PauseOverlay from '../components/PauseOverlay';
import EventHaveChoice from '../components/EventHaveChoice';
import EventNoChoice from '../components/EventNoChoice';
import Result from '../components/Result';

const MainScreen = () => {
  const [isPaused, setPaused] = useState(false);
  const [isHaveChoiced, setHaveChoiced] = useState(false);
  const [isNoChoiced, setNoChoiced] = useState(false);
  const [isResult, setResult] = useState(false);

  const handleContinue = () => {
    setPaused(false);
  };

  const handleEndGame = () => {
    setPaused(false);
  };

  const handleHome = () => {
    setPaused(false);
  };

  const handleChoice1 = () => {
    setHaveChoiced(false);
  };

  const handleChoice2 = () => {
    setHaveChoiced(false);
  };

  const handleChoice3 = () => {
    setHaveChoiced(false);
  };

  const handleChoice4 = () => {
    setHaveChoiced(false);
  };

  const handleExitChoice = () => {
    setNoChoiced(false);
  };

  const handleExitResult = () => {
    setResult(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Main Screen Content</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => setPaused(true)}
      >
        <Text style={styles.buttonText}>Pause</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => setHaveChoiced(true)}
      >
        <Text style={styles.buttonText}>Choice Event</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => setNoChoiced(true)}
      >
        <Text style={styles.buttonText}>No Choice Event</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => setResult(true)}
      >
        <Text style={styles.buttonText}>Result</Text>
      </TouchableOpacity>
      <PauseOverlay isVisible={isPaused} onContinue={handleContinue} onEndGame={handleEndGame} onHome ={handleHome}/>
      <EventHaveChoice isVisible={isHaveChoiced} onChoice1={handleChoice1} onChoice2={handleChoice2} onChoice3={handleChoice3} onChoice4={handleChoice4}/>
      <EventNoChoice isVisible={isNoChoiced} onExit={handleExitChoice}/>
      <Result isVisible={isResult} onExit={handleExitResult}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    backgroundColor: 'black',
    justifyContent: 'center',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    width: '50%',
    height: '7%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default MainScreen;