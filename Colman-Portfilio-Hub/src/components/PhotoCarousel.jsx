import React, { useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const SampleNextArrow = (props) => {
    const { onClick } = props;
    return (
        <div className="custom-arrow custom-arrow-next" onClick={onClick}>
            <button>Next</button>
        </div>
    );
};

const SamplePrevArrow = (props) => {
    const { onClick } = props;
    return (
        <div className="custom-arrow custom-arrow-prev" onClick={onClick}>
            <button>Previous</button>
        </div>
    );
};

const photos = [
    './../../public/Images/1.jpg',
    './../../public/Images/2.jpg',
    './../../public/Images/3.jpg',
    './../../public/Images/4.jpg',
    './../../public/Images/5.jpg'
];


const PhotoCarousel = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        centerMode: true,
        centerPadding: '0px',
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        focusOnSelect: true,
        beforeChange: (oldIndex, newIndex) => {
            setCurrentSlide(newIndex);
        }
    };

    // Create an array of JSX elements using a for loop
    const slides = [];
    for (let index = 0; index < photos.length; index++) {
        const photo = photos[index];
        slides.push(
            <div
                key={index}
                className={`carousel-slide ${index === (currentSlide - 1 + photos.length) % photos.length
                    ? 'sidephoto'
                    : index === currentSlide
                        ? 'centerphoto'
                        : 'sidephoto'
                    }`}
            >
                <img src={photo} alt={`Slide ${index + 1}`} className="carousel-image" />
            </div>
        );
    }

    return (
        <div className="photo-carousel">
            <Slider {...settings}>
                {slides}
            </Slider>
        </div>
    );
};

export default PhotoCarousel;