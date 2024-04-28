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

export async function storeUser(userId, userData) {
  try {
    const response = await axios.put(BACKEND_URL + 'account.json', { [userId]: userData });
    console.log('User data stored successfully:', response.data);
    // You can handle the response or perform additional actions if needed
  } catch (error) {
    console.error('Error storing user data:', error);
    throw error;
  }
}

export async function changeProgress(userId, lifeIndex, newProgress) {
  try {
    const response = await axios.patch(BACKEND_URL + 'account.json', {
      [`${userId}.${lifeIndex}.progress`]: newProgress
    });
  } catch (error) {
    console.error('Error changing progress:', error);
    throw error;
  }
}

export async function changeStatus(userId, newStatus) {
  try {
    const response = await axios.get(BACKEND_URL + 'account.json');
    const userData = response.data[userId];
    const userLatestLife = userData.length - 1;
    if (userData) {
      userData.status = newStatus;
      await axios.patch(BACKEND_URL + `account/${userId}/${userLatestLife}.json`, { status: newStatus });
      console.log('User status changed successfully!');
    } else {
      console.error('User not found');
    }
  } catch (error) {
    console.error('Error changing user status', error);
  }
}

export async function fetchUser (userId) {
  try{
    const response = await axios.get(BACKEND_URL + 'account.json');
    const userDatas = [];
    for (const life in response.data[userId]) {
      const lifeData = response.data[userId][life];
      const lifeObj = {
        age: lifeData.age,
        gender: lifeData.gender,
        img: lifeData.img,
        location: lifeData.location,
        name: lifeData.name,
        progress: lifeData.progress,
        reasonOfDeath: lifeData.reasonOfDeath,
        status: lifeData.status,
      };
      userDatas.push(lifeObj);
    }
    return userDatas;
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
