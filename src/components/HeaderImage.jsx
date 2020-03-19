import React from 'react';
import PropTypes from 'prop-types';
import Img from 'gatsby-image';

const HeaderImage = ({ imageInfo }) => {
  const { alt = '', childImageSharp, image } = imageInfo;

  if (!!image && !!image.childImageSharp) {
    return (
      <Img
        className="header-image"
        fluid={image.childImageSharp.fluid}
        alt={alt}
      />
    );
  }

  if (childImageSharp) {
    return (
      <Img className="header-image" fluid={childImageSharp.fluid} alt={alt} />
    );
  }

  if (!!image && typeof image === 'string')
    return <img className="header-image" src={image} alt={alt} />;

  return null;
};

HeaderImage.propTypes = {
  imageInfo: PropTypes.shape({
    alt: PropTypes.string,
    childImageSharp: PropTypes.object,
    image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    style: PropTypes.object
  }).isRequired
};

export default HeaderImage;
