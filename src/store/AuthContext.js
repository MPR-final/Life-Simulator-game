import { useState } from "react";
import { createContext } from "react";

// localID is the id of specific account
// localID is generated automatically by firebase auth rest API
// isLogin is to check if the account is login or not
// addPlayerToList is a function that take an object as a parameter including name, age, gender, location, progress, reasonOfDeath, status
export const AuthContext = createContext({
  localID: "",
  isLogin: false,
  initializeAccount: (localID) => {},
  playersList: [],
  addPlayerToList: (playerObj) => {},
  player: {},
  addPlayer: (playerObj) => {},
});

function AuthContextProvider({ children }) {
  // global variable for the id of the account
  const [localID, setLocalID] = useState();

  // global variable that stores all players of an account
  const [playersList, setPlayersList] = useState([]);

  // global variable that stores specific player
  const [player, setPlayer] = useState({});

  // function to add the id to useContext
  function initializeAccount(localID) {
    setLocalID(localID);
  }

  // function to add player to player list---"playerObj" here is an object that contains  name, age, gender, location, progress, reasonOfDeath, status
  function addPlayerToList(playerObj) {
    setPlayersList((prevArray) => prevArray.concat(playerObj));
  }
  // function to add player to useContext---"playerObj" here is an object that contains  name, age, gender, location, progress, reasonOfDeath, status(object including health, money, relationship, intel)
  function addPlayer(playerObj) {
    setPlayer(playerObj);
  }

  const value = {
    localID: localID,
    isLogin: !!localID,
    initializeAccount: initializeAccount,
    playersList: playersList,
    addPlayerToList: addPlayerToList,
    player: player,
    addPlayer: addPlayer,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContextProvider;
