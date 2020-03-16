import React from 'react';
import PropTypes from 'prop-types';
import github from '../img/github-icon.svg';
import linkedin from '../img/linkedin-icon.svg';

const NavbarIcon = ({ service }) => {
  const data = {
    linkedin: {
      url: 'https://linkedin.com/in/petrihanninen',
      img: linkedin,
      alt: 'Linkedin'
    },
    github: {
      url: 'https://github.com/petrihanninen',
      img: github,
      alt: 'Github'
    }
  };

  return (
    <a
      className="navbar-item navbar-icon"
      href={data[service].url}
      target="_blank"
      rel="noopener noreferrer"
    >
      <span className="icon">
        <img src={data[service].img} alt={data[service].alt} />
      </span>
    </a>
  );
};

NavbarIcon.propTypes = {
  service: PropTypes.string.isRequired
};

export default NavbarIcon;
