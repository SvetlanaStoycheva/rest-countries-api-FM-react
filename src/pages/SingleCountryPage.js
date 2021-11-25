import React from 'react';
import Header from '../components/Header';
import { Link } from 'react-router-dom';
import { useGlobalContext } from '../context';
import { useParams } from 'react-router-dom';
import { BsArrowLeft } from 'react-icons/bs';

const formatInteger = (number) => {
  return new Intl.NumberFormat().format(number);
};

const SingleCountryPage = () => {
  const { theme, loaded_countries } = useGlobalContext();
  let { id } = useParams();
  id = Number(id);

  const currentCountry = loaded_countries.find(
    (item) => item.population === id
  );
  console.log(currentCountry);
  const {
    flags: { svg: flagImage },
    name: { official: countryName, nativeName },
    population,
    region,
    subregion,
    capital,
    tld,
    currencies,
    languages,
    borders,
  } = currentCountry;
  // take the value from the nativeName object which have changing key, for Bulgaria is bul.
  const nativeNameKey = Object.keys(nativeName);
  const { official: countryNativeName } = nativeName[nativeNameKey];
  //take the value from changing key => for currencies
  const currenciesKey = Object.keys(currencies);
  const { name: currencyName } = currencies[currenciesKey];
  //take the value from changing key => for languages
  const languagesValues = Object.values(languages);

  // find border countries
  borders.map((item) => {
    console.log(item);
  });

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
      <Link to='/'>
        <button>
          <BsArrowLeft />
          <p>Back</p>
        </button>
      </Link>
      {/* country container */}
      <article className='country-container'>
        <img src={flagImage} alt='flag' />
        <div className='country-info-container'>
          <h3>{countryName}</h3>
          <div className='country-detailed-info'>
            <div className='country-detailed-info-left'>
              <h4>
                Native Name: <span>{countryNativeName}</span>
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
                Top Level Domain: <span>{tld}</span>
              </h4>
              <h4>
                Currencies: <span>{currencyName}</span>
              </h4>
              <h4>
                Languages: <span>{languagesValues}</span>
              </h4>
            </div>
          </div>
          <article className='border-countries'>
            <h4>Border Countries</h4>
          </article>
        </div>
      </article>
    </section>
  );
};

export default SingleCountryPage;
