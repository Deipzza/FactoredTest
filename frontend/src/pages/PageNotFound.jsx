import React from 'react';
import { Link } from 'react-router-dom';

const PageNotFound = () => {
  return (
    <div className="has-text-centered m-6">
      <br />
      <h1 className='title'>Page not found!</h1>
      <br />
      <h2 className='subtitle'>Oops! It looks like you're lost.</h2>
      <p>Maybe you want to return to <Link to='/'>Homepage</Link></p>
    </div>
  );
}

export default PageNotFound;