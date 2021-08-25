import React from 'react';
import { Carousel } from 'react-bootstrap';
import women from '../assets/women.jpg';
import men from '../assets/men.jpg';
import kids from '../assets/kids.jpg';
const CarouselBox = () => {
    return (
        <Carousel>
                <CarouselItem>
            <CarouselCaption>
                    <img
                        src={women}
                        alt="Shoes"
                    />
            </CarouselCaption>
                </CarouselItem>
            <CarouselCaption>
                <CarouselItem>
                    <img
                        src={men}
                        alt="Shoes"
                    />
                </CarouselItem>
            </CarouselCaption>
                <CarouselItem>
            <CarouselCaption>
                    <img
                        src={kids}
                        alt="Shoes"
                    />
            </CarouselCaption>
                </CarouselItem>
        </Carousel>
    );
};

export default CarouselBox;