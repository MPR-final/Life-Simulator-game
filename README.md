### HOW TO GET "localId" FROM  "AuthContext.js" ###
import { AuthContext } from "../constants/AuthContext.js";

export default function HomeScreen() {....
const { localId } = useContext(AuthContext);
// use localId here
.....
    }
### HOW TO GET DATA FROM FIREBASE ###
import axios from 'axios';

async function fetchDataFromFirebase() {
  try {
    const response = await axios.get('https://your-firebase-database-url/your-collection.json');
    const data = response.data;
    // Process and use the retrieved data
    console.log(data);
  } catch (error) {
    // Handle any errors that occur during the request
    console.error('Error fetching data:', error);
  }
}

fetchDataFromFirebase();

### gift ###
- recieve gift -> update global
  continue game -> get data from global

## initial score ###
250
max 500

## at 23 years old if study university ###
+ salary each year for character
## up db ##
when pause/ exit game & die we up from global to db

### function to post to database ###
import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, View } from "react-native";

import axios from "axios";

export default function App() {
// hướng đi bao gồm ArtisticEvent, WorkEvent, TechEvent, FinanceEvent
  const direction = "";
// này là tuổi (bắt đầu từ 19 - 40)
  const age = "";
// này là id của mỗi event trong tuổi (0 và 1)
  const id = "";
  const detail = "";
  const time = 0;
  const choiceDetail_1 = "";
  const choiceResult_1 = "";
  const health_1 = 0;
  const intel_1 = 0;
  const relationship_1 = 0;
  const money_1 = 0;

  const choiceDetail_2 = "";
  const choiceResult_2 = "";
  const health_2 = 0;
  const intel_2 = 0;
  const relationship_2 = 0;
  const money_2 = 0;

  const choiceDetail_3 = "";
  const choiceResult_3 = "";
  const health_3 = 0;
  const intel_3 = 0;
  const relationship_3 = 0;
  const money_3 = 0;

  const choiceDetail_4 = "";
  const choiceResult_4 = "";
  const health_4 = 0;
  const intel_4 = 0;
  const relationship_4 = 0;
  const money_4 = 0;

  function postEvent() {
    axios.put(
      `https://mpr-final-project-c4ed7-default-rtdb.firebaseio.com/${direction}/${age}/${id}.json`,
      {
        detail: detail,
        time: time,
        choice: {
          firstChoice: {
            choiceDetail: choiceDetail_1,
            choiceResult: choiceResult_1,
            points: {
              health: health_1,
              intel: intel_1,
              relationship: relationship_1,
              money: money_1,
            },
          },
          secondChoice: {
            choiceDetail: choiceDetail_2,
            choiceResult: choiceResult_2,
            points: {
              health: health_2,
              intel: intel_2,
              relationship: relationship_2,
              money: money_2,
            },
          },
          thirdChoice: {
            choiceDetail: choiceDetail_3,
            choiceResult: choiceResult_3,
            points: {
              health: health_3,
              intel: intel_3,
              relationship: relationship_3,
              money: money_3,
            },
          },
          fourthChoice: {
            choiceDetail: choiceDetail_4,
            choiceResult: choiceResult_4,
            points: {
              health: health_4,
              intel: intel_4,
              relationship: relationship_4,
              money: money_4,
            },
          },
        },
      }
    );
  }
  return (
    <View style={styles.container}>
      <Button title="click me" onPress={postEvent} />
      <StatusBar style="light" backgroundColor="#FFB732" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
});



