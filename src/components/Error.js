import React from 'react';

const Error = () => {
  return (
    <div className='error-container'>
      <h1>404</h1>
      <h3>Sorry, the page you tried cannot be found</h3>
      <Link to='/' className='back-home-btn'>
        back home
      </Link>
    </div>
  );
};

export default Error;
