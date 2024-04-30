import React, { useState, useEffect, useContext } from "react";
import { Text, StyleSheet, View, TouchableOpacity, Dimensions, FlatList, Image } from "react-native";
import { useNavigation } from '@react-navigation/native';
import axios from 'axios'; 
import { AuthContext } from "../store/AuthContext.js";  // Ensure this path is correct
import boyChild from '../assets/boy_child.png';
import boy from '../assets/boy.png';
import girlChild from '../assets/girl_child.png';
import girl from '../assets/girl.png';
import baby from '../assets/baby.png';
import elderMale from '../assets/ong.png';
import elderFemale from '../assets/ba.png';
const { width, height } = Dimensions.get('window');

const HistoryScreen = () => {
  const navigation = useNavigation();
  const { localID } = useContext(AuthContext); // Use useContext to access AuthContext
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      if (localID) {
        try {
          const userDataUrl = `https://mpr-final-project-c4ed7-default-rtdb.firebaseio.com/account/${localID}.json`;
          const response = await axios.get(userDataUrl);
          const data = response.data;

          if (data && Array.isArray(data)) {
            const loadedPlayers = data.map((UserData, index) => ({
              ...UserData,
              Localid: `UserData-${index}`, // Assign a unique ID for key extractor
              ...UserData.status, // Spread the status object into the character object
            }));
            setPlayers(loadedPlayers);
          } else {
            console.log("Data is not in expected format:", data);
          }
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      } else {
        console.log("No current user ID found.");
      }
    };

    fetchUserData();
  }, [localID]);

  const sortByNewest = () => {
    const sorted = [...players].sort((a, b) => {
      // Extract the numerical part of the Localid and convert it to a number
      const numIdA = parseInt(a.Localid.split('-')[1], 10);
      const numIdB = parseInt(b.Localid.split('-')[1], 10);
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
  const getImageForPlayer = (gender, age) => {
    if (age < 3) {
        return baby;
    } else if (age > 60) {
        return gender === "male" ? elderMale : elderFemale;
    } else if (gender === "male") {
        return age < 18 ? boyChild : boy;
    } else {
        return age < 18 ? girlChild : girl;
    }
};

const renderItem = ({ item }) => (
  <View style={styles.card}>
      <Image source={getImageForPlayer(item.gender, item.age)} style={styles.avatar} />
      <View style={styles.cardContent}>
          <Text style={styles.infoText}><Text style={styles.boldLabel}>Name:</Text> {item.name}</Text>
          <Text style={styles.infoText}><Text style={styles.boldLabel}>Age:</Text> {item.age}</Text>
          <Text style={styles.infoText}><Text style={styles.boldLabel}>Gender:</Text> {item.gender}</Text>
          <Text style={styles.infoText}><Text style={styles.boldLabel}>Location:</Text> {item.location}</Text>
          <Text style={styles.infoText}><Text style={styles.boldLabel}>Progress:</Text> {item.progress}%</Text>
          <Text style={styles.infoText}><Text style={styles.boldLabel}>Death by:</Text> {item.reasonOfDeath}</Text>
          <Text style={styles.infoText}><Text style={styles.boldLabel}>Health:</Text> {Math.round(item.health / 5)}%</Text>
          <Text style={styles.infoText}><Text style={styles.boldLabel}>Intelligence:</Text> {Math.round(item.intel / 5)}%</Text>
          <Text style={styles.infoText}><Text style={styles.boldLabel}>Money:</Text> {Math.round(item.money / 5)}%</Text>
          <Text style={styles.infoText}><Text style={styles.boldLabel}>Relationship:</Text> {Math.round(item.relationship / 5)}%</Text>
      </View>
  </View>
);
  return (
    <View style={styles.container}>
      <View style={styles.Line} />
      <TouchableOpacity onPress={() => navigation.navigate('HomeScreen')} style={styles.backButton}>
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