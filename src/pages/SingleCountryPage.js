import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import { Link } from 'react-router-dom';
import { useGlobalContext } from '../context';
import { BsArrowLeft } from 'react-icons/bs';

const formatInteger = (number) => {
  return new Intl.NumberFormat().format(number);
};

const SingleCountryPage = () => {
  const { theme, currentCountry, handleCurrentCountry } = useGlobalContext();
  const [borderCountries, setBorderCountries] = useState([]);

  // const { id } = useParams();
  // useEffect(() => {
  //   handleCurrentCountryOnLoad(id);
  // }, []);
  // console.log(currentCountry);

  //
  const {
    flags: { svg: flagImage },
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
  const countryLanguages = languages.map((item) => item.name).join(', ');
  const countryCurrencies = currencies.map((item) => item.code).join(', ');
  // take the value from the nativeName object which have changing key, for Bulgaria is bul.
  // const nativeNameKey = Object.keys(nativeName);
  // const { official: countryNativeName } = nativeName[nativeNameKey];
  //take the value from changing key => for currencies
  // const currenciesKey = Object.keys(currencies);
  // const { name: currencyName } = currencies[currenciesKey];
  //take the value from changing key => for languages
  // const languagesValues = Object.values(languages);

  // find border countries
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

  //
  const formatedPopulation = formatInteger(population);

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
