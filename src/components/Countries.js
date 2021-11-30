import React from 'react';
import { Link } from 'react-router-dom';
import { useGlobalContext } from '../context';

const formatInteger = (number) => {
  return new Intl.NumberFormat().format(number);
};

const Countries = () => {
  const {
    theme,
    loaded_countries,
    handleCurrentCountry,
    error,
  } = useGlobalContext();
  console.log(error);

  if (!loaded_countries) {
    return <h2>error</h2>;
  } else {
    return (
      <section
        className={
          theme === 'light'
            ? 'countries-container light-theme'
            : 'countries-container dark-theme'
        }
      >
        {loaded_countries.map((item, index) => {
          let {
            flags: { svg: flagImage },
            name: { official: countryName },
            name,
            capital,
            population,
            region,
          } = item;
          const populationFormated = formatInteger(population);
          // single country
          return (
            <Link
              to={`/contries/${population}`}
              key={index}
              onClick={handleCurrentCountry}
              id={population}
            >
              <article
                className={
                  theme === 'light'
                    ? 'single-country light-theme'
                    : 'single-country  dark-theme'
                }
                key={index}
              >
                <img src={flagImage} className='flag-img' alt='flag' />
                <div className='single-country-info'>
                  <h3>{countryName ? countryName : name}</h3>
                  <div>
                    <h4>
                      Population: <span>{populationFormated}</span>
                    </h4>
                    <h4>
                      Region: <span>{region}</span>
                    </h4>
                    <h4>
                      Capital: <span>{capital}</span>
                    </h4>
                  </div>
                </div>
              </article>
            </Link>
          );
        })}
      </section>
    );
  }
};

export default Countries;
