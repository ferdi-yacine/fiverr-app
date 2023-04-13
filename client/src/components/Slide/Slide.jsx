import React from "react";
import "./Slide.scss";
import Slider from "infinite-react-carousel";

const Slide = ({children, slidesToShow}) => {
  return (
    <div className="slide">
      <div className="container">
        <Slider slidesToShow={slidesToShow}>
          {children}
        </Slider>
      </div>
    </div>
  );
};

export default Slide;
