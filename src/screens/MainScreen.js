import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Dimensions,
} from "react-native";
import ProgressBar from "../components/progressBar.js";
import CharacterData from "../components/getCharacterData.js";
import { AuthContext } from "../store/AuthContext.js";
import PauseOverlay from "../components/PauseOverlay.js";
import {
  fetchRandomChoiceEvent,
  fetchRandomNoChoiceEvent,
  fetchNormalEvent,
  fetchTechEvents,
  fetchArtisticEvents,
  fetchWorkEvents,
  fetchUser,
  editUser,
} from "../util/auth.js";
import EventHaveChoice from "../components/EventHaveChoice.js";
import LoadingOverLay from "../components/LoadingOverLay.js";
import Result from "../components/Result.js";
import PlusButton from "../components/PlusButton.js";


function MainScreen({ navigation }) {
  const mainContext = useContext(AuthContext);
  const userId = mainContext.localID;
  const [isLoading, setLoading] = useState(true);
  const [fetchedNormalEvents, setFetchedNormalEvents] = useState([]);
  const [randomChoiceEvents, setRandomChoiceEvents] = useState([]);
  const [randomNoChoiceEvents, setRandomNoChoiceEvents] = useState([]);
  const [techEvents, setTechEvents] = useState([]);
  const [artEvents, setArtEvents] = useState([]);
  const [workEvents, setWorkEvents] = useState([]);
  const [adultEvents, setAdultEvents] = useState([]);
  const [userData, setUserData] = useState([]);
  const [updateData, setUpdateData] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isPaused, setPaused] = useState(false);
  const [isEventChoice, setEventChoice] = useState(false);
  const [isResult, setResult] = useState(false);
  const [ageEvent, setAgeEvent] = useState([]);
  const [currentChoice, setCurrentChoice] = useState([]);
  const [disabledChoices, setDisabledChoices] = useState([false, false, false, false]);
  const status = userData.status;

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          advanceAge();
          return 0;
        } else {
          return prevProgress + 1;
        }
      });
    }, 7200);
  
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    async function getUserData() {
      try {
        setUserData([]);
        const userDatas = await fetchUser(userId);
        const lifeNum = userDatas.length - 1;
        const userData = userDatas[lifeNum];
  
        setProgress(userData.progress);
        setUserData(userData);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }
    getUserData();
  }, [updateData]);


  useEffect(() => {
    async function getNormalEvents() {
      try {
        const normalEvents = await fetchNormalEvent();
        setFetchedNormalEvents(normalEvents);
      } catch (error) {
        console.error("Error fetching normal events:", error);
      }
    }
    async function getRandomChoiceEvents() {
      try {
        const events = await fetchRandomChoiceEvent();
        setRandomChoiceEvents(events);
      } catch (error) {
        console.log("Error fetching random choice event:", error);
      }
    }
    async function getRandomNoChoiceEvents() {
      try {
        const events = await fetchRandomNoChoiceEvent();
        setRandomNoChoiceEvents(events);
      } catch (error) {
        console.log("Error fetching random no choice event:", error);
      }
    }
    async function getTechEvents() {
      try {
        const events = await fetchTechEvents();
        setTechEvents(events);
      } catch (error) {
        console.log("Error fetching tech events:", error);
      }
    }
    async function getArtEvents() {
      try {
        const events = await fetchArtisticEvents();
        setArtEvents(events);
      } catch (error) {
        console.log("Error fetching art events:", error);
      }
    }
    async function getWorkEvents() {
      try {
        const events = await fetchWorkEvents();
        setWorkEvents(events);
      } catch (error) {
        console.log("Error fetching work events:", error);
      }
    }
    getNormalEvents();
    getRandomChoiceEvents();
    getRandomNoChoiceEvents();
    getTechEvents();
    getArtEvents();
    getWorkEvents();
  }, []);

  useEffect(() => {
    if (workEvents.length !=0 && artEvents.length != 0 && techEvents.length != 0) {
      if (userData.lifeRoad == "work") {
        setAdultEvents(workEvents);
      } 
      if (userData.lifeRoad == "art") {
        setAdultEvents(artEvents);
      }
      if (userData.lifeRoad == "tech") {
        setAdultEvents(techEvents);
      }
    }
  }, [adultEvents, workEvents, artEvents, techEvents, userData])

  useEffect(() => {
    if (
      fetchedNormalEvents.length != 0 &&
      userData.length != 0 &&
      randomChoiceEvents.length != 0 &&
      randomNoChoiceEvents.length != 0
    ) {
      if (userData.age <= 18) {
        if (userData.currentEventNum == 0 || userData.currentEventNum == 1) {
          setAgeEvent(
            fetchedNormalEvents[userData.age][userData.currentEventNum]
          );
          setLoading(false);
        } else {
          const randomIndex = Math.floor(
            Math.random() * (randomChoiceEvents.length - 1)
          );
          const randomEvent = randomChoiceEvents[randomIndex];
          setAgeEvent(randomEvent);
          setLoading(false);
        }
      } else {
        if (userData.currentEventNum == 0 || userData.currentEventNum == 1) {
          setAgeEvent(
            adultEvents[userData.age][userData.currentEventNum]
          );
          setLoading(false);
        } else {
          const randomIndex = Math.floor(
            Math.random() * (randomChoiceEvents.length - 1)
          );
          const randomEvent = randomChoiceEvents[randomIndex];
          setAgeEvent(randomEvent);
          setLoading(false);
        }
      }
      
      setDisabledChoices([false, false, false, false]); 
      if(userData.currentEventNum == 1 && userData.age == 18) {
        if (userData.status.money < 250) {
          setDisabledChoices(prevState => {
            const updatedChoices = [...prevState];
            updatedChoices[0] = true;
            return updatedChoices;
          });
        }
        if (userData.status.relationship < 250) {
          setDisabledChoices(prevState => {
            const updatedChoices = [...prevState];
            updatedChoices[2] = true;
            return updatedChoices;
          });
        }
        if (userData.status.intel < 250) {
          setDisabledChoices(prevState => {
            const updatedChoices = [...prevState];
            updatedChoices[3] = true;
            return updatedChoices;
          });
        }
      }
    }
  }, [fetchedNormalEvents, randomChoiceEvents, userData, updateData, techEvents, artEvents, workEvents, adultEvents]);


  const handleContinue = () => {
    setPaused(false);
  };


  const handleEndGame = () => {
    const reasonOfDeath = "Lightning strike";
    const newData = {
      reasonOfDeath: reasonOfDeath,
    }
    editUser(userId, newData);
      navigation.navigate("EndgameScreen", {reasonOfDeath: reasonOfDeath});
      setPaused(false);
  };
  
  const handleHome = () => {
    navigation.navigate("HomeScreen");
    setPaused(false);
  };

  const handlePlay = () => {
    setEventChoice(true);
  }


  const handleChoice = async (choice) => {
    setCurrentChoice(ageEvent.choices[choice]);

    if (userData.currentEventNum == 1 && userData.age == 18) {
      if (choice == 0) {
        
      }
      if (choice == 1) {
        setAdultEvents(workEvents);
        const newData = {
          lifeRoad: "work",
        }
        editUser(userId, newData)
      }
      if (choice == 2) {
        setAdultEvents(artEvents);
        const newData = {
          lifeRoad: "art",
        }
        editUser(userId, newData)
      }
      if (choice == 3) {
        setAdultEvents(techEvents);
        const newData = {
          lifeRoad: "tech",
        }
        editUser(userId, newData)
      }
    }

    let statusChanges = null;


    while (statusChanges === null || statusChanges === undefined) {
      try {
        statusChanges = await currentChoice.points;
      } catch (error) {
        console.error("Error retrieving status changes:", error);
      }


      if (statusChanges === null || statusChanges === undefined) {
        await new Promise((resolve) => setTimeout(resolve, 500)); // Delay for 1 second before retrying
      }
    }
    let updateDataExecuted = false;
    if (!updateDataExecuted) {
      setUpdateData(true);
      updateDataExecuted = true;
    }


    if (statusChanges !== null && statusChanges !== undefined) {
      updateStatus(statusChanges); // Move the status update logic to a separate function
      setResult(true);
      setEventChoice(false);
    }
  };


  const updateStatus = (statusChanges) => {
    try {
      if (
        statusChanges !== null &&
        status !== undefined &&
        userData.length != 0
      ) {
        const newHealth = Math.min(status.health + statusChanges.health, 500);
        const newIntel = Math.min(status.intel + statusChanges.intel, 500);
        const newMoney = Math.min(status.money + statusChanges.money, 500);
        const newRelationship = Math.min(status.relationship + statusChanges.relationship, 500);
        const newStatus = {
          health: newHealth,
          intel: newIntel,
          money: newMoney,
          relationship: newRelationship,
        };
        
        let currentEventNum = userData.currentEventNum + 1;
        const progressIncreasement = (ageEvent.time / 12) * 100;
        setProgress(progress + progressIncreasement);

        let age = userData.age;
        if (progress > 100 || currentEventNum >= 4) {
          advanceAge();
          age += 1;
          currentEventNum = 0;
        }

        const newData = {
          age: age,
          currentEventNum: currentEventNum,
          gender: userData.gender,
          img: userData.img,
          location: userData.location,
          name: userData.name,
          progress: progress,
          reasonOfDeath: userData.reasonOfDeath,
          status: newStatus,
        };
        setUserData(newData);
        editUser(userId, newData);
        checkDead(userData);
      }
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const advanceAge = () => {
    let age = userData.age + 1;
    const newData = {
      age: age,
      progress: 0,
      currentEventNum: 0,
    }
    setProgress(0);
    editUser(userId, newData);
  }

  const checkDead = (data) => {
    const status = data.status;
    let reasonOfDeath = "";
    
    if (status.health <= 0) {
      reasonOfDeath = "Heart failure";
    }
    if (status.money <= 0) {
      reasonOfDeath = "Out of money";
    }
    if (status.intel <= 0) {
      reasonOfDeath = "Brain rot";
    }
    if (status.relationship <= 0) {
      reasonOfDeath = "Loneliness";
    }
    if (data.age >= 40 && data.currentEventNum >= 3) {
      reasonOfDeath = "Old age";
    }

    if(reasonOfDeath != "") {
      const newData = {
        reasonOfDeath: reasonOfDeath,
      }

      editUser(userId, newData);
      navigation.navigate("EndgameScreen", {reasonOfDeath: reasonOfDeath});
    }
  }

  const handleExit = () => {
    setResult(false);
  };


  if (isLoading) {
    return (
      <View style={styles.container}>
        <LoadingOverLay message={"Loading..."} />
      </View>
    );
  }


  if (!isLoading) {
    return (
      <View style={styles.container}>
        {/** header */}
        <View style={styles.header}>
          <View style={styles.pauseBox}>
            <TouchableOpacity onPress={() => setPaused(true)}>
              <Image
                style={styles.pause}
                source={require("../assets/pause.png")}
              />
            </TouchableOpacity>
          </View>


          <View style={styles.textBox}>
            <Text style={styles.headText}>Your Life</Text>
          </View>


          <View style={styles.lineBox}>
            <View style={styles.line}></View>
          </View>
        </View>


        {/** character */}
        <View style={styles.character}>
          <TouchableOpacity
            style={styles.timeline}
            activeOpacity={0.8}
          >
            <ProgressBar
              percentage={progress}
              bgColor={"#F5F5F3"}
              color={"#6CC3E8"}
            />
          </TouchableOpacity>


          <View style={styles.characterBox}>
            <TouchableOpacity
              style={styles.circleAge}
              activeOpacity={0.8}
            >
              <Text style={styles.textAge}>{userData.age}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.characImg}
              activeOpacity={0.8}
            >
              <Image
                style={styles.img}
                source={require("../assets/boy_child.png")}
              />
            </TouchableOpacity>


            <TouchableOpacity
              tyle={styles.characPlus}
              activeOpacity={0.8}
              onPress={() => handlePlay(true)}
            >
              <PlusButton />
            </TouchableOpacity>
          </View>
        </View>
        {/** 4 chi so */}
        <View style={styles.progressBars}>
          <TouchableOpacity
            style={styles.Box}
            activeOpacity={0.8}
          >
            <Image
              style={styles.icon}
              source={require("../assets/health.png")}
            />
            <View style={styles.bar}>
              <ProgressBar
                percentage={userData.status != undefined ? userData.status.health/5 : 50}
                bgColor={"#F5F5F3"}
                color={"#E15A6B"}
              />
            </View>
          </TouchableOpacity>


          <TouchableOpacity
            style={styles.Box}
            activeOpacity={0.8}
          >
            <Image
              style={styles.icon}
              source={require("../assets/intelligent.png")}
            />
            <View style={styles.bar}>
              <ProgressBar
                percentage={userData.status != undefined ? userData.status.intel/5 : 50}
                bgColor={"#F5F5F3"}
                color={"#F8CA72"}
              />
            </View>
          </TouchableOpacity>


          <TouchableOpacity
            style={styles.Box}
            activeOpacity={0.8}
          >
            <Image
              style={styles.icon}
              source={require("../assets/Relationship.png")}
            />
            <View style={styles.bar}>
              <ProgressBar
                percentage={userData.status != undefined ? userData.status.relationship/5 : 50}
                bgColor={"#F5F5F3"}
                color={"#D394F9"}
              />
            </View>
          </TouchableOpacity>


          <TouchableOpacity
            style={styles.Box}
            activeOpacity={0.8}
          >
            <Image
              style={styles.icon}
              source={require("../assets/salary.png")}
            />
            <View style={styles.bar}>
              <ProgressBar
                percentage={userData.status != undefined ? userData.status.money/5 : 50}
                bgColor={"#F5F5F3"}
                color={"#94E86C"}
              />
            </View>
          </TouchableOpacity>
        </View>
        <StatusBar style="auto" />


        <PauseOverlay
          isVisible={isPaused}
          onContinue={handleContinue}
          onEndGame={handleEndGame}
          onHome={handleHome}
        />
        {isEventChoice && (
          <EventHaveChoice
            isVisible={isEventChoice}
            onChoice1={() => handleChoice(0)}
            onChoice2={() => handleChoice(1)}
            onChoice3={() => handleChoice(2)}
            onChoice4={() => handleChoice(3)}
            detail={ageEvent.detail}
            choice1={ageEvent.choices[0]}
            choice2={ageEvent.choices[1]}
            choice3={ageEvent.choices[2]}
            choice4={ageEvent.choices[3]}
            disabledChoices={disabledChoices}
          />
        )}


        {isResult && (
          <Result
            isVisible={isResult}
            onExit={handleExit}
            result={currentChoice.choiceResult}
            points={currentChoice.points}
          />
        )}
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3ECDB",
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    width: "90%",
    height: "15%",
    marginTop: 40,
  },
  pauseBox: {
    width: "100%",
    alignItems: "flex-end",
    justifyContent: "flex-end",
    marginBottom: -20,
  },
  pause: {
    width: 50,
    height: 50,
    alignItems: "flex-end",
    justifyContent: "flex-end",
    marginRight: -10,
  },
  textBox: {
    alignItems: "center",
    justifyContent: "center",
  },
  headText: {
    fontSize: 40,
    fontWeight: "600",
    color: "#2F2419",
  },
  lineBox: {
    alignItems: "center",
    justifyContent: "center",
  },
  line: {
    marginTop: 5,
    width: "80%",
    height: 3,
    backgroundColor: "#F8CA72",
  },


  character: {
    // borderWidth: 0.5,
    width: "100%",
    height: "45%",
    alignItems: "center",
    marginTop: -15,
  },
  characterBox: {
    // borderWidth: 0.5,
    width: "86%",
    backgroundColor: "#ACF5EC",
    position: "relative",
    marginTop: 30,
  },
  circleAge: {
    // borderWidth: 0.5,
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "blue",
    alignItems: "center",
    // justifyContent: "center",
    position: "absolute",
    top: -40,
  },
  textAge: {
    marginTop: 5,
    fontSize: 30,
    fontWeight: "500",
  },
  timeline: {
    marginLeft: 70,
    marginBottom: -15,
  },
  characImg: {
    // borderWidth: 0.5,
    width: "67%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: "17.5%",
  },
  img: {
    // borderWidth: 0.5,
    width: "60%",
    height: "60%",
    marginBottom: 40,
  },
  Box: {
    // borderWidth: 0.5,
    height: "20%",
    marginBottom: 15,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },


  progressBars: {
    // borderWidth: 0.5,
    width: "90%",
    // height: "30%",
    marginTop: 70,
    marginBottom: 40,
  },
  Box: {
    // borderWidth: 0.5,
    // height: "20%",
    // marginBottom: 15,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  icon: {
    width: 40,
    height: 40,
    marginRight: 25,
  },
});


export default MainScreen;