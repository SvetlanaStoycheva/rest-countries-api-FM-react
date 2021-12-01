const reducer = (state, action) => {
  if (action.type === 'FETCH_COUNTRIES') {
    let regions = [
      'Filter by Region',
      ...new Set(action.payload.map((item) => item.region)),
    ];
    //polar and antarctic ocean regions give error
    regions = regions.filter(
      (item) => item !== 'Polar' && item !== 'Antarctic Ocean'
    );

    return {
      ...state,
      all_regions: regions,
      all_countries: action.payload,
      error: false,
    };
  }
  if (action.type === 'SET_LOADING') {
    return { ...state, loading: true };
  }
  if (action.type === 'INITIAL_COUNTRIES_LOAD') {
    return {
      ...state,
      loaded_countries: action.payload,
      error: false,
      loading: false,
    };
  }
  if (action.type === 'ALL_COUNTRIES_IN_THE_REGION') {
    return {
      ...state,
      all_countries_in_the_active_country_region: action.payload,
      loaded_countries: action.payload,
      error: false,
    };
  }
  if (action.type === 'FIND_CURRENT_COUNTRY') {
    const currentCountry = state.all_countries.find(
      (item) => Number(item.population) === Number(action.payload)
    );
    return { ...state, currentCountry, error: false };
  }
  if (action.type === 'SHOW_INPUT_COUNTRY') {
    return { ...state, loaded_countries: action.payload, error: false };
  }
  if (action.type === 'SET_ERROR') {
    return { ...state, error: true };
  }
  throw new Error(`no matching "${action.type}" action type`);
};
export default reducer;
