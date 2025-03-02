import React, { createContext, useState, useEffect, useContext } from "react";
import { loginUser, registerUser, logoutUser } from "../api"; // Ensure the path is correct
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await axios.get("/auth/check-token");
        setIsAuthenticated(response.data.isAuthenticated);
      } catch (error) {
        setErrorMessage(
          error.response?.data?.message || "Error checking auth status"
        );
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  const handleRegisterUser = async (user) => {
    setErrorMessage(null);
    try {
      await registerUser(user);
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message || "Error registering user"
      );
      throw error;
    }
  };

  const handleLoginUser = async (credentials) => {
    setErrorMessage(null);
    try {
      await loginUser(credentials);
      setIsAuthenticated(true);
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Error logging in user");
      throw error;
    }
  };

  const handleLogoutUser = async () => {
    setErrorMessage(null);
    try {
      await logoutUser();
      setIsAuthenticated(false);
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message || "Error logging out user"
      );
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        loading,
        errorMessage,
        setErrorMessage,
        handleRegisterUser,
        handleLoginUser,
        handleLogoutUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
