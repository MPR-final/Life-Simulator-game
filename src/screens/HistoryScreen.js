import React, { useState, useEffect } from "react";
import { Text, StyleSheet, View, TouchableOpacity, Dimensions, FlatList, Image } from "react-native";
import { useNavigation } from '@react-navigation/native';

import axios from 'axios'; 

const { width, height } = Dimensions.get('window');

const HistoryScreen = () => {
  const navigation = useNavigation();
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    const fetchDataFromFirebase = async () => {
      try {
        // Use the REST API endpoint for Firebase Realtime Database
        const databaseUrl = 'https://mpr-final-project-c4ed7-default-rtdb.firebaseio.com/account/e3MKj3heMFNFDgckYMMLsEHRlzI2.json'; 
        const response = await axios.get(databaseUrl);
        const data = response.data;
        
        if (data) {
          // Assuming data is an array of characters for a single account
          const loadedPlayers = data.map((UserData, index) => ({
            ...UserData,
            Localid: `UserData-${index}`,  // Assign a unique ID for key extractor
            // Spread the status object into the character object
            ...UserData.status,
          }));
          setPlayers(loadedPlayers);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchDataFromFirebase();
  }, []);

  const sortByNewest = () => {
    const sorted = [...players].sort((a, b) => {
      // Extract the numerical part of the Localid and convert it to a number
      const numIdA = parseInt(a.Localid.split('-')[1], 10);
      const numIdB = parseInt(b.Localid.split('-')[1], 100);
      return numIdB - numIdA; // Sort in descending order
    });
    setPlayers(sorted);
  };

  const sortByLongest = () => {
    const sorted = [...players].sort((a, b) => b.age - a.age);
    setPlayers(sorted);
  };

  const sortByShortest = () => {
    const sorted = [...players].sort((a, b) => a.age - b.age);
    setPlayers(sorted);
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
    <Image source={item.img} style={styles.avatar} />
      <View style={styles.cardContent}>
        <Text style={styles.infoText}><Text style={styles.boldLabel}>Name:</Text> {item.name}</Text>
        <Text style={styles.infoText}><Text style={styles.boldLabel}>Age:</Text> {item.age}</Text>
        <Text style={styles.infoText}><Text style={styles.boldLabel}>Gender:</Text> {item.gender}</Text>
        <Text style={styles.infoText}><Text style={styles.boldLabel}>Location:</Text> {item.location}</Text>
        <Text style={styles.infoText}><Text style={styles.boldLabel}>Progress:</Text> {item.progress}%</Text>
        <Text style={styles.infoText}><Text style={styles.boldLabel}>Death by:</Text> {item.reasonOfDeath}</Text>
        <Text style={styles.infoText}><Text style={styles.boldLabel}>Health:</Text> {item.health}%</Text>
        <Text style={styles.infoText}><Text style={styles.boldLabel}>Intelligence:</Text> {item.intel}%</Text>
        <Text style={styles.infoText}><Text style={styles.boldLabel}>Money:</Text> {item.money}%</Text>
        <Text style={styles.infoText}><Text style={styles.boldLabel}>Relationship:</Text> {item.relationship}%</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.Line} />
      <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.backButton}>
        <Image style={styles.backIcon} source={require("../assets/leftchevron-1.png")} />
      </TouchableOpacity>
      <Text style={styles.header}>Game History</Text>
      <View style={styles.filterContainer}>
        <TouchableOpacity onPress={sortByNewest} style={styles.filterButton}><Text>Newest</Text></TouchableOpacity>
        <TouchableOpacity onPress={sortByLongest} style={styles.filterButton}><Text>Longest</Text></TouchableOpacity>
        <TouchableOpacity onPress={sortByShortest} style={styles.filterButton}><Text>Shortest</Text></TouchableOpacity>
      </View>
      <FlatList
  data={players}
  renderItem={renderItem}
  keyExtractor={(item, index) => item.Localid || index.toString()}
/>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#F3ECDB',
  },
  header: {
    fontSize: width * 0.08,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 16,
    width: '100%',
    bottom: width * 0.01
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 30,
  },
  filterButton: {
    backgroundColor: '#FFB732',
    borderRadius: 25,
    paddingVertical: 8,
    paddingHorizontal: 25,
    borderColor: 'white',
    borderWidth: 1.3,  
    borderColor: 'white',
    shadowRadius: 4,
      shadowOffset: { width: 0, height: 4 },
      shadowColor: "rgba(0, 0, 0, 0.25)",
  },
  backButton: {
    marginTop: 16,
    marginLeft: 16,
  },
  backIcon: {
    width: '8%',
    top:width * 0.05,
    
  },
  card: {
    flexDirection: 'row',
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 16,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    alignItems: 'center',
  },
  avatar: {
    width: '25%',
    height: width * 0.25,
    marginRight: 50,
    marginLeft: 15
  },
  cardContent: {
    flex: 1,
    justifyContent: 'flex-end', 
    alignItems: 'left', 
    marginLeft: 16,
    
    
  },
  infoText: {
    fontSize: 12,
    color: 'black',
    marginBottom:5
  },
  boldLabel: {
    fontWeight:'bold',
    
  },
  Line: {
    position: "absolute",
    backgroundColor: "#f8ca72",
    width: '90%', 
    height: 2,
    right: '4%', 
    top: width * 0.25,
  },

});

export default HistoryScreen;