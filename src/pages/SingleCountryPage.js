import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import { Link } from 'react-router-dom';
import { useGlobalContext } from '../context';
import { BsArrowLeft } from 'react-icons/bs';
import noImageAvailable from '../no-image-available.png';

//format the population number 6927288 =>6,927,288
const formatInteger = (number) => {
  return new Intl.NumberFormat().format(number);
};

const SingleCountryPage = () => {
  const { theme, currentCountry, handleCurrentCountry } = useGlobalContext();
  const [borderCountries, setBorderCountries] = useState([]);

  const {
    // flags: { svg: flagImage },
    name,
    nativeName,
    population,
    region,
    subregion,
    capital,
    topLevelDomain,
    currencies,
    languages,
    borders,
  } = currentCountry;
  //some countries do not have flags
  let flagImage = noImageAvailable;
  if (currentCountry.flags) {
    const { svg } = currentCountry.flags;
    flagImage = svg;
  }

  const countryLanguages = languages.map((item) => item.name).join(', ');
  const countryCurrencies = currencies.map((item) => item.code).join(', ');
  const formatedPopulation = formatInteger(population);

  // if currentCountry has border countries => fetch for data for them
  const fetchBorderCountries = async () => {
    if (borders) {
      const bordersList = borders.join(',');

      const response = await fetch(
        `https://restcountries.com/v3.1/alpha?codes=${bordersList}`
      );
      const data = await response.json();
      setBorderCountries(data);
    }
  };
  useEffect(() => {
    fetchBorderCountries();
    // eslint-disable-next-line
  }, [currentCountry]);

  return (
    <section
      className={
        theme === 'light'
          ? 'single-country-page-container light-theme'
          : 'single-country-page-container dark-theme'
      }
    >
      <Header />
      <div className='single-country-back-btn-container'>
        <Link to='/'>
          <button className='single-country-back-btn'>
            <span>
              <BsArrowLeft />
            </span>

            <p>Back</p>
          </button>
        </Link>
      </div>
      {/* country container */}
      <article className='country-container'>
        <img className='single-country-flag' src={flagImage} alt='flag' />
        <div className='country-info-container'>
          <h3>{name}</h3>
          <div className='country-detailed-info'>
            <div className='country-detailed-info-left'>
              <h4>
                Native Name: <span>{nativeName}</span>
              </h4>
              <h4>
                Population: <span>{formatedPopulation}</span>
              </h4>
              <h4>
                Region: <span>{region}</span>
              </h4>
              <h4>
                Sub region: <span>{subregion}</span>
              </h4>
              <h4>
                Capital: <span>{capital}</span>
              </h4>
            </div>
            <div className='country-detailed-info-right'>
              <h4>
                Top Level Domain: <span>{topLevelDomain}</span>
              </h4>
              <h4>
                Currencies: <span>{countryCurrencies}</span>
              </h4>
              <h4>
                Languages: <span>{countryLanguages}</span>
              </h4>
            </div>
          </div>
          {borders && (
            <article className='border-countries-btns-container'>
              <h4>Border Countries: </h4>

              {borderCountries.map((item, index) => {
                const {
                  name: { common },
                  population,
                } = item;
                return (
                  <Link
                    key={index}
                    to={`/contries/${population}`}
                    onClick={handleCurrentCountry}
                    id={population}
                  >
                    <button className='single-country-border-btn'>
                      {common}
                    </button>
                  </Link>
                );
              })}
            </article>
          )}
        </div>
      </article>
    </section>
  );
};

export default SingleCountryPage;
