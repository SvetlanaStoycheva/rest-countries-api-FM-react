const reducer = (state, action) => {
  if (action.type === 'FETCH_COUNTRIES') {
    const regions = [
      'Filter by Region',
      ...new Set(action.payload.map((item) => item.region)),
    ];

    return { ...state, all_regions: regions, all_countries: action.payload };
  }
  throw new Error(`no matching "${action.type}" action type`);
};
export default reducer;
