import React, { Component } from "react";
import Slider from "react-slick";
import "./slider.css";
export default class AutoPlay extends Component {
  render() {
    var settings = {
      dots: false,
      centerMode:true,
      arrows:false,
      slidesToShow: 10,
      slidesToScroll: 1,
      autoplay: true,
      speed: 2000,
      autoplaySpeed: 2000,
      cssEase: "linear"      
    };
    return (
       <Slider {...settings}>
             {this.props.children}
        </Slider>
    );
  }
}