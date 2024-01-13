import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './ZoomImage.css';

const ZoomImage = ({ src, alt }) => {
  const [isZoomed, setIsZoomed] = useState(false);

  const handleMouseEnter = () => {
    setIsZoomed(true);
  };

  const handleMouseLeave = () => {
    setIsZoomed(false);
  };

  return (
    <div
      className={`zoomable-image-container ${isZoomed ? 'zoomed' : ''}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <img src={src} alt={alt} className="zoomable-image" />
    </div>
  );
};

/* ZoomImage.propTypes = {
  src: PropTypes.string.isRequired,//el atributo src debe ser un string, en este caso la url de la imagen.
  alt: PropTypes.string.isRequired,
}; */

export default ZoomImage;

