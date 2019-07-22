import * as React from 'react';
import {Link} from 'react-router-dom';

const Logo = () => {
  return <div className="logo">
    <h1 className="visually-hidden">WTW</h1>
    <Link to="/" className="logo__link">
      <span className="logo__letter logo__letter--1">W</span>
      <span className="logo__letter logo__letter--2">T</span>
      <span className="logo__letter logo__letter--3">W</span>
    </Link>
  </div>;
};

export default Logo;
