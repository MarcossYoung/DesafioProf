import React, { useState, useEffect } from 'react';

const ImageSlider = () => {
  const images = [
    "/img/arreglo-bici.jpg",
    "/img/pexels-snapwire-310983.jpg",
    "/img/professional-repairman.jpg",
    "/img/en_bici_free_copyright.jpg"
  ];
  
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    const sliderInterval = setInterval(nextSlide, 3000); // Auto-slide every 3 seconds
    return () => clearInterval(sliderInterval); // Clear on component unmount
  }, []);

  return (
    <div className="container_slider">
      <div className="slider" id="slider">
        {images.map((image, index) => (
          <div
            key={index}
            className={`slider_section ${index === currentIndex ? 'active' : ''}`}
          >
            <img src={image} alt="" className="slider_img" />
          </div>
        ))}
      </div>
      <div className="slider_btn slider_btn-R" onClick={nextSlide}>&#62;</div>
      <div className="slider_btn slider_btn-L" onClick={prevSlide}>&#60;</div>
    </div>
  );
};

export default ImageSlider;
