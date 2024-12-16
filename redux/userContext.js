"use client"
import getToken from "@/api/getToken";
// UserContext.js

import getuser from "@/api/getuser";
import React, { createContext, useContext, useEffect, useReducer } from "react";

const UserContext = createContext();
export const useUser = () => useContext(UserContext);
const initialState = {
  user: null,
};
const userReducer = (state, action) => {
  switch (action.type) {
    case "SET_USER":
      //////////console.log("Setting user:", action.payload);
      return { ...state, user: action.payload };
    default:
      return state;
  }
};
export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);
  useEffect(() => {
    // const token = localStorage.getItem("token");
    const token = getToken();
   
    // Define an async function inside useEffect
    const fetchUserData = async () => {
      if (token) {
        try {
          //////////console.log("Stored User Data:", token); // Log the data
          const data = await getuser(token); // Use await with getuser
        
          if(data){
            dispatch({ type: "SET_USER", payload: data });
          }
        } catch (error) {
          //console.error("Error fetching user data:", error);
          // Handle error, e.g., by dispatching an error action
        }
      }
    };
    // Call the async function
    fetchUserData();
  }, []);
  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};