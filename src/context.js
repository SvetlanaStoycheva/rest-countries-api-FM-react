import React, { useContext, useEffect, useState, useReducer } from 'react';
import reducer from './reducer';

const getStorageTheme = () => {
  let theme = localStorage.getItem('theme');
  if (theme) {
    return localStorage.getItem('theme');
  } else {
    return 'light';
  }
};

const initialState = {};

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const [theme, setTheme] = useState(getStorageTheme());
  const toggleTheme = () => {
    theme === 'light' ? setTheme('dark') : setTheme('light');
  };
  useEffect(() => {
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <AppContext.Provider value={{ ...state, theme, toggleTheme }}>
      {children}
    </AppContext.Provider>
  );
};
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
// import { useGlobalContext } from './context'
//  const { handleSearch, query } = useGlobalContext()
