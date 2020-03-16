import React from 'react';
import { Link } from 'gatsby';
import NavbarIcon from './NavbarIcon';

const Navbar = () => {
  return (
    <nav className="navbar" role="navigation" aria-label="main-navigation">
      <div className="content">
        <div className="navbar-brand">
          <Link to="/" className="navbar-item" title="Logo">
            Home
          </Link>
          <Link className="navbar-item" to="/me">
            Me
          </Link>
          <div className="navbar-icons">
            <NavbarIcon service="github" />
            <NavbarIcon service="linkedin" />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
