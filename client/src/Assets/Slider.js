import React, { Component } from "react";
import Slider from "react-slick";
import slider from 'react-slick'

import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

import './Slider.css'
function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block"}}
        onClick={onClick}
      />
    );
  }
  
  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block"}}
        onClick={onClick}
      />
    );
  }

export default class SimpleSlider extends Component {
  render() {
    let settings = {
      dots: false,
      arrows: false,
      fade: true,
      infinite: true,
      swipeToSlide: true,
      speed: 8000,
      slidesToShow: 1,
      slidesToScroll: 1,
      cssEase: "linear",
      autoplay: true,
      autoplaySpeed: 40,
      nextArrow: <SampleNextArrow />,
      prevArrow: <SamplePrevArrow />,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            infinite: true,
            dots: false
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            initialSlide: 1
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
      
    };
    return (
      <div className="carousel">
        
        <Slider {...settings}>
        <div>
            <img src={"/Image/birds-hero.ngsversion.1498516940057.adapt.1900.1.jpg"}  alt='#'/>
          </div>
          <div>
            <img src={"/Image/NV_0704_Christopherson_Large.jpg"}alt='#' />
          </div>
          <div>
            <img src={"/Image/istock-994807816.jpg"} alt='#'/>
          </div>
          <div>
            <img src={"/Image/test.png"} alt='#' />
          </div>
        </Slider>
      </div>
    );
  }
}





