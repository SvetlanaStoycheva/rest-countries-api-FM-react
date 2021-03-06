import React from 'react';
import Header from '../components/Header';
import SearchForms from '../components/SearchForms';
import Countries from '../components/Countries';
import { useGlobalContext } from '../context';

const HomePage = () => {
  const { theme } = useGlobalContext();
  return (
    <>
      <section
        className={theme === 'light' ? 'home light-theme' : 'home dark-theme'}
      >
        <Header />
        <SearchForms />
        <Countries />
      </section>
    </>
  );
};

export default HomePage;
