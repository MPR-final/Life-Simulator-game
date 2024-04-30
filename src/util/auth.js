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

export async function storeUser(userId, newData) {
  try {
    const response = await axios.get(BACKEND_URL + 'account.json');
    const userData = response.data[userId];

    let newLifeId = 0;
    if (userData !== undefined) {
      newLifeId = userData.length;
    }
    await axios.put(BACKEND_URL + `account/${userId}/${newLifeId}.json`, newData);
    console.log('User data stored successfully!');
  } catch (error) {
    console.error('Error storing user data:', error);
    throw error;
  }
}

export async function editUser(userId, updatedData) {
  try {
    const response = await axios.get(BACKEND_URL + 'account.json');
    const userData = response.data[userId];
    const userLatestLife = userData.length - 1;

    if (userData) {
      // Update user data with the provided updatedData

      // Send a patch request to update the user information
      await axios.patch(BACKEND_URL + `account/${userId}/${userLatestLife}.json`, updatedData);

      console.log('User information edited successfully!');
    } else {
      console.error('User not found');
    }
  } catch (error) {
    console.error('Error editing user information:', error);
    throw error;
  }
}

export async function changeProgress(userId, newProgress) {
  try {
    const response = await axios.get(BACKEND_URL + 'account.json');
    const userData = response.data[userId];
    const userLatestLife = userData.length - 1;

    if (userData) {
      userData[userLatestLife].progress = newProgress;
      await axios.patch(BACKEND_URL + `account/${userId}/${userLatestLife}.json`, { progress: newProgress });
      console.log('Progress changed successfully!');
    } else {
      console.error('User not found');
    }
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
     // console.log('User status changed successfully!');
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
        currentEventNum: lifeData.currentEventNum,
        gender: lifeData.gender,
        img: lifeData.img,
        lifeRoad: lifeData.lifeRoad,
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
    throw error;
  }
}

export async function fetchTechEvents() {
  try {
    const response = await axios.get(BACKEND_URL + 'TechEvent.json');
    const techEvents = [];

    for (const age of response.data) {
      if (age !== null) {
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
        techEvents.push(ageEvents);
      }
    }
    return techEvents;
  } catch (error) {
    console.error('Error fetching tech events', error);
  }
}

export async function fetchArtisticEvents() {
  try {
    const response = await axios.get(BACKEND_URL + 'ArtisticEvent.json');
    const artEvents = [];

    for (const age of response.data) {
      if (age !== null) {
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
        artEvents.push(ageEvents);
      }
    }
    return artEvents;
  } catch (error) {
    console.error('Error fetching art events', error);
  }
}

export async function fetchWorkEvents() {
  try {
    const response = await axios.get(BACKEND_URL + ' WorkEvent.json');
    const workEvents = [];

    for (const age of response.data) {
      if (age !== null) {
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
        workEvents.push(ageEvents);
      }
    }
    return workEvents;
  } catch (error) {
    console.error('Error fetching work events', error);
  }
}

export async function fetchFinanceEvents() {
  try {
    const response = await axios.get(BACKEND_URL + 'FinanceEvent.json');
    const financeEvents = [];

    for (const age of response.data) {
      if (age !== null) {
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
        financeEvents.push(ageEvents);
      }
    }
    return financeEvents;
  } catch (error) {
    console.error('Error fetching finance events', error);
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

export async function fetchRandomChoiceEvent() {
  try {
    const response = await axios.get(BACKEND_URL + 'randomEvent.json');
    const randomChoiceEvents = [];

    for (const id of response.data.withChoice) {
      const choices = [];

      for (const choiceKey in id.choice) {
        if (id.choice.hasOwnProperty(choiceKey)) {
          const choice = id.choice[choiceKey];
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
      }

      const randomEvent = {
        choices: choices,
        detail: id.detail,
        time: id.time,
      };

      randomChoiceEvents.push(randomEvent);
    }

    return randomChoiceEvents;
  } catch (error) {
    console.error('Error fetching random choice events', error);
    throw error;
  }
}

export async function fetchRandomNoChoiceEvent() {
  try {
    const response = await axios.get(BACKEND_URL + 'randomEvent/withoutChoice.json');
    const randomNoChoiceEvents = [];

    for (const id of response.data) {
      const randomEvent = {
        points: id.points,
        result: id.result,
        detail: id.detail,
        time: id.time,
      }
      randomNoChoiceEvents.push(randomEvent);
    }
    return randomNoChoiceEvents;
  } catch (error) {
    console.error('Error fetching random no choice events', error);
  }
}
