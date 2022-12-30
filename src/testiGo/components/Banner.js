import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper";
import { NavLink } from "react-router-dom";

import slide1 from '../assets/img/banner-1.png';
import slide2 from '../assets/img/banner-2.png';
import slide3 from '../assets/img/banner-3.png';
import point1 from '../assets/img/banner-point1.png';
import point2 from '../assets/img/banner-point2.png';
import point3 from '../assets/img/banner-point3.png';
import point4 from '../assets/img/banner-point4.png';

  
const Banner = () => {
    return (
       <div className="banner-sec">
        <Swiper 
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        loop={true}
        pagination={{
          clickable: true,
        }}
        modules={[Autoplay, Pagination]} 
        className="homeBanner">
            <SwiperSlide>
              <div className="banner-slide">
                <img src={slide1} alt="" className="w-100 banner-bg" />
                <div className="bannerSlide-content">
                  <h1 className="banner-title" data-aos="fade-up">Bringing X-RAY and ECG to your home</h1>
                  <p className="para-18 text-white" data-aos="fade-up">We offer the option of automated patient texting services including appointment booking confirmations, appointment reminders and exam preparation instructions.</p>
                  <p className="para-18 text-white" data-aos="fade-up">To sign you up for these features, we will request your cell phone number at the time of booking.</p>
                  <div className="bannerBTN">
                    <NavLink to="#" className="btn custom-btn">Booking Now</NavLink>
                    <NavLink to="#" className="btn custom-btn">Our Services</NavLink>
                  </div>
                </div>
                <img className="banner-point1" src={point1} alt="" />
                <img className="banner-point2" src={point2} alt="" />
                <img className="banner-point3" src={point3} alt="" />
                <img className="banner-point4" src={point4} alt="" />
              </div>
              </SwiperSlide>
              <SwiperSlide>
              <div className="banner-slide">
                <img src={slide2} alt="" className="w-100 banner-bg" />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="banner-slide">
                <img src={slide3} alt="" className="w-100 banner-bg" />
              </div>
            </SwiperSlide>
        </Swiper>
      </div>
    );
};

export default Banner;