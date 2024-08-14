import './../App.css'
import React, { useState, useContext } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { FaArrowRight, FaArrowLeft } from "react-icons/fa"
import CaroProject from './CaroProject';
import AppContext from '../AppContext';

const PhotoCarousel = () => {

    const { projects } = useContext(AppContext);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [imageIndex, setImageIndex] = useState(0);

    const NextArrow = ({ onClick }) => {
        return (
            <div className='arrow next' onClick={onClick}>
                <FaArrowRight />
            </div>
        );
    };

    const PrevArrow = ({ onClick }) => {
        return (
            <div className='arrow prev' onClick={onClick}>
                <FaArrowLeft />
            </div>
        )
    }

    const images = [
        '/Images/1.jpg',
        '/Images/2.jpg',
        '/Images/3.jpg',
        '/Images/4.jpg',
        '/Images/5.jpg'
    ];

    const settings = {
        infinite: true,
        lazyLoad: true,
        speed: 300,
        slidesToShow: 3,
        slidesMode: true,
        centerMode: true,
        centerPadding: 0,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        beforeChange: (current, next) => setImageIndex(next),
    }

    return (
        <div className='Carousel-container'>
            <Slider {...settings}>
                {projects.map((project, idx) => (
                    <div key={idx} className={idx === imageIndex ? "slide activeSlide" : "slide"}>
                        <CaroProject project={project} />
                    </div>
                ))}
            </Slider>
        </div>
    );
}

export default PhotoCarousel;