// src/AuthContext.js
import { createContext, useContext, useState, useEffect } from 'react';
import userManager from './UserManager'; // Ensure the path is correct

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Load user on mount
  useEffect(() => {
    const loadUser = async () => {
      try {
        const currentUser = await userManager.getUser();
        if (currentUser) {
          setUser(currentUser);
        } else {
          // Optionally, redirect to login if no user is found
          // userManager.signinRedirect();
        }
      } catch (error) {
        console.error('Failed to load user:', error);
      }
    };
    loadUser();
  }, []);

  const login = () => userManager.signinRedirect();
  const logout = () => userManager.signoutRedirect();
  const setUserContext = (user) => setUser(user);

  return (
    <AuthContext.Provider
      value={{ user, login, logout, setUser: setUserContext }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
