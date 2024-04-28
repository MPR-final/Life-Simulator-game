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


### function to post to database ###
export default function App() {
  function postEvent() {
    axios.put(
      "https://mpr-final-project-c4ed7-default-rtdb.firebaseio.com/ArtisticEvent/19/0.json",
      {
        detail: "Opportunity to Showcase Your Talent",
        time: 2,
        choice: {
          firstChoice: {
            choiceDetail: "Perform as a Singer",
            choiceResult:
              "You have the opportunity to showcase your vocal talent and receive recognition for your performance.",
            points: { health: 10, intel: 10, relationship: 10, money: 0 },
          },
          secondChoice: {
            choiceDetail: "Showcase Your Drawing Skills",
            choiceResult:
              "You don't have any drawing skill. This's the first time you draw",
            points: { health: -10, intel: 0, relationship: 0, money: 0 },
          },
          thirdChoice: {
            choiceDetail: "Demonstrate Your Dancing Abilities",
            choiceResult:
              "You finished the show but there was still a little mistake",
            points: { health: -20, intel: 10, relationship: 0, money: 0 },
          },
          fourthChoice: {
            choiceDetail: "Choose Not to Attend",
            choiceResult:
              "You miss the opportunity to gain exposure, receive feedback, and potentially connect with others in your field.",
            points: { health: -10, intel: -20, relationship: 0, money: 0 },
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


# Notes:
 - Đường dẫn phải đúng không là loạn hết db lên đấy !!!!
   ex: "https://mpr-final-project-c4ed7-default-rtdb.firebaseio.com/ArtisticEvent/19/0.json"
        - chú thích!!!
           + "19" là tuổi.
           + "0" là id của event.
