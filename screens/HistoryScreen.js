import React, { useState } from "react";
import { Text, StyleSheet, View, TouchableOpacity, Dimensions, FlatList, Image } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { players as importedPlayers } from "../data/historyPlayer";

const { width, height } = Dimensions.get('window');

const HistoryScreen = () => {
  const navigation = useNavigation();
  const initialPlayers = importedPlayers.flatMap(user =>
    user.characters.map(character => ({
      ...character,
      Localid: user.localid 
    }))
  );
  const [players, setPlayers] = useState(initialPlayers);

  const sortByNewest = () => {
    const sorted = [...players].sort((a, b) => parseInt(b.attempt) - parseInt(a.attempt)) ;
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
      <Image source={item.avatar} style={styles.avatar} />
      <View style={styles.cardContent}>
        <Text style={styles.infoText}><Text style={styles.boldLabel}>Name:</Text> {item.name}</Text>
        <Text style={styles.infoText}><Text style={styles.boldLabel}>Age:</Text> {item.age}</Text>
        <Text style={styles.infoText}><Text style={styles.boldLabel}>Gender:</Text> {item.gender}</Text>
        <Text style={styles.infoText}><Text style={styles.boldLabel}>Death by:</Text> {item.reasonofDeath}</Text>
        <Text style={styles.infoText}><Text style={styles.boldLabel}>Relationship:</Text> {item.relationship}</Text>
        <Text style={styles.infoText}><Text style={styles.boldLabel}>Intelligence:</Text> {item.intelligence}</Text>
        <Text style={styles.infoText}><Text style={styles.boldLabel}>Health:</Text> {item.health}</Text>
        <Text style={styles.infoText}><Text style={styles.boldLabel}>Money:</Text> {item.money}</Text>
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
        keyExtractor={item => `${item.Localid}-${item.name}`}
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