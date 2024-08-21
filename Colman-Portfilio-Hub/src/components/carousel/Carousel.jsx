import React, { useState } from 'react';
import './Carousel.css';
import { GoChevronRight } from "react-icons/go";
import { GoChevronLeft } from "react-icons/go";
import IconButton from '@mui/material/IconButton';
import CaroVideo from '../caro-video/CaroVideo';

const Carousel = ({ videos }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const slides = Math.ceil(videos.length / 2);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? slides - 1 : prevIndex - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === slides - 1 ? 0 : prevIndex + 1));
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const getCurrentVideos = () => {
    const start = currentIndex * 2;
    return videos.slice(start, start + 2);
  };

  return (
    <div className="project-carousel">
      <div className="carousel-button prev" onClick={goToPrevious}>
        <IconButton size="large">
          <GoChevronLeft fontSize="25px" color='#255366' />
        </IconButton>
      </div>
      <div className="carousel-slides">
        {getCurrentVideos().map((video, index) => (
          <div className="carousel-slide" key={index}>
            <CaroVideo
              video={{
                video: video.url,
                title: `conference ${video.name}`,
              }}
            />
          </div>
        ))}
      </div>
      <div className="carousel-button next" onClick={goToNext}>
        <IconButton size="large">
          <GoChevronRight fontSize="25px" color='#255366' />
        </IconButton>
      </div>

      <div className="carousel-dots">
        {Array.from({ length: slides }).map((_, index) => (
          <span
            key={index}
            className={`carousel-dot ${currentIndex === index ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
