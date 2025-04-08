import { createContext, useContext, useState, useEffect } from "react";

export const AuthContext = createContext();

// Custom hook to access AuthContext
export const useAuthContext = () => {
  return useContext(AuthContext);
};

export const AuthContextProvider = ({ children }) => {
  // Initialize authUser from localStorage, or null if not found
  const [authUser, setAuthUser] = useState(
    JSON.parse(localStorage.getItem("chat-user")) || null
  );

  // Sync authUser to localStorage whenever it changes
  useEffect(() => {
    if (authUser) {
      localStorage.setItem("chat-user", JSON.stringify(authUser));
    }
  }, [authUser]); // This will run whenever authUser changes

  return (
    <AuthContext.Provider value={{ authUser, setAuthUser }}>
      {children}
    </AuthContext.Provider>
  );
};
