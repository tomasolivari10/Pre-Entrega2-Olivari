import React, { useState, useEffect } from "react";

import { images } from "../../galeria/data.js";


const Carousel = ({elementoDestinoRef}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  

  useEffect(() => {
    const interval = setInterval(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
      
    }, 5000); 

    return () => clearInterval(interval);
  }, []);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleClick = () => {
    if (elementoDestinoRef.current) {//verifica que el elemento referenciado no sea nulo, es decir, si aun no se monto o se desmonto.
      elementoDestinoRef.current.scrollIntoView({ behavior: 'smooth' });//metodo scroll para dirigir al elemento referenciado.
    }
  };

  return (
    <div className="relative ">
      <button onClick={prevImage} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-3xl text-cyan-700">
        &#10094;
      </button>

      <img src={images[currentImageIndex].url} alt={images[currentImageIndex].description} 
      className="w-full h-[65vh] mt-[60px] carousel-img md:h-[78vh]"/>

        <i onClick={handleClick} className="fas fa-chevron-down fa-3x" aria-hidden="true" ></i>

      <button onClick={nextImage} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-3xl text-cyan-700">
        &#10095;
      </button>
    </div>
  );
};

export default Carousel;
