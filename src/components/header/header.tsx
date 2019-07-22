import * as React from 'react';

import Logo from '../logo/logo';
import UserBlock from '../user-block/user-block';

const Header = () => {
  return <header className="page-header movie-card__head">
    <h1 className="visually-hidden">WTW</h1>
    <Logo />
    <UserBlock />
  </header>;
};

export default Header;
