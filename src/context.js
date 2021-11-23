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

const initialState = {
  all_countries: [],
  all_regions: [],
};

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const [theme, setTheme] = useState(getStorageTheme());

  // Theme toggle
  const [searchTerm, setSearchTerm] = useState('a');
  const toggleTheme = () => {
    theme === 'light' ? setTheme('dark') : setTheme('light');
  };
  useEffect(() => {
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Countries fetch
  const fetchCountries = async () => {
    try {
      const response = await fetch('https://restcountries.com/v2/all');
      const data = await response.json();
      // console.log(regions);
      dispatch({ type: 'FETCH_COUNTRIES', payload: data });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchCountries();
  }, []);

  //

  return (
    <AppContext.Provider
      value={{ ...state, theme, toggleTheme, setSearchTerm }}
    >
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
