import React from 'react';
import { BsMoon, BsSun } from 'react-icons/bs';
import { useGlobalContext } from '../context';

const Header = () => {
  const { theme, toggleTheme } = useGlobalContext();
  return (
    <section className='header'>
      <h2>Where in the world?</h2>
      <div className='toggle-btn' onClick={toggleTheme}>
        <span>{theme === 'light' ? <BsMoon /> : <BsSun />}</span>
        <p>{theme === 'light' ? 'Dark mode' : 'Light mode'}</p>
      </div>
    </section>
  );
};

export default Header;
