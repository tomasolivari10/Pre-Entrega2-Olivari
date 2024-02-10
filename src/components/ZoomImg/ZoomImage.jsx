import React, { useState } from 'react';

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
      <img src={src} alt={alt} className="zoomable-image w-[100%] h-[100%] p-6" />
    </div>
  );
};

export default ZoomImage;

