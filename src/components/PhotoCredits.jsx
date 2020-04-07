import React from 'react';
import PropTypes from 'prop-types';

const PhotoCredits = props => {
  const { name, url } = props;
  return (
    <p className="photographer">
      ---
      <br />
      <span>Photo by </span>
      <a href={url}>{name}</a>
      <span> on </span>
      <a href="https://unsplash.com">Unsplash</a>
    </p>
  );
};

PhotoCredits.propTypes = {
  name: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired
};

export default PhotoCredits;
