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
