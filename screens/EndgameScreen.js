import * as React from "react";
import { StyleSheet, View, Text, TouchableOpacity, Dimensions,Platform } from "react-native";
import { Image } from "expo-image";
import { useNavigation } from '@react-navigation/native';
import { playerData } from '../data/playerData';

const { width, height } = Dimensions.get('window');
const safeAreaOffset = Platform.OS === 'ios' ? 20 : 0;
const EndgameScreen = () => {
  const navigation = useNavigation();
  const navigateHome = () => {
    navigation.navigate('Home'); 
  };
  return (
    <View style={styles.EndgameScreen}>
      <View style={styles.upperBackground} />
      <View style={[styles.detaisummaryItem]} />
      <Image
        style={styles.skull1Icon}
        contentFit="cover"
        source={require("../assets/skull-1.png")}
      />
      <Text style={[styles.youDied]}>You died!</Text>
      <Text style={[styles.achievement]}>
      {` ${playerData.achievements}`}
        </Text>
      <View style={[styles.rectangleParent, styles.groupChildLayout]}>
        <View style={[ styles.groupChildLayout]} />
        <TouchableOpacity onPress={navigateHome} style={styles.replayButton}>
        <Text style={[styles.replay]}>Replay</Text>
      </TouchableOpacity>
      </View>
      <Text style={[styles.playerInfor]}>
        {`Relationship: ${playerData.relationship}
Intelligence: ${playerData.intelligence}
Health: ${playerData.health}
Money: ${playerData.money}
`}
      </Text>
      
      <Text style={[styles.age]}>Age: {playerData.age}</Text>
      
      <Text style={[styles.deathBy]}>
        Death by: {playerData.deathBy}
      </Text>
      <Text style={[styles.playerName]}>
        Name: {playerData.name}
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
    top: width *  0.6,
    fontSize: 23,
    fontFamily: "ZenKurenaido-Regular",
    width: '100%',
  
    textAlign:'center'
  },
  
  age: {
    top: width * 0.64,
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
    top: width * 0.1,
    width: '100%',
    height: 32,
    fontSize: 17,
    fontFamily: "NosiferCaps-Regular",
    textAlign: 'center'
  },
  EndgameScreen: {
    backgroundColor: '#F3ECDB',
    flex: 1,
    width: "100%",
    overflow: "hidden",
  },
});

export default EndgameScreen;
