import React from 'react';
import aboutImg from '../assets/img/about-sec.png';

const ImageWithText = (props) => {
    // console.log(props.smallHeadeding)
    return (
        <section className="about-sec">
            <div className="container c_container">
                <div className="row">
                    <div className="col-lg-6 order-1 order-lg-0">
                        <div className="about-left">
                            <h6 className="small-heading" data-aos="fade-up">{props.smallHeading}</h6>
                           {/* {props.heading ? <h3 className="heading-gradient" data-aos="fade-up">{props.heading}</h3> : ''}  */}
                           {props.heading && <h3 className="heading-gradient" data-aos="fade-up">{props.heading}</h3>}
                            <p className="para-16" data-aos="fade-up">We are the only fully licensed mobile radiology service in Ireland. Our mantra is moving equipment not patients and our mission is to bring quality care and diagnostics to communities in a clinically compliant manner. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries.</p>
                            <a href="#" className="btn custom-btn2" data-aos="fade-up">Read More</a>
                        </div>
                    </div>
                    <div className="col-lg-6 order-0 order-lg-0">
                        <div className="about-right" data-aos="fade-up">
                            <img src={aboutImg} alt="" className="w-100" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ImageWithText;