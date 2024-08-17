import './../App.css'
import React, { useState, useContext } from 'react';
import CaroProject from './CaroProject';
import AppContext from '../AppContext';

import {Swiper, SwiperSlide} from 'swiper/react';
import './../../node_modules/swiper/swiper.css';
import './../../node_modules/swiper/modules/navigation.css';
import './../../node_modules/swiper/modules/effect-coverflow.css';
import './../../node_modules/swiper/modules/pagination.css';
import {EffectCoverflow, Pagination, Navigation} from 'swiper/modules'
import { GoArrowLeft } from "react-icons/go";
//<GoArrowLeft />
import { GoArrowRight } from "react-icons/go";
//<GoArrowRight />


const PhotoCarousel = () => {
    const images = [
        '/Images/1.jpg',
        '/Images/2.jpg',
        '/Images/3.jpg',
        '/Images/4.jpg',
        '/Images/5.jpg'
    ];
   

    return (
        <div className='Carousel-container'>
         <Swiper
                effect={'coverflow'}
                grabCursor={true}
                centeredSlides={true}
                loop={true}
                slidesPerView={'auto'}
                spaceBetween={-600} // Adjust this value to reduce the space between slides
                coverflowEffect={{
                    rotate: 0,
                    stretch: 50, // Adjust this value to bring slides closer together
                    depth: 100,
                    modifier: 1, // Ad just this value for overall scaling of effect
                }}
                pagination={{ el: '.swiper-pagination', clickable: true }}
                navigation={{
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                    clickable: true,
                }}
                modules={[EffectCoverflow, Pagination, Navigation]}
                className="swiper_container"
            >
        {images.map((image, index) => (
                    <SwiperSlide key={index}>
                        <img src={image} alt={`slide_image_${index}`} />
                    </SwiperSlide>
                ))}
        <div className="slider-controler">
          <div className="swiper-button-prev slider-arrow">
            <ion-icon name="arrow-back-outline"></ion-icon>
          </div>
          <div className="swiper-button-next slider-arrow">
            <ion-icon name="arrow-forward-outline"></ion-icon>
          </div>
        </div>
      </Swiper>
        </div>
    );
}



export default PhotoCarousel;