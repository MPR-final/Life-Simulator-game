import { useState } from "react";
import { createContext } from "react";

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
