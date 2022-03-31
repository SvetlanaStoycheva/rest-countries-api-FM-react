import React from 'react';
import { useGlobalContext } from '../context';
import { BsSearch } from 'react-icons/bs';

const SearchForms = () => {
  const {
    theme,
    setSearchTerm,
    fetchRegionCountries,
    region,
    all_regions,
  } = useGlobalContext();
  const searchValue = React.useRef();

  return (
    <section
      className={
        theme === 'light'
          ? 'search-forms light-theme'
          : 'search-forms dark-theme'
      }
    >
      {/* search form */}
      <form className='input-form' onSubmit={(e) => e.preventDefault()}>
        <div className='input-form-container'>
          <span>
            <BsSearch />
          </span>
          <input
            type='text'
            id='name'
            className='input-value'
            placeholder='Search for a country...'
            ref={searchValue}
            onChange={() => setSearchTerm(searchValue.current.value)}
          />
        </div>
      </form>
      {/* select form */}
      <form className='select-form'>
        <select
          name='region'
          className='region-selection'
          value={region}
          onChange={fetchRegionCountries}
        >
          {all_regions.map((item, index) => {
            return (
              <option value={item} key={index} className='options-container'>
                {item}
              </option>
            );
          })}
        </select>
      </form>
    </section>
  );
};

export default SearchForms;
