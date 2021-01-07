import React from 'react';
import PropTypes from 'prop-types';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 3,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const CustomCarousel = ({
  children,
  autoPlay,
  customResponsive,
  arrows,
  removeArrows,
}) => (
  <>
    <Carousel
      responsive={customResponsive || responsive}
      infinite
      containerClass="carousel-container"
      arrows={arrows}
      autoPlay={autoPlay}
      autoPlaySpeed="3000"
      removeArrowOnDeviceType={removeArrows || ['tablet', 'mobile']}
    >
      {children}
    </Carousel>
  </>
);

CustomCarousel.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export default CustomCarousel;
