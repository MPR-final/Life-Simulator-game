import axios from "axios";

const API_KEY = "AIzaSyAqO8_MzKvvIIqYln5JxZTXzN4bbVafuWU";

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
