import React from 'react';
import Header from '../components/Header';
import { Link } from 'react-router-dom';
import { useGlobalContext } from '../context';

const ErrorPage = () => {
  const { theme } = useGlobalContext();

  return (
    <section
      className={
        theme === 'light'
          ? 'single-country-page-container light-theme'
          : 'single-country-page-container dark-theme'
      }
    >
      <Header />
      <div className='error-container'>
        <h1>404</h1>
        <h3>Sorry, the page you tried cannot be found</h3>
        <Link to='/' className='back-home-btn'>
          back home
        </Link>
      </div>
    </section>
  );
};

export default ErrorPage;
