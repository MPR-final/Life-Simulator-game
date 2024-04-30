import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Dimensions,ActivityIndicator  } from "react-native";
import { Image } from "expo-image";
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const { width, height } = Dimensions.get('window');
const EndgameScreen = ({ route }) => {
  const [player, setPlayer] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  const navigateHome = () => navigation.navigate('HomeScreen');

  useEffect(() => {
    const fetchNewestPlayerData = async () => {
      setLoading(true);
      try {
        // Fetch all user accounts
        const usersUrl = 'https://mpr-final-project-c4ed7-default-rtdb.firebaseio.com/account.json';
        const usersResponse = await axios.get(usersUrl);
        if (usersResponse.data) {
          // Determine the newest user based on createdAt field
          const userAccounts = usersResponse.data;
          const newestUserId = Object.keys(userAccounts).reduce((newest, current) => {
            return (!newest || new Date(userAccounts[current].createdAt) > new Date(userAccounts[newest].createdAt)) ? current : newest;
          }, null);

          if (newestUserId) {
            // Fetch the data of the newest user
            const newestUserDataUrl = `https://mpr-final-project-c4ed7-default-rtdb.firebaseio.com/account/${newestUserId}.json`;
            const response = await axios.get(newestUserDataUrl);
            const data = response.data;

            if (data) {
              // Assuming the data might not necessarily be an array of characters
              if (Array.isArray(data)) {
                // Process if it is an array
                const loadedPlayers = data.map((playerData, index) => ({
                  id: `player-${index}`,
                  ...playerData,
                  ...playerData.status,
                }));
                loadedPlayers.sort((a, b) => b.id.localeCompare(a.id));
                setPlayer(loadedPlayers[0]);  // Assuming the first element after sorting by id is the latest
              } else {
                // Handle a single object data format
                setPlayer({
                  id: newestUserId,
                  ...data,
                  ...data.status,
                });
              }
            } else {
              console.log("No data found for the newest user.");
            }
          }
        } else {
          console.log("No users found in the database.");
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNewestPlayerData();
  }, []);


  if (loading) {
    return <ActivityIndicator size="large" />;
  }

  if (!player) {
    return <Text>No player data found.</Text>;
  }

  return (
    <View style={styles.EndgameScreen}>
      <View style={styles.upperBackground} />
      <View style={[styles.detaisummaryItem]} />
      <Image
        style={styles.skull1Icon}
        contentFit="cover"
        source={require("../assets/skull-1.png")}
      />
      <Text style={styles.youDied}>You died!</Text>
      <Text style={styles.achievement}>
        {player.age > 32 ? 'Significant' : 'Died young'}</Text>
      <View style={[styles.rectangleParent, styles.groupChildLayout]}>
        <View style={[ styles.groupChildLayout]} />
        <TouchableOpacity onPress={navigateHome} style={styles.replayButton}>
        <Text style={[styles.replay]}>Replay</Text>
      </TouchableOpacity>
      </View>
      <Text style={styles.playerInfor}>
  {`Location: ${player.location}\n`}
  {`Gender: ${player.gender}\n`}       
  {`Relationship: ${player.relationship}%\n`}
  {`Intelligence: ${player.intel}%\n`}
  {`Health: ${player.health}%\n`}
  {`Money: ${player.money}%`}
</Text>

      
      <Text style={[styles.age]}>Age: {player.age}</Text>
      <Text style={[styles.deathBy]}>
        Death by: {player.reasonOfDeath}
      </Text>
      <Text style={[styles.playerName]}>
        Name: {player.name}
      </Text>
      <Image
        style={styles.vintage11}
        contentFit="cover"
        source={require("../assets/vintage-1-1.png")}
      />

    </View>
  );
};

const styles = StyleSheet.create({
 
 
  groupChildLayout: {
    height: 83,
    width: 270,
    position: "absolute",
  },
  playerName: {
    textAlign: "center",
    color: "#0d0d0d",
    fontFamily: "NosiferCaps-Regular",
    position: "absolute",
    width: '100%',
    top: width * 0.54,
    fontSize: 18
  },
  upperBackground: {
    backgroundColor: "#d9a648",
    width: '100%',
    height: '50%',
    position: "absolute",
  },
  detaisummaryItem: {
    top: width * 0.5,
    borderRadius: 40,
    backgroundColor: "#d9d2d0",
    width: '100%',
    height: width * 1.1,
    position: "absolute",
    alignSelf: 'center'
  },
  skull1Icon: {
    
  top: width * 0.05,
   width: width * 0.3,
   height: width * 0.3, 
   alignSelf: 'center',
   position: "absolute",
    
  },
  youDied: {
    top: width * 0.35, 
    width: '100%',
    fontSize: 32,
    color: "#0d0d0d",
    textAlign: 'center',
    fontFamily: "NosiferCaps-Regular",
    alignContent: 'center'
  },
  achievement: {
    top: width * 1.2,
    fontSize: 28,
    width: '100%',
    color: "#0d0d0d",
    textAlign: "center",
    fontFamily: "NosiferCaps-Regular",
  
  },
  replayButton: {
    top: width * 0.001,
    borderRadius: 42,
    backgroundColor: "#ffb732",
    elevation: 4,
    width:'100%',
    height:'100%',
    alignSelf:'center',
  
  },
  replay: {
    top: width * 0.045,
    width: '100%',
    fontSize: 35,
    fontWeight: "700",
    fontFamily: "Inter-Bold",
    color: "#fff",
    textAlign:'center'
  },
  rectangleParent: {
    top: width * 1.7,
    width:'100%',
    alignSelf:'center'
  },
  playerInfor: {
    top: width *  0.55,
    fontSize: 22,
    fontFamily: "ZenKurenaido-Regular",
    width: '100%',
  
    textAlign:'center'
  },
  
  age: {
    top: width * 0.63,
    textAlign:'center',
    fontSize: 17,
    width: "100%",
    textAlign: "center",
    color: "#0d0d0d",
    fontFamily: "NosiferCaps-Regular",
    position: "absolute",
  },
  vintage11: {
    top: width * 1.3,
    width: '45%',
    height: width * 0.4,
    position: "absolute",
    alignSelf:'center'
  },
  deathBy: {
    fontSize: 17,
    fontFamily: "NosiferCaps-Regular",
    color: "#0d0d0d",
    textAlign: 'center',
    marginBottom: '100%',
  },
  EndgameScreen: {
    backgroundColor: '#F3ECDB',
    flex: 1,
    width: "100%",
    overflow: "hidden",
  },
});

export default EndgameScreen;