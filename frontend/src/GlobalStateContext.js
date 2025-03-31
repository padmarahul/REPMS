// GlobalStateContext.js
import React, { createContext, useReducer,useEffect } from 'react';

export const GlobalStateContext = createContext();

// Helper function to load state from localStorage
const loadState = () => {
  try {
    const serializedState = localStorage.getItem('globalState');
    if (serializedState === null) {
      return initialState;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return initialState;
  }
};

// Helper function to save state to localStorage
const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('globalState', serializedState);
  } catch (err) {
    // Log or handle write errors
  }
};


const initialState = {
  // Initialize your state here
  userData: null,
  otherData: null,
  employeeData: null,
  cart: []
};


const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_USER_DATA':
      return { ...state, userData: action.payload };
    case 'EMPLOYEE_DATA':
      return { ...state, employeeData: action.payload };
    case 'SET_OTHER_DATA':
      return { ...state, otherData: action.payload };
    default:
      return state;
  }
};

export const GlobalStateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, loadState());


   // Update localStorage when state changes
   useEffect(() => {
    saveState(state);
  }, [state]);

  return (
    <GlobalStateContext.Provider value={[state, dispatch]}>
      {children}
    </GlobalStateContext.Provider>
  );
};
