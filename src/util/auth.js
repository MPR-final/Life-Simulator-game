import axios from "axios";

const API_KEY = "AIzaSyAqO8_MzKvvIIqYln5JxZTXzN4bbVafuWU";
const BACKEND_URL = 'https://mpr-final-project-c4ed7-default-rtdb.firebaseio.com/';

export async function createUser(email, password) {
  await axios.post(
    "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=" + API_KEY,
    { email: email, password: password, returnSecureToken: true }
  );
}

export async function login(email, password){
  const response = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + API_KEY,
  { email: email, password: password, returnSecureToken: true });
  return response;
}

export function storeUser (userData) {
  axios.post(
    BACKEND_URL + 'account.json',
    userData
  );
}

export async function fetchUser () {
  try{
    const response = axios.get(BACKEND_URL + 'account.json');
    return response;
  } catch (error) {
    console.error('Error fetching user data', error);
  }

}

export async function fetchNormalEvent() {
  try {
    const response = await axios.get(BACKEND_URL + 'normalEvent.json');
    const normalEvents = [];

    for (const age of response.data.age) {
      const ageEvents = [];
  
      for (const ageEvent of age) {
        const choices = [];
  
        for (const choiceKey in ageEvent.choice) {
          const choice = ageEvent.choice[choiceKey];
          const choiceDetail = choice.choiceDetail;
          const choiceResult = choice.choiceResult;
          const points = choice.points;
  
          const newChoice = {
            choiceDetail: choiceDetail,
            choiceResult: choiceResult,
            points: points,
          };
          choices.push(newChoice);
        }
  
        const normalEvent = {
          detail: ageEvent.detail,
          time: ageEvent.time,
          choices: choices,
        };
  
        ageEvents.push(normalEvent);
      }
      normalEvents.push(ageEvents);
    }
    return normalEvents;
  } catch (error) {
    console.error('Error fetching normal events', error);
  }
}
