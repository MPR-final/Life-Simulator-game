import { useState } from "react";
import { createContext } from "react";

// localID is the id of specific account
// localID is generated automatically by firebase auth rest API
// isLogin is to check if the account is login or not

export const AuthContext = createContext({
  localID: "",
  isLogin: false,
  initializeAccount: (localID) => {},
});

function AuthContextProvider({ children }) {
  const [localID, setLocalID] = useState();

  function initializeAccount(localID) {
    setLocalID(localID);
  }

  const value = {
    localID: localID,
    isLogin: !!localID,
    initializeAccount: initializeAccount,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContextProvider;
