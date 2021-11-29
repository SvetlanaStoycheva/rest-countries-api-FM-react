const reducer = (state, action) => {
  if (action.type === 'FETCH_COUNTRIES') {
    const regions = [
      'Filter by Region',
      ...new Set(action.payload.map((item) => item.region)),
    ];

    return { ...state, all_regions: regions, all_countries: action.payload };
  }
  if (action.type === 'INITIAL_COUNTRIES_LOAD') {
    return { ...state, loaded_countries: action.payload };
  }
  if (action.type === 'ALL_COUNTRIES_IN_THE_REGION') {
    return {
      ...state,
      all_countries_in_the_active_country_region: action.payload,
    };
  }
  if (action.type === 'FIND_CURRENT_COUNTRY') {
    const currentCountry = state.all_countries.find(
      (item) => Number(item.population) === Number(action.payload)
    );
    return { ...state, currentCountry };
  }
  throw new Error(`no matching "${action.type}" action type`);
};
export default reducer;
