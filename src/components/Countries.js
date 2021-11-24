import React from 'react';
import { useGlobalContext } from '../context';

const formatInteger = (number) => {
  return new Intl.NumberFormat().format(number);
};

const Countries = () => {
  const { theme, initial_countries } = useGlobalContext();

  return (
    <section className='countries-container'>
      {initial_countries.map((item, index) => {
        let {
          flags: { svg: flagImage },
          name: { common: countryName },
          capital,
          population,
          region,
        } = item;
        population = formatInteger(population);
        // single country
        return (
          <article className='single-country' key={index}>
            <img src={flagImage} alt='flag' />
            <div className='single-country-info'>
              <h3>{countryName}</h3>
              <div>
                <h4>
                  Population: <span>{population}</span>
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
        );
      })}
    </section>
  );
};

export default Countries;
