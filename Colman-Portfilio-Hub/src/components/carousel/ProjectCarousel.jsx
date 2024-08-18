import React, { useState } from 'react';
import './ProjectCarousel.css';
import CaroProject from '../caro-peoject/CaroProject';
import { GoArrowLeft } from "react-icons/go";
import { GoChevronRight } from "react-icons/go";
import { GoChevronLeft } from "react-icons/go";
import IconButton from '@mui/material/IconButton';

const ProjectCarousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const slides = Math.ceil(images.length / 3);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? slides - 1 : prevIndex - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === slides - 1 ? 0 : prevIndex + 1));
  };

  const getCurrentImages = () => {
    const start = currentIndex * 3;
    return images.slice(start, start + 3);
  };

  return (
    <div className="project-carousel">
      <div className="carousel-button prev" onClick={goToPrevious}>
        <IconButton size="large">
          <GoChevronLeft fontSize="25px" color='#255366'/>
        </IconButton>
      </div>
      <div className="carousel-slides">
        {getCurrentImages().map((img, index) => (
          <div className="carousel-slide" key={index}>
            <CaroProject 
            project={{ 
              img: img,
              name: `Project ${index + 1}`,
              title: `Project ${index + 1}`, 
              description: `This is project ${index + 1}`, 
              link: 'https://www.google.com' }}
              />
            {/*<img className='each-project-slide' src={img} alt={`slide ${index}`} /> */}
          </div>
        ))}
      </div>
      
      <div className="carousel-button next" onClick={goToNext}>
        <IconButton size="large">
          <GoChevronRight fontSize="25px" color='#255366'/>  
        </IconButton>  
      </div>
    </div>
  );
};

export default ProjectCarousel;
