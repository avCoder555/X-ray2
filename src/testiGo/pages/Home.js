import React, { useState } from 'react';
import Banner from '../components/Banner';
import Header from '../components/Header';

import AOS from 'aos';
import '../../../node_modules/aos/dist/aos.css';

// Images 
import BG2 from '../assets/img/bg-2.png';
import award1 from '../assets/img/award-1.png';
import award2 from '../assets/img/award-2.png';
import ImageWithText from '../components/ImageWithText';
import { useEffect } from 'react';

const Home = () => {
  const [scrolling, setScrolling] = useState(false);
  const [scrollTop, setScrollTop] = useState(0);
  // useEffect(() => {
  //   console.log('asdsad')
  //   AOS.init();
  //   AOS.refresh();
  // });
  useEffect(() => {
    const onScroll = e => {
      AOS.init({
        duration: 2500,
      });
      setScrollTop(e.target.documentElement.scrollTop);
      setScrolling(e.target.documentElement.scrollTop > scrollTop);
    };
    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, [scrollTop]);
  return (
    <>
      <Header />
      <Banner />
      <section className="tagline-sec">
        <img src={BG2} alt="" className="w-100" />
        <div className="tagline-text">
          <div className="container c_container">
            <div className="row">
              <div className="col-12">
                <h4 className="heading-1fff text-white text-center" data-aos="fade-up">
                  By using the latest digital technology, Mobile Medical Diagnostics provides a community based and flexible radiology services solution, resulting in improved access to diagnostic services for healthcare facilities nationwide.
                </h4>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="award-sec">
        <div className="container c_container">
          <div className="row">
            <div className="col-12 text-center">
              <img src={award1} alt="" />
              <img src={award2} alt="" />
            </div>
          </div>
        </div>
      </section>

      <ImageWithText smallHeading="About Us" heading="About Testigo On Demand Mobile X-Ray Solutions" />
    </>
  );
};

export default Home;