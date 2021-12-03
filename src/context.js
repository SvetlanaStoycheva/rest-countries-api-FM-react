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
  loaded_countries: [],
  all_countries_in_the_active_country_region: [],
  currentCountry: {},
  error: false,
  loading: false,
};

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const [theme, setTheme] = useState(getStorageTheme());
  const [searchTerm, setSearchTerm] = useState('australia');

  // Theme toggle
  const toggleTheme = () => {
    theme === 'light' ? setTheme('dark') : setTheme('light');
  };
  useEffect(() => {
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Fetch User location to load their country and random contries from the region
  const fetchUserLocation = async () => {
    dispatch({ type: 'SET_LOADING' });
    try {
      // fetch user country
      const response = await fetch('https://geolocation-db.com/json/');
      const data = await response.json();
      const userCountry = data.country_name;

      // fetch region of userCountry
      const responseRegion = await fetch(
        `https://restcountries.com/v2/name/${userCountry}`
      );
      let dataUserCountry = await responseRegion.json();
      dataUserCountry = dataUserCountry[0];
      const dataRegion = dataUserCountry.region;

      // fetch all countries in this region
      const responsAllCountriesInTheRegion = await fetch(
        `https://restcountries.com/v3.1/region/${dataRegion}`
      );
      const dataAllCountriesInTheRegion = await responsAllCountriesInTheRegion.json();

      // find the user Country in the region in order to display it first on the page
      const currentUserCountry = dataAllCountriesInTheRegion.find((item) => {
        const { common } = item.name;
        return common === dataUserCountry.name && item;
      });

      // 7 random countries from the user Country region
      let shuffledCountries = dataAllCountriesInTheRegion.sort(
        (a, b) => 0.5 - Math.random()
      );
      shuffledCountries = [
        currentUserCountry,
        ...shuffledCountries.slice(0, 7),
      ];
      // console.log(shuffledCountries);
      dispatch({ type: 'INITIAL_COUNTRIES_LOAD', payload: shuffledCountries });
    } catch (error) {
      console.log(error);
    }
  };

  // Countries fetch
  const fetchCountries = async () => {
    try {
      const response = await fetch('https://restcountries.com/v2/all');
      const data = await response.json();

      dispatch({ type: 'FETCH_COUNTRIES', payload: data });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchCountries();
    fetchUserLocation();
  }, []);

  // Fetch all countries from the selected Country region
  const fetchRegionCountries = async (e) => {
    const region = e.currentTarget.value;
    // console.log(region);

    const responsAllCountriesInTheRegion = await fetch(
      `https://restcountries.com/v3.1/region/${region}`
    );
    const dataAllCountriesInTheRegion = await responsAllCountriesInTheRegion.json();
    dispatch({
      type: 'ALL_COUNTRIES_IN_THE_REGION',
      payload: dataAllCountriesInTheRegion,
    });
  };

  // find currentCountry to load it on the single country page
  const handleCurrentCountry = (e) => {
    const id = e.currentTarget.id;

    dispatch({ type: 'FIND_CURRENT_COUNTRY', payload: id });
  };
  //
  // const handleCurrentCountryOnLoad = (id) => {
  //   dispatch({ type: 'FIND_CURRENT_COUNTRY', payload: id });
  // };

  //search form: fetch countries from the search input
  const fetchInputCountry = async () => {
    if (searchTerm) {
      try {
        const response = await fetch(
          `https://restcountries.com/v2/name/${searchTerm}`
        );
        const data = await response.json();
        if (data.length > 0) {
          dispatch({ type: 'SHOW_INPUT_COUNTRY', payload: data });
        }
      } catch (error) {
        fetchUserLocation();
        console.log(error);
        dispatch({ type: 'SET_ERROR' });
      }
    } else {
      fetchUserLocation();
    }
  };
  useEffect(() => {
    fetchInputCountry();
    // eslint-disable-next-line
  }, [searchTerm]);

  return (
    <AppContext.Provider
      value={{
        ...state,
        theme,
        toggleTheme,
        setSearchTerm,
        fetchRegionCountries,
        handleCurrentCountry,
      }}
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
